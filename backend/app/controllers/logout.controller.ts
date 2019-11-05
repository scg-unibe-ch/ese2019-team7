import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';

const router: Router = Router();

router.use(AuthenticationController);
router.get('/protected', testAuthentication);
router.get('/logout', logout);

async function testAuthentication(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  res.status(200).send({ message: 'You are successfully authenticated, mister ' + req.session.user.name});
}

async function logout(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  req.session.user = undefined;
  res.status(200).send({message: 'ok'}); // OK
}

export const LogoutController: Router = router;
