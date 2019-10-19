import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Sequelize} from 'sequelize-typescript';


const router: Router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));




router.get('/', async (req: Request, res: Response) => {
    res.statusCode = 200;
});


router.post('/', async (req: Request, res: Response) => {
    const instance = new User();

    instance.fromSimplification(req.body);
    await instance.save();
    res.statusCode = 201;
    console.log(req.body.username);
   res.send(instance.toSimplification());

});



export const RegisterController: Router = router;
