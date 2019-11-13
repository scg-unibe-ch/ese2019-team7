import {Router, Request, Response} from 'express';
import {AdminAuthenticationController} from './adminAuthentication.controller';

const router: Router = Router();

router.use(AdminAuthenticationController);
router.get('/', testAuthentication);


async function testAuthentication(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  res.status(200).send({ message: 'You are authenticated as admin, mister ' + req.session.user.name});
}

export const AdminProtectedController: Router = router;
