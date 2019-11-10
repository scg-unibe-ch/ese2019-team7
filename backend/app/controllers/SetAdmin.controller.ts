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

router.post('/', setAdminDef);

async function setAdminDef(rawReq: any, rawRes: any) {
  setAdmin(rawReq, rawRes, getDatabase());
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
export async function setAdmin(rawReq: any, rawRes: any, Db: any) {
  const req: Request = rawReq;
  const res: Response = rawRes;

  const user = await Db.User.findOne({where: {id: req.body.id }});

  const adminRights = {
    setPublic: req.body.setPublic,
    deleteOffers: req.body.deleteOffers,
    deleteUsers: req.body.deleteUser,
    createAdmins: req.body.createAdmin,
  };
  let admin;
  try {
    admin = await Db.Admin.create(adminRights);
  } catch (err) {
    res.status(400).send({message: '.'});
    return;
  }
  try {
    await user.setAdmin(admin, {save: false});
    await user.save();
  } catch (e) {
    res.status(500).send({message: 'Internal Server error: Could not assign admin to user.\n' + e.message});
    return;
  }
  res.status(201).send({message: 'Admin set'});
}



export const setAdminController: Router = router;
