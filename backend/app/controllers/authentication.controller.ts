import {Router, Request, Response} from 'express';
import {AdminInstance} from '../models/admin.model';

const router: Router = Router();

router.use(checkAuthentication);

async function checkAuthentication(req: Request, res: Response, next: Function) {
  if (req.session.user) {
    try {
      const user = await req.db.User.findOne({where: {id: req.session.user.id }, rejectOnEmpty: true});
      if(user != null) req.session.user = user;
      else throw 'err';
    }
    catch (e) {
      res.status(500).send('Internal Server Error: failed to find authenticated user');
    }
    const admin: AdminInstance | null = await req.session.user.getAdmin();
    req.session.admin = admin;
    next();
  } else {
    res.status(401).send({ message: 'Unauthenticated'});
  }
}

export const AuthenticationController: Router = router;
