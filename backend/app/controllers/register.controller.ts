import {Router, Request, Response} from 'express';

const bcrypt = require('bcrypt');

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.statusCode = 200;
});


router.post('/', register)

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
export async function register(req: Request, res: Response) {
  if (!(req.body.username && req.body.password && req.body.email)) res.sendStatus(400); // Bad Request
  const userValues = {
    address: req.body.address,
    phone: req.body.tel,
    name: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    eMail: req.body.email
  };

  try {
    await req.db.User.create(userValues);
  } catch (err) {
    res.status(409).send({message: ' Username already exist.'});
    return;
  }
  res.status(201).send({message: 'Registration complete'});
}



export const RegisterController: Router = router;
