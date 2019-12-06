import express from 'express';
import {Request, Response} from 'express';

import {getDatabase} from './database';
import {initDatabase} from './database';
// @ts-ignore
import * as setupFunctions from '../app/setupFunctions.js';

// Controllers
import {LoginController} from './controllers/login.controller';
import {RegisterController} from './controllers/register.controller';
import {LogoutController} from './controllers/logout.controller';
import {OffersController} from './controllers/offers.controller';
import {protectedController} from './controllers/protected.controller';
import {notFoundController} from './controllers/notFound.controller';
import {ContactController} from './controllers/contact.controller';
import {AdminProtectedController} from './controllers/adminProdected.controller';
import {UserController} from './controllers/user.controller';

const session = require('express-session');
const cookieParser = require('cookie-parser');

// Process cmd line arguments
const testdbCmd = 'testdb';
const productiondbCmd = 'productiondb';
let useTestDb = false;

if (process.argv.length > 3) {
  help();
  process.exit(1);
}
if (process.argv.length === 3) {
  if (process.argv[2].toLowerCase() === productiondbCmd.toLowerCase()) {
    useTestDb = false;
  } else if (process.argv[2].toLowerCase() === testdbCmd.toLowerCase()) {
    useTestDb = true;
  } else {
    help();
    process.exit(1);
  }
}

// create a new express application instance
setupFunctions.addFullResponseFunctions(express.response);
const app: express.Application = express();
app.use(express.json());
app.use(express.static('app'));

// define the port the express app will listen on
let port = 3000;
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
app.use(session({secret: 'lkdshfiohadfio',
  resave: true,
  saveUninitialized: true, }));
app.use(function (req: any, res, next) {
  if (req.session === undefined || req.session === null) {
    res.status(500).send('Internal Server Error: sessions not working.');
    return;
  }
  next();
});

// Set Database in request
app.use( async (req: Request, res: Response, next: Function) => {
  req.db = getDatabase();
  if (req.db === null || req.db === undefined) res.sendError('Error loading database.');
  next();
});

// Files declarations
app.use('/login', LoginController );
app.use('/register', RegisterController );

app.use('/offers', OffersController );
app.use('/user', UserController);

app.use('/adminprotected', AdminProtectedController);
app.use('/logout', LogoutController);
app.use('/protected', protectedController);
app.use('/contact', ContactController);
app.use(notFoundController);

initDatabase(useTestDb).then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});

function help() {
  const msg = `Usage: ${process.argv[0]} ${process.argv[1]} [${testdbCmd} | ${productiondbCmd}]\n` +
    `${testdbCmd}: Use the Test Database (auto generated Database with test entries)\n` +
    `${productiondbCmd}: Use the Production Database\n` +
    'If no options are given, the production Database is used';
  console.log(msg);
}
