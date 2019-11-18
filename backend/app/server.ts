import {LoginController} from './controllers/login.controller';
import {RegisterController} from './controllers/register.controller';
import {LogoutController} from './controllers/logout.controller';
import {AuthenticationController} from './controllers/authentication.controller';
import express from 'express';
import { createModels } from './models/index.model';

import {OffersController} from './controllers/offers.controller';
import {getDatabase} from './database';
import {initDatabase} from './database';

import {protectedController} from './controllers/protected.controller';
import {notFoundController} from './controllers/notFound.controller';
import {ContactController} from './controllers/contact.controller';

// @ts-ignore
import * as setupFunctions from '../app/setupFunctions.js';
import {AdminProtectedController} from './controllers/adminProdected.controller';

const session = require('express-session');
const cookieParser = require('cookie-parser');




// create a new express application instance
setupFunctions.addFullResponseFunctions(express.response);
const app: express.Application = express();
app.use(express.json());
app.use(express.static('app'));

// define the port the express app will listen on
var port: number = 3000;
if (process.env.PORT !== undefined) {
    port = parseInt(process.env.PORT);
}

const cors = require('cors');
app.use(cors({origin: [
    'http://localhost:4200'
  ], credentials: true}));

app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Session handling
app.use(cookieParser());
app.use(session({secret: 'lkdshfiohadfio'}));
app.use(function (req: any, res, next) {
  if (req.session === undefined || req.session === null) {
    res.status(500).send('Internal Server Error: sessions not working.');
    return;
  }
  next();
});

// Files declarations
app.use('/login', LoginController );
app.use('/register', RegisterController );

app.use('/offers', OffersController );
app.use('/adminprotected', AdminProtectedController);
app.use('/logout', LogoutController);
app.use('/protected', protectedController);
app.use('/contact', ContactController);
app.use(notFoundController);


initDatabase().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
