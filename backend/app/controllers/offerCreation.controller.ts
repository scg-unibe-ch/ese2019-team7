import {Router, Request, Response} from 'express';
import {UserInstance} from '../models/user.model';
import {AuthenticationController} from './authentication.controller';
import {getDatabase} from '../database';


const router: Router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));

router.use(AuthenticationController);
router.get('/', async (req: Request, res: Response) => {
  res.statusCode = 200;
});

router.post('/', createDef);

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
  const req: Request & {session: {user: UserInstance}} = rawReq;
  const res: Response = rawRes;

  const user = await Db.User.findOne({where: {id: req.session.user.id }});

  const offerValues = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    public: req.body.public,
    category: req.body.category,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
   // provider:req.session.user.id
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



export const OfferCreateController: Router = router;
