import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';


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
router.get('/', AuthenticationController, async (req: Request, res: Response) => {

  const provider = req.session.user;
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
 *
 */
router.put('/edit', AuthenticationController, updateUser);
/**
 * delete the logged in User
 * Possible Http codes:
 * - **500:** something terrible happend
 * - **200:**Ok
 */
router.delete('/', AuthenticationController, deleteUser);


/**
 * change  password
 * requires the old Password and The new one
 * and valid user credentials
 * Possible Http codes:
 * - **500:** something terrible happend
 * -**401:** wrong password
 * - **200:**Ok
 */
router.put('/changePassword', AuthenticationController, changePassword);

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
  if (user.id !== undefined) {
    await req.db.Offer.update(
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

export async function deleteUser(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  await req.session.user.destroy().catch((err: any) => res.status(500).send({message: 'Error while deleting user'}));
  req.session.user = undefined;
  res.sendSuccess();
}

export const UserController: Router = router;
