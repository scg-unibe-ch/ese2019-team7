import {Router, Request, Response} from 'express';
import {getDatabase} from '../database';
import {OfferAttributes, OfferInstance} from '../models/offer.model';
import {UserInstance} from '../models/user.model';
import {DbInterface} from '../dbtypings/dbInterface';
import {AuthenticationController} from './authentication.controller';

const router: Router = Router();

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
router.get('/search/description', searchDescription);
router.get('/search/all', searchAll);
router.get('/search', searchAll);
const defOpts = {
  attributes: ['id', 'title', 'price', 'category'],
  raw: true
};


export async function searchTitle(rawReq: any, rawRes: any) {
  await httpPerformSearch(rawReq, rawRes, getDatabase(), ['title']);
}

export async function searchDescription(rawReq: any, rawRes: any) {
  await httpPerformSearch(rawReq, rawRes, getDatabase(), ['description']);
}

export async function searchAll(rawReq: any, rawRes: any) {
  await httpPerformSearch(rawReq, rawRes, getDatabase(), ['description', 'title', 'category']);
}

export async function httpPerformSearch(rawReq: any, rawRes: any, db: any, attributes: string[]) {
  const req: Request & {session: {user: UserInstance}} = rawReq;
  const res: Response = rawRes;
  const results = await performSearch(req.body.search, attributes, db);
  res.status(200).send(results);
}

export async  function performSearch(search: string, attributes: string[], db: DbInterface): Promise<OfferAttributes[]> {
  const Op = db.Sequelize.Op;
  const cmd = attributes.map((attribute) => {
    const obj: any = {};
    obj[attribute] = {[Op.like]: '%' + search + '%' };
    return obj;
  });
  let offers: OfferAttributes[];
  try {
    offers = await db.Offer.findAll({
      include: [ {model: db.User, as: 'provider', attributes: ['name', 'address', 'phone']} ],
      attributes: ['id', 'title', 'description', 'price', 'category'],
      raw: true,
      where: {
        approved: true,
        public: true,
        [Op.or]: cmd
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

async function createDef(rawReq: any, rawRes: any) {
  create(rawReq, rawRes, getDatabase());
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
export async function create(rawReq: any, rawRes: any, Db: any) {
  const req: Request & { session: { user: UserInstance } } = rawReq;
  const res: Response = rawRes;

  const user = await Db.User.findOne({where: {id: req.session.user.id}});

  const offerValues = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
  };
  let offer;
  try {
    offer = await Db.Offer.build(offerValues);
  } catch (err) {
    res.status(400).send({message: '.'});
    return;
  }
  try {
    await offer.setProvider(user, {save: false});
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
router.put('/notApproved', async (req: Request, res: Response) => {
  await getDatabase().Offer.update({
    public: true, }, {
    where: {
      id: req.body.id
    }
  });
});

router.get('/editoffer', async (req: Request, res: Response) => {
  getDatabase().Offer.findOne({where : {id: req.body.id} })
  res.statusCode = 200;
});
router.put('/editoffer', updateOfferDef)


router.delete('/editoffer', AuthenticationController , deleteOfferDef);

async function deleteOfferDef(rawReq: any, rawRes: any) {
  deleteOffer(rawReq, rawRes, getDatabase());
}
async function updateOfferDef(rawReq: any, rawRes: any) {
  updateOffer(rawReq, rawRes, getDatabase().Offer);
}
export async function updateOffer(rawReq: any, rawRes: any, offer: any) {
  const req: Request& {session: {user: UserInstance}} = rawReq;
  const res: Response = rawRes;
  const offerValues = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
  };
  if (req.session.user.id !== req.body.Userid) res.sendStatus(401); // Bad Request

  try {
    await offer.update({
      offerValues,
      public: false,
      where: {
        id: req.body.id
      }
    });
  } catch (err) {
    res.status(400).send({err : 'X_X'});
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
export async function deleteOffer(rawReq: any, rawRes: any, Db: DbInterface) {
  const req: Request& {session: {user: UserInstance}} = rawReq;
  const res: Response = rawRes;

  if (typeof (req.body.id) !== 'number') {
    res.status(400).send({message: 'Bad request'});
    return;
  }
  const offerToDel = await Db.Offer.findOne({where: {id: req.body.id}});
  if(offerToDel !== null && offerToDel.providerId === req.session.user.id) {
    await offerToDel.destroy().catch((err) => res.status(500).send({message: 'Error while deleting offer'}));
    res.status(200).send({message: 'OK'});
  }
  else if(offerToDel === null) {
    res.status(400).send({message: 'Bad request: Offer Id unexistent'});
    return;
  }
  else {
    res.status(401).send({message: 'Unauthorized'});
    return;
  }
}

export const OffersController: Router = router;
