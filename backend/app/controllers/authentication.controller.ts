import {Router, Request, Response} from 'express';
import {createModels} from '../models/index.model';

const router: Router = Router();

router.use(checkAuthentication);


function checkAuthentication(rawReq: any, rawRes: any, next: any) {
  const req: Request & {session: any} = rawReq;
  const res: Response = rawRes;
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized'});
  }
}

export const AuthenticationController: Router = router;
