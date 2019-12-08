import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';

const router: Router = Router();

router.use(AuthenticationController);
router.get('/', testAuthentication);


async function testAuthentication(req: Request, res: Response) {
  if(req.session.admin !== null)
  {
    res.status(200).send({ message: 'You are authenticated as admin, mister ' + req.session.user.name});
  }
  else
  {
    res.status(401).send({ message: 'Unauthenticated'});
  }
}

export const AdminProtectedController: Router = router;
