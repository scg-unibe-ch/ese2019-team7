import {Router, Request, Response} from 'express';



const bcrypt = require('bcrypt');

const router: Router = Router();


router.put('/', login);

/**
 * Log in the user. Format of the body should be as follow:
 * > { username: usr, password: pwd }
 *
 * Possible error codes:
 * - **400:** Bad request format. Look above to see the correct format.
 * - **401:** Unauthorized: wrong username password combination
 * - **409:** Conflict: user already logged in
 * - **200:** OK: login successful. Session cookie is updated. User information is returned.
 */
export async function login(req: Request, res: Response) {
  const name = req.body.username;
  const pword = req.body.password;
  if (!name || !pword) {
    res.sendBadRequest();
    return;
  }
  if (req.session.user != null) {
    res.status(409).send({message: 'Please first logout before trying to login.'});
    return;
  }
  const user = await req.db.User.findOne({where: {name : name }});
  if (user == null ) {
    res.status(401).send({message: 'Invalid Username, Password combination '}); // Unauthorized
    return;
  }
  else if (!bcrypt.compareSync(pword, user.password)) {
    res.status(401).send({message: 'Invalid Username, Password combination '}); // Unauthorized
    return;
  }

  req.session.user = user;
  res.status(200).send(user);
}

export const LoginController: Router = router;

