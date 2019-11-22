import {Router, Request, Response} from 'express';
import {getDatabase} from '../database';
import {OfferAttributes, OfferInstance} from '../models/offer.model';
import {DbInterface} from '../dbtypings/dbInterface';
import {AuthenticationController} from './authentication.controller';
import {AdminAuthenticationController} from './adminAuthentication.controller';


const router: Router = Router();

function genUserValues(obj: any) {
  const userValues = {
  phone: obj.phone,
  eMail: obj.email,
  address: obj.address
  };
  return userValues;
}
router.get('/', AuthenticationController, loadUserDef, async (req: Request, res: Response) => {

  const provider = req.session.user
    res.status(200).send({
      name: provider.name,
      email: provider.eMail,
      phone: provider.phone,
      address: provider.address
    });
});
router.put('/edit', AuthenticationController, loadUserDef, updateUserDef);
router.delete('/', AuthenticationController , loadUserDef, deleteUserDef);
async function deleteUserDef(rawReq: any, rawRes: any) {
  deleteUser(rawReq, rawRes, getDatabase());
}

async function updateUserDef(rawReq: any, rawRes: any) {
  updateUser(rawReq, rawRes, getDatabase().User);
}
export async function updateUser(req: Request, res: Response, offer: any) {

  const user = req.session.user
  user.set(genUserValues(req.body));
  //offerToUpdate.set('public', false);
  try {
    await user.save();
  } catch (err) {
    res.sendBadRequest(err.message);
    return;
  }
  res.status(201).send({message: 'Edited'});
}
/**
 * delete a User
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 * - **200:**Ok
 * @param rawReq
 * @param rawRes
 * @param offer Offer table of the database
 */
export async function deleteUser(req: Request, res: Response, Db: DbInterface) {
  if (req.session.user.id === null && req.session.admin === null) {
    res.sendForbidden();
    return;
  }
  await req.session.user.destroy().catch((err: any) => res.status(500).send({message: 'Error while deleting offer'}));
  res.sendSuccess();
}
export async function loadUserDef(req: Request, res: Response, next: Function) {
  await loadUser(req, res, next, getDatabase());
}

export async function loadUser(req: Request, res: Response, next: Function, Db: DbInterface) {
  if (typeof (req.session.user.id) !== 'number') {
    res.status(400).send({message: 'Bad request'});
    return;
  }
  const userToLoad = await Db.User.findOne({where: {id: req.session.user.id}});
  if (userToLoad === null) {
    res.sendBadRequest('Bad request: Offer Id nonexistent');
    return;
  }
  req.session.user = userToLoad;
  next();
}
export const UserController: Router = router;
