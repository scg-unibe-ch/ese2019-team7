import {Router, Request, Response} from 'express';
import {createModels} from '../models/index.model';

const router: Router = Router();

router.use(checkAuthentication);
router.get('/protected', testAuthentication);
router.get('/logout', logout);

function checkAuthentication(rawReq: any, rawRes: any, next: any) {
  const req: Request & {session: any} = rawReq;
  const res: Response = rawRes;
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(403); // forbidden
  }
}

async function testAuthentication(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  res.status(200).send('You are successfully authenticated, mister ' + req.session.user.name);
}

async function logout(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  req.session.user = undefined;
  res.sendStatus(200); // OK
}

export const AuthenticationController: Router = router;