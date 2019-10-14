import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Sequelize} from 'sequelize-typescript';

const router: Router = Router();
router.get('/', async (req: Request, res: Response) => {
    res.statusCode = 200;
    res.send('Welcome to Express');
});

router.put('/', async (req: Request, res: Response) => {
    const names = req.body.Username;
    const pword = req.body.Password;
    const instance = await User.findOne({where: {name : names , password : pword }});
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'Not existing Password Username combination'
        });
        return;
    }


    res.statusCode = 200;
    res.send(instance.toSimplification());

});


export const LoginController: Router = router;
