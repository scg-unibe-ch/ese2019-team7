import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';

const router: Router = Router();

router.use(AuthenticationController);
router.get('/', testAuthentication);


async function testAuthentication(req: Request, res: Response) {
  res.status(200).send({ message: 'You are successfully authenticated, mister ' + req.session.user.name});
}

export const protectedController: Router = router;
