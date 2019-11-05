import {Router, Request, Response} from 'express';
import {getDatabase} from '../database';

const bcrypt = require('bcrypt');

const router: Router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));




router.get('/', async (req: Request, res: Response) => {
    res.statusCode = 200;
});


router.post('/', registerDef)

async function registerDef(rawReq: any, rawRes: any) {
  register(rawReq, rawRes, getDatabase().User);
}
/**
 * register of a user. Format of the body should be as follow:
 * > { username: usr, password: pwd, address: adr, tel: phone, email: email }
 *address and tel are optional.
 *
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 * - **409:** Conflict Username already taken
 *
 * - **201:** Created: registration successful
 * @param rawReq
 * @param rawRes
 * @param User User table of the database
 */
export async function register(rawReq: any, rawRes: any, User: any) {
  const req: Request = rawReq;
  const res: Response = rawRes;
  if (!(req.body.username && req.body.password && req.body.email)) res.sendStatus(400); // Bad Request
  const userValues = {
    address: req.body.address,
    phone: req.body.tel,
    name: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    eMail: req.body.email
  };

  try {
    await User.create(userValues);
  } catch (err) {
    res.status(409).send({message: ' Username already exist.'});
    return;
  }
  res.status(201).send({message: 'Registration complete'});
}



export const RegisterController: Router = router;
