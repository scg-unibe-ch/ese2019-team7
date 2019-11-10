import {Router, Request, Response} from 'express';
import {getDatabase} from '../database';
import {OfferAttributes, OfferInstance} from '../models/offer.model';
import {UserInstance} from '../models/user.model';
import {DbInterface} from '../dbtypings/dbInterface';
import {AuthenticationController} from './authentication.controller';

const router: Router = Router();

function genOfferValues(obj: any) {
  const offerValues = {
    title: obj.title,
    description: obj.description,
    price: obj.price,
    category: obj.category,
    dateFrom: obj.dateFrom,
    dateTo: obj.dateTo,
  };
  return offerValues;
}

router.get('/', async (req: Request, res: Response) => {
  getDatabase().Offer.findAll({
    attributes: ['id', 'title', 'price', 'category'],
    where: {
      public: true
    }})
    .then((offers: OfferInstance[]) => res.status(200).json({ offers }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));

});


router.get('/search/title', searchTitle);
router.get('/search/all', searchAll);
router.get('/search', searchTitle);
const defOpts = {
  attributes: ['id', 'title', 'price', 'category'],
  raw: true
};


export async function searchTitle(req: Request, res: Response) {
  await httpPerformSearch(req, res, getDatabase(), ['title']);
}

export async function searchAdvanced(req: Request, res: Response) {
  await httpPerformSearch(req, res, getDatabase(), req.body.attributes);
}

export async function searchAll(req: Request, res: Response) {
  await httpPerformSearch(req, res, getDatabase(), ['description', 'title']);
}

export async function httpPerformSearch(req: Request, res: Response, db: DbInterface, attributes: string[]) {
  const results = await performSearch(req.body.searchKey, attributes, db, req.body.category);
  res.status(200).send(results);
}

export async  function performSearch(search: string, attributes: string[], db: DbInterface, category: string): Promise<OfferAttributes[]> {
  const Op = db.Sequelize.Op;
  const cmd = attributes.map((attribute) => {
    const obj: any = {};
    obj[attribute] = {[Op.like]: '%' + search + '%' };
    return obj;
  });
  let categoryCmd;
  if (category === undefined || category === '') categoryCmd = {};
  else categoryCmd = {category: category};
  let offers: OfferAttributes[];
  try {
    offers = await db.Offer.findAll({
      include: [ {model: db.User, as: 'provider', attributes: ['name', 'address', 'phone']} ],
      attributes: ['id', 'title', 'description', 'price', 'category'],
      raw: true,
      where: {
        public: true,
        [Op.or]: cmd,
        ...categoryCmd
      }});
  } catch (e) {
    offers = [];
  }
  return offers;
}
router.get('/create', async (req: Request, res: Response) => {
  res.statusCode = 200;
});

router.post('/create', createDef);

async function createDef(req: Request, res: Response) {
  create(req, res, getDatabase());
}
/**
 * Creation of a Offer. Format of the body should be as follow:
 * > { username: usr, password: pwd, address: adr, tel: phone, email: email }
 *address and tel are optional.
 *
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 * - **201:** Created:
 * @param rawReq
 * @param rawRes
 * @param Offer Offer table of the database
 */
export async function create(req: Request, res: Response, Db: any) {

  const offerValues = genOfferValues(req.body);
  let offer;
  try {
    offer = await Db.Offer.build(offerValues);
  } catch (err) {
    res.status(400).send({message: '.'});
    return;
  }
  try {
    await offer.setProvider(req.session.user, {save: false});
    await offer.save();
  } catch (e) {
    res.status(500).send({message: 'Internal Server error: Could not assign offer to user.\n' + e.message});
    return;
  }
  res.status(201).send({message: 'Offer created'});

}
router.get('/notApproved', async (req: Request, res: Response) => {
  getDatabase().Offer.findAll({
    attributes: ['title', 'price', 'category', 'id'],
    where: {
      public: false
    }})
    .then((offers: OfferInstance[]) => res.status(200).json({ offers }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));

});

async function loadOfferDef(req: Request, res: Response, next: Function) {
  await loadOffer(req, res, next, getDatabase());
}

export async function loadOffer(req: Request, res: Response, next: Function, Db: DbInterface) {
  if (typeof (req.body.id) !== 'number') {
    res.status(400).send({message: 'Bad request'});
    return;
  }
  const offerToLoad = await Db.Offer.findOne({where: {id: req.body.id}});
  if (offerToLoad === null) {
    res.sendBadRequest('Bad request: Offer Id unexistent');
    return;
  }
  if (req.session.user.id !== offerToLoad.providerId) {
    res.sendForbidden();
    return;
  }
  req.body.offer = offerToLoad;
  next();
}


router.get('/editoffer', AuthenticationController, loadOfferDef, async (req: Request, res: Response) => {
  res.status(200).send(req.body.offer);
});

router.put('/editoffer', AuthenticationController, loadOfferDef, updateOfferDef);
router.delete('/editoffer', AuthenticationController , loadOfferDef, deleteOfferDef);

async function deleteOfferDef(rawReq: any, rawRes: any) {
  deleteOffer(rawReq, rawRes, getDatabase());
}
async function updateOfferDef(rawReq: any, rawRes: any) {
  updateOffer(rawReq, rawRes, getDatabase().Offer);
}
export async function updateOffer(req: Request, res: Response, offer: any) {
  const offerToUpdate: OfferInstance = req.body.offer;
  offerToUpdate.set(genOfferValues(req.body));
  offerToUpdate.set('public', false);
  try {
    await offerToUpdate.save();
  } catch (err) {
    res.sendBadRequest(err.message);
    return;
  }
  res.status(201).send({message: 'Edited'});
}
/**
 * delete a Offer
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 * - **201:** Created: registration successful
 * @param rawReq
 * @param rawRes
 * @param offer Offer table of the database
 */
export async function deleteOffer(req: Request, res: Response, Db: DbInterface) {
  await req.body.offer.destroy().catch((err: any) => res.status(500).send({message: 'Error while deleting offer'}));
  res.sendSuccess();
}


export const OffersController: Router = router;
