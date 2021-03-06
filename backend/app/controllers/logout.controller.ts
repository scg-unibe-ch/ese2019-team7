import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';

const router: Router = Router();

router.use(AuthenticationController);
router.get('/', logout);

async function logout(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  req.session.user = undefined;
  res.sendSuccess();
}

export const LogoutController: Router = router;
