import {Router, Request, Response} from 'express';

import {Sequelize} from 'sequelize-typescript';
import {createModels} from '../models/index.model';


const router: Router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));




router.get('/', async (req: Request, res: Response) => {
    res.statusCode = 200;
});


router.post('/', async (req: Request, res: Response) => {

  const user = {
    address: req.body.address,
    phone: req.body.phone,
    name: req.body.username,
    password: req.body.password,
    eMail: req.body.email
  };

  if (!(user.name && user.password && user.eMail)) res.sendStatus(400); // Bad Request
  const instance = createModels();
  await instance.User.create(user).catch(err => res.status(500).send({ err: ['oops', err.name] }));
  res.status(201).send('register complete');
});



export const RegisterController: Router = router;
