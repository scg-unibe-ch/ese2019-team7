import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';


const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.statusCode = 200;
});

/**
 * Creation of a Admin.
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 * - **201:** Created:
 * @param rawReq
 * @param rawRes
 * @param Admin Admin table of the database
 */
export async function setAdmin(req: Request, res: Response) {
  if (req.session.admin == null  || req.session.admin.createAdmins === false) {
    res.sendForbidden();
    return;
  }
  const user = await req.db.User.findOne({where: {id: req.body.id }});
  if (user === null) {
    res.sendBadRequest('Id does not belong to any user.')
    return;
  }

  const adminRights = {
    setPublic: req.body.setPublic,
    deleteOffers: req.body.deleteOffers,
    deleteUsers: req.body.deleteUser,
    createAdmins: req.body.createAdmin,
  };
  let admin;
  try {
    admin = await req.db.Admin.build(adminRights);
  } catch (err) {
    res.status(400).send({message: '.'});
    return;
  }
  try {
    await admin.setUser(user, {save: false});
    await user.save();
  } catch (e) {
    res.status(500).send({message: 'Internal Server error: Could not assign admin to user.\n' + e.message});
    return;
  }
  res.status(201).send({message: 'Admin set'});
}
router.post('/', AuthenticationController, setAdmin);


export const setAdminController: Router = router;
