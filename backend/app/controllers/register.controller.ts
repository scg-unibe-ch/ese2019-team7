import {Router, Request, Response} from 'express';

import {Sequelize} from 'sequelize-typescript';
import {createModels} from '../models/index.model';
const bcrypt = require('bcrypt');

const router: Router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));




router.get('/', async (req: Request, res: Response) => {
    res.statusCode = 200;
});


router.post('/', async (req: Request, res: Response) => {

  if (!(req.body.username && req.body.password && req.body.email)) res.sendStatus(400); // Bad Request
  const user = {
    address: req.body.address,
    phone: req.body.tel,
    name: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    eMail: req.body.email
  };
  const userjson= JSON.parse('{ "message" : "register complete" }')
  const instance = createModels();
  try{ await instance.User.create(user);
    res.status(201).send(userjson);}
  catch(err) {res.status(400).send({ err: ['oops', err.name] }); }

});



export const RegisterController: Router = router;
