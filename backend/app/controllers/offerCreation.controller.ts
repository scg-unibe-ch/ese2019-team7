import {Router, Request, Response} from 'express';
import {createModels} from '../models/index.model';
import {UserInstance} from '../models/user.model';
import {AuthenticationController} from './authentication.controller';
import {AssertionError} from "assert";


const router: Router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));

router.use(AuthenticationController);
router.get('/', async (req: Request, res: Response) => {
  res.statusCode = 200;
});

router.post('/', createDef);

async function createDef(rawReq: any, rawRes: any) {
  create(rawReq, rawRes, createModels().Offer);
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
export async function create(rawReq: any, rawRes: any, Offer: any) {
  const req: Request & {session: {user: UserInstance}} = rawReq;
  const res: Response = rawRes;

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
    offer = await Offer.create(offerValues);
  } catch (err) {
    res.status(400).send({message: '.'});
    return;
  }
  try {
    await offer.setProvider(req.session.user);
    await offer.save();
  } catch (e) {
    res.status(500).send({message: 'Internal Server error: Could not assign offer to user.\n' + e.message});
  }
  res.status(201).send({message: 'Offer created'});
}



export const OfferCreateController: Router = router;
