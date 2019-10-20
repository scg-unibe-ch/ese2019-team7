var LoginController = require('../build/controllers/login.controller.js')
var assert = require('assert');
describe('login.controller', loginControllerTests);
var User;

/*
  Execute the tests with 'npm test'

  To run manual tests with curl:
  curl -X PUT  -H 'Content-Type: application/json' -d '{"username": "mueller", "password": "1234", "phone": "079", \
    "email": "examples@example.com", "address": "Bern" }' "http://localhost:3000/login"
 */

function loginControllerTests() {
  before(setupExpress);
  describe('#login()', loginTests);
}

function setupExpress() {
  //Setup environment for the tests here
  User = {
    findOne: function() {
      return {};
    }
  }
}

function loginTests() {
  //Put the calls to all testfunctions here
  it('validLogin', validLoginTest);
  it('Error 409 already logd in', alreadyLogdinTest);
}

async function validLoginTest() {
  const req = {
      body: {
        username: "hans",
        password: "qwertz"
      },
      session: {}

  };
  const res = {
    status: (status) => {assert.equal(status, 200); return res;},
    sendStatus: (status) => {assert.equal(status, 200);},
    send: () => {}
  };
  await LoginController.login(req, res, User);
}

async function alreadyLogdinTest() {
  const req = {
    body: {
      username: "hans",
      password: "qwertz"
    },
    session: {
      user: "alreadyLogdIn"
    }

  };
  const res = {
    status: (status) => {assert.equal(status, 409); return res;},
    sendStatus: (status) => {assert.equal(status, 409);},
    send: () => {}
  };
  await LoginController.login(req, res, User);
}


