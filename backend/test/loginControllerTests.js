var indexModel = require('../build/models/index.model.js');

var LoginController = require('../build/controllers/login.controller.js')
var assert = require('assert');
const bcrypt = require('bcrypt');
describe('login.controller', loginControllerTests);
var User;

/*
  Execute the tests with 'npm test'

  To run manual tests with curl:
  curl -X PUT  -H 'Content-Type: application/json' -d '{"username": "mueller", "password": "1234", "phone": "079", \
    "email": "examples@example.com", "address": "Bern" }' "http://localhost:3000/login"

  -b cookie => send cookie to server
  -c file => save cookies to file
 */

function loginControllerTests() {
  describe('#login()', loginTests);
  describe('Database #login()', databaseLoginTests);
}

function setupMockDatabase() {
  //Setup environment for the tests here
  User = {
    findOne: function() {
      return {
        name: 'hans',
        password: bcrypt.hashSync('123', 10)
      };
    }
  }
}

async function setupMemoryDatabase() {
  const db = indexModel.createModels(':memory:');
  await db.sequelize.sync();

  const user = {
    name: 'hans',
    password: bcrypt.hashSync('123', 10),
    eMail: 'example@example.com'
  };
  await db.User.create(user);
  User = db.User;
}

function getRes(expectedStatus) {
  const res = {
    status: (status) => {assert.equal(status, expectedStatus); return res;},
    sendStatus: (status) => {assert.equal(status, expectedStatus);},
    send: () => {}
  };
  return res;
}

function loginTests() {
  //Put the calls to all testfunctions here
  beforeEach(setupMockDatabase);
  it('validLogin', validLoginTest);
  it('Error 409 already logd in', alreadyLogdinTest);
}

function databaseLoginTests() {
  beforeEach(setupMemoryDatabase);
  it('Database valid Login', validLoginTest);
  it('Wrong password', wrongPasswordTest);
}

async function wrongPasswordTest() {
  const req = {
    body: {
      username: "hans",
      password: "1234"
    },
    session: {}
  };
  await LoginController.login(req, getRes(401), User); //Unauthorized
}

async function validLoginTest() {

  const req = {
    body: {
      username: "hans",
      password: "123"
    },
    session: {}
  };
  await LoginController.login(req, getRes(200), User);
}

async function alreadyLogdinTest() {
  const req = {
    body: {
      username: "hans",
      password: "123"
    },
    session: {
      user: "alreadyLogdIn"
    }

  };
  await LoginController.login(req, getRes(409), User);
}


