import {Router, Request, Response} from 'express';
import {createModels} from '../models/index.model';
import {UserInstance} from '../models/user.model';
import {AuthenticationController} from './authentication.controller';

const router: Router = Router();

const users = createModels().User;
router.put('/', AuthenticationController, async (req: Request, res: Response) => {
 users.findOne({
    attributes: ['name', 'eMail', 'phone'],
    where: {
      id: req.body.id,
    }})
    .then(( user: UserInstance|null) => {
      if (user === null) res.sendBadRequest('Could not find User with id ' + req.body.id + '.');
      res.status(200).json({user});
    })
    .catch(err => res.status(500).json({ message: err }));

});
export const ContactController: Router = router;
