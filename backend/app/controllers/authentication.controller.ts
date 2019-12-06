import {Router, Request, Response} from 'express';
import {AdminInstance} from '../models/admin.model';
import {getDatabase} from "../database";

const router: Router = Router();

router.use(checkAuthentication);

export async function checkAuthentication(req: Request, res: Response, next: Function) {
  if (req.session.user) {
    try {
      const user = await req.db.User.findOne({where: {id: req.session.user.id }, rejectOnEmpty: true});
      if(user != null) req.session.user = user;
      else throw 'err';
    }
    catch (e) {
      res.status(500).send('Internal Server Error: failed to find authenticated user');
    }
    const admin: AdminInstance | null = await getDatabase().Admin.findOne({where: { userId: req.session.user.id}});
    req.session.admin = admin;
    // express doesn't use a promise for the next function, but the test framework does, so await is still necessary
    await next();
  } else {
    res.status(401).send({ message: 'Unauthenticated'});
  }
}

export const AuthenticationController: Router = router;
