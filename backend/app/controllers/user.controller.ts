import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';
import {getDatabase} from '../database';


const router: Router = Router();

const bcrypt = require('bcrypt');

function genUserValues(obj: any) {
  const userValues = {
  name: obj.username,
  phone: obj.phone,
  eMail: obj.email,
  address: obj.address
  };
  return userValues;
}
router.get('/', AuthenticationController, loadUser, async (req: Request, res: Response) => {

  const provider = req.session.user
    res.status(200).send({
      name: provider.name,
      email: provider.eMail,
      phone: provider.phone,
      address: provider.address
    });
});
/**
 * change User data
 * no password change
 * the offers of the user are set to unvalidated state
 * Possible Http codes:
 * - **500:** something terrible happend
 * - **200:**Ok
 * @param rawReq
 * @param rawRes
 *
 */
router.put('/edit', AuthenticationController, loadUser, updateUser);
/**
 * delete a User
 * Possible Http codes:
 * - **500:** something terrible happend
 * - **200:**Ok
 * @param rawReq
 * @param rawRes
 * @param offer Offer table of the database
 */
router.delete('/', AuthenticationController , loadUser, deleteUser, logout);


/**
 * change  password
 * requires the old Password and The new one
 * and valid user credentials
 * Possible Http codes:
 * - **500:** something terrible happend
 * -**401:** wrong password
 * - **200:**Ok
 * @param rawReq
 * @param rawRes
 * @param offer Offer table of the database
 */
router.put('/changePassword', AuthenticationController, loadUser, changePassword);

export async function changePassword(req: Request, res: Response) {
  const user = req.session.user;
  const pword = req.body.password
 if (!bcrypt.compareSync(pword, user.password)) {
    res.status(401).send({message: 'Wrong  Password'}); // Unauthorized
    return;
  }
 await user.update({password: bcrypt.hashSync(req.body.passwordNew, 10) })
   .catch((err: any) => res.status(500).send({message: 'Error while changing Password'})),
res.sendSuccess();

}

export async function updateUser(req: Request, res: Response) {

  const user = req.session.user;
  if(user.id !== undefined){
  await getDatabase().Offer.update(
    {public: false, status: 'validation in progress'},
    {where: {providerId: user.id}});
  }
  user.set(genUserValues(req.body));

  try {
    await user.save();
  } catch (err) {
    res.sendBadRequest(err.message);
    return;
  }
  res.status(201).send({message: 'Edited'});
}

export async function deleteUser(req: Request, res: Response, next: Function) {
  if (req.session.user.id === null && req.session.admin === null) {
    res.sendForbidden();
    return;
  }
  await req.session.user.destroy().catch((err: any) => res.status(500).send({message: 'Error while deleting user'}));
  next();
}

async function logout(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  req.session.user = undefined;
  res.sendSuccess();
}

export async function loadUser(req: Request, res: Response, next: Function) {
  if (typeof (req.session.user.id) !== 'number') {
    res.status(400).send({message: 'Bad request'});
    return;
  }
  const userToLoad = await req.db.User.findOne({where: {id: req.session.user.id}});
  if (userToLoad === null) {
    res.sendBadRequest('Bad request: User Id nonexistent');
    return;
  }
  req.session.user = userToLoad;
  next();
}
export const UserController: Router = router;
