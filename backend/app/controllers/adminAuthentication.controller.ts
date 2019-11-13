import {Router, Request, Response} from 'express';
import {DbInterface} from '../dbtypings/dbInterface';
import {getDatabase} from '../database';

const router: Router = Router();

router.use(checkAuthenticationDef);


async function checkAuthenticationDef(req: Request, res: Response, next: Function) {
  await checkAuthentication(req, res, next, getDatabase());
}

async function checkAuthentication(req: Request, res: Response, next: Function, Db: DbInterface) {
  if (req.session.user) {
    try {
      const user = await Db.User.findOne( { where: {id: req.session.user.id, adminId: 1 }, rejectOnEmpty: true});
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
