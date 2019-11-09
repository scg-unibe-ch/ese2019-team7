import {Router, Request, Response} from 'express';
import {DbInterface} from '../dbtypings/dbInterface';
import {getDatabase} from '../database';

const router: Router = Router();

router.use(checkAuthenticationDef);


async function checkAuthenticationDef(req: Request, res: Response, next: any) {
  await checkAuthentication(req, res, next, getDatabase());
}

async function checkAuthentication(req: Request, res: Response, next: any, Db: DbInterface) {
  if (req.session.user) {
    try {
      const user = await Db.User.findOne({where: {id: req.session.user.id }, rejectOnEmpty: true});
      if(user != null) req.session.user = user;
      else throw 'err';
    }
    catch (e) {
      res.status(500).send('Internal Server Error: failed to find authenticated user');
    }
    next();
  } else {
    res.status(401).send({ message: 'Unauthenticated'});
  }
}

export const AuthenticationController: Router = router;
