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
  const instance = createModels();
    await instance.User.create({
      address: req.body.address,
      phone: req.body.tel,
      name: req.body.username,
      password: req.body.password,
      eMail: req.body.eMail} ).catch(err => res.status(500).json({ err: ['oops', err.name] }));
      res.statusCode = 201;
    console.log('register complete');
});


export const RegisterController: Router = router;
