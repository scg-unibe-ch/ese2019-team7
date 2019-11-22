import {Router, Request, Response} from 'express';


const router: Router = Router();

router.use(notFound);


async function notFound(rawReq: any, res: Response) {
  const req: Request & {session: any} = rawReq;
  res.status(404).send({ message: 'Not Found'});
}

export const notFoundController: Router = router;
