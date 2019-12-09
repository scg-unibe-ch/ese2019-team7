import {Router, Request, Response} from 'express';


const router: Router = Router();

router.use(notFound);


async function notFound(req: Request, res: Response) {
  res.status(404).send({ message: 'Not Found'});
}

export const notFoundController: Router = router;
