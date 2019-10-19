import {Sequelize} from 'sequelize-typescript';
import {LoginController} from './controllers/login.controller';
import {RegisterController} from './controllers/register.controller';
import express from 'express';
import { createModels } from './models/index.model';


/*const sequelize =  new Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db3.sqlite'
});
 */

const db = createModels();

// create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(express.static('app'))

// define the port the express app will listen on
var port: number = 3000;
if (process.env.PORT !== undefined) {
    port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/login', LoginController );
app.use('/register.html', RegisterController );




db.sequelize.sync().then(() => {
// start serving the application on the given port
    app.listen(port, () => {
        // success callback, log something to console as soon as the application has started
        console.log(`Listening at http://localhost:${port}/`);
    });
});
