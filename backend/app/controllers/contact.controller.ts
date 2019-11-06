import {Router, Request, Response} from 'express';
import {createModels} from '../models/index.model';
import {UserInstance} from '../models/user.model';

const router: Router = Router();

const users = createModels().User;
router.get('/', async (req: Request, res: Response) => {
 users.findOne({
    attributes: ['name', 'eMail', 'phone'],
    where: {
      id: req.body.Userid,
    }})
    .then(( user: UserInstance|null) => res.status(200).json({ user }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));

});
export const ContactController: Router = router;
