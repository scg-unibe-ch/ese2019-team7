import {Router, Request, Response} from 'express';
import {Sequelize} from 'sequelize-typescript';
import {createModels} from '../models/index.model';
import {UserFactory} from "../models/user.model";

const session = require('express-session');

const router: Router = Router();
router.get('/', async (req: Request, res: Response) => {
    res.statusCode = 200;
    res.send('Welcome to Express');
});


router.put('/', async (rawReq: any, res: Response) => {
    const req: Request & {session: any} = rawReq;
    const User = createModels().User;
    const name = req.body.username;
    const pword = req.body.password;
    if (!name || !pword) res.sendStatus(400); // Bad Request
    const user = await User.findOne({where: {name : name , password : pword }});
    if (user == null) {
      res.sendStatus(401); // Unauthorized
      return;
    }
    if (req.session === undefined || req.session === null) res.status(500).send('Internal Server Error: sessions not working.');
    if (req.session.user != null)
      res.status(409).send('Conflict: Please first logout before trying to login.');
    req.session.user = user;
    res.status(200).send(user);
});
/*
async function login(req: Request, res: Response) {
  const name = req.body.name;
  const pword = req.body.pword;
  if (!name || !pword) res.sendStatus(400); // Bad Request
  const user: SimpleUser = users.login(name, pword);
  if (!user) res.sendStatus(401); // Unauthorized
  req.session.user = user;
  res.status(200).send(user);
}

*/
export const LoginController: Router = router;

