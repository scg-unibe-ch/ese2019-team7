import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';


const router: Router = Router();

const bcrypt = require('bcrypt');

function genUserValues(obj: any) {
  const userValues = {
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
router.put('/edit', AuthenticationController, loadUser, updateUser);
router.delete('/', AuthenticationController , loadUser, deleteUser);



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
  user.set(genUserValues(req.body));
  // offerToUpdate.set('public', false);
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
export async function deleteUser(req: Request, res: Response) {
  if (req.session.user.id === null && req.session.admin === null) {
    res.sendForbidden();
    return;
  }
  await req.session.user.destroy().catch((err: any) => res.status(500).send({message: 'Error while deleting user'}));
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
