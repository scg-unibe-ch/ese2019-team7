var LoginController = require('../build/controllers/login.controller.js')
var assert = require('assert');
var tests = require('./Tests.js');
const bcrypt = require('bcrypt');
var User;

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

const users = [{
  name: 'hans',
  password: '123',
  eMail: 'example@example.com'
}];

// #### Tests declarations ####
describe('login.controller', loginControllerTests);

function loginControllerTests() {
  describe('#login()', loginTests);
  describe('Database #login()', databaseLoginTests);
}

function loginTests() {
  //Put the calls to all testfunctions here
  beforeEach(setupMockDatabase);
  it('validLogin', validLoginTest);
  it('Error 409 already logd in', alreadyLogdinTest);
}

async function databaseLoginTests() {
  beforeEach(async () => User = (await tests.setupMemoryDatabase(users)).User);
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
  await LoginController.login(req, tests.getRes(401), User); //Unauthorized
}

async function validLoginTest() {
  const req = {
    body: {
      username: "hans",
      password: "123"
    },
    session: {}
  };
  await LoginController.login(req, tests.getRes(200), User);
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
  await LoginController.login(req, tests.getRes(409), User);
}

