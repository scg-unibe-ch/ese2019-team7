import {Router, Request, Response} from 'express';
import {OfferAttributes, OfferInstance} from '../models/offer.model';
import {DbInterface} from '../dbtypings/dbInterface';
import {AuthenticationController} from './authentication.controller';
import {AdminAuthenticationController} from './adminAuthentication.controller';

const router: Router = Router();

function genOfferValues(obj: any) {
  const offerValues: OfferAttributes = {
    title: obj.title,
    description: obj.description,
    price: obj.price,
    category: obj.category,
    dateFrom: obj.dateFrom,
    dateTo: obj.dateTo
  };
  return offerValues;
}

export async function listOffers(req: Request, res: Response) {
  req.db.Offer.findAll({
    attributes: ['id', 'title', 'description', 'price', 'category', 'dateFrom', 'dateTo'],
    where: {
      public: true
    }})
    .then((offers: OfferInstance[]) => res.status(200).json({ offers }))
    .catch(err => res.status(500).json({ message: err }));
}
router.get('/', listOffers);

export async function contact(req: Request, res: Response) {
  const offer: OfferInstance = req.body.offer;
  const provider = await offer.getProvider();
  if (provider !== null) {
    res.status(200).send({
      name: provider.name,
      email: provider.eMail,
      phone: provider.phone
    });
  }
  else {
    res.sendError('Could get associated provider of the offer ' + offer.title + '.:');
  }
}
router.put('/contact', AuthenticationController, loadOffer, contact);

export async function myOffers(req: Request, res: Response) {
  const offers: OfferInstance[] =  await req.session.user.getOffers();
  res.status(200).json({ offers });
}
router.get('/myOffers', AuthenticationController, myOffers);


export async function search(req: Request, res: Response) {
  const results = await performSearch(req.body.searchKey, req.body.attributes, req.db, req.body.category);
  res.status(200).send(results);
}
router.put('/search', search);

export async  function performSearch(searchKey: string, attributes: string[] = ['title'], db: DbInterface, category: string) {
  const Op = db.Sequelize.Op;
  const cmd = attributes.map((attribute) => {
    const obj: any = {};
    obj[attribute] = {[Op.like]: '%' + searchKey + '%' };
    return obj;
  });
  let categoryCmd;
  if (category === undefined || category === '') categoryCmd = {};
  else categoryCmd = {category: category};
  let offers: OfferAttributes[];
  try {
    offers = await db.Offer.findAll({
      include: [ {model: db.User, as: 'provider', attributes: ['name', 'address', 'phone']} ],
      attributes: ['id', 'title', 'description', 'price', 'category', 'dateFrom', 'dateTo'],
      where: {
        public: true,
        [Op.or]: cmd,
        ...categoryCmd
      }});
  } catch (e) {
    offers = [];
  }
  return { offers };
}

router.get('/create', async (req: Request, res: Response) => {
  res.statusCode = 200;
});

/**
 * Creation of a Offer. Format of the body should be as follow:
 * > { username: usr, password: pwd, address: adr, tel: phone, email: email }
 *address and tel are optional.
 *
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 * - **201:** Created:
 */
export async function create(req: Request, res: Response) {

  const offerValues = genOfferValues(req.body);
  let offer;
  try {
    offer = await req.db.Offer.build(offerValues);
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
router.post('/create', AuthenticationController, create);


export async function getNotApproved(req: Request, res: Response) {
  try {
    const offers: OfferInstance[] = await req.db.Offer.findAll({
      attributes: ['id', 'title', 'description', 'price', 'category', 'dateFrom', 'dateTo', 'status'],
      where: {
        public: false,
        status: 'validation in progress'
      }
    });
    res.status(200).json({ offers });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}
router.get('/notApproved', AdminAuthenticationController, getNotApproved);


export async function patchNotApproved(req: Request, res: Response) {
  if (req.session.admin === null) {
    res.sendForbidden();
    return;
  }
  if (req.body.approve) {
    req.db.Offer.update(
      {
        public: true,
        status: 'approved'
      }, {
        where: {
          id: req.body.id
        }
      }).then(e => res.status(200).json({message: 'Offer approved'}))
      .catch(err => res.status(500).json({message: err}));
  }
  else if(!req.body.approve){
    req.db.Offer.update(
      {
        status: 'Rejected reason: ' + req.body.message
      }, {
        where: {
          id: req.body.id
        }
      }).then(e => res.status(200).json({message: 'Offer rejected'}))
      .catch(err => res.status(500).json({message: err}));

  }
  else{
    res.status(400).json({message: 'approve has to be set'});
  }
}
router.patch('/notApproved', AuthenticationController, patchNotApproved);


export async function loadOffer(req: Request, res: Response, next: Function) {
  if (typeof (req.body.id) !== 'number') {
    res.status(400).send({message: 'Bad request'});
    return;
  }
  const offerToLoad = await req.db.Offer.findOne({where: {id: req.body.id}});
  if (offerToLoad === null) {
    res.sendBadRequest('Bad request: Offer Id nonexistent');
    return;
  }
  req.body.offer = offerToLoad;
  next();
}


router.get('/edit', AuthenticationController, loadOffer, async (req: Request, res: Response) => {
  if (req.session.user.id !== req.body.offer.providerId) {
    res.sendForbidden();
    return;
  }
  res.status(200).send(req.body.offer);
});


export async function updateOffer(req: Request, res: Response) {
  if (req.session.user.id !== req.body.offer.providerId) {
    res.sendForbidden();
    return;
  }
  const offerToUpdate: OfferInstance = req.body.offer;
  offerToUpdate.set(genOfferValues(req.body));
  offerToUpdate.set('public', false);
  offerToUpdate.set('status', 'validation in progress');
  try {
    await offerToUpdate.save();
  } catch (err) {
    res.sendBadRequest(err.message);
    return;
  }
  res.status(201).send({message: 'Edited'});
}
router.put('/edit', AuthenticationController, loadOffer, updateOffer);

/**
 * delete a Offer
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 * - **201:** Created: registration successful
 */
export async function deleteOffer(req: Request, res: Response) {
  if (req.session.user.id !== req.body.offer.providerId && req.session.admin === null) {
    res.sendForbidden();
    return;
  }
  await req.body.offer.destroy().catch((err: any) => res.status(500).send({message: 'Error while deleting offer'}));
  res.sendSuccess();
}
router.put('/delete', AuthenticationController , loadOffer, deleteOffer);


export const OffersController: Router = router;
