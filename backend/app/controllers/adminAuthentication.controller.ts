import {Router, Request, Response} from 'express';

const router: Router = Router();

router.use(checkAuthentication);


async function checkAuthentication(req: Request, res: Response, next: Function) {
  if (req.session.user) {
    try {
      const user = await req.db.User.findOne( { where: {id: req.session.user.id, adminId: 1 }, rejectOnEmpty: true});
      if(user != null) req.session.user = user;
      else throw 'err';
    }
    catch (e) {
      res.status(401).send({message: 'Unauthorized: failed to find admin user'});
    }
    next();
  } else {
    res.status(401).send({ message: 'Unauthenticated'});
  }
}

export const AdminAuthenticationController: Router = router;
