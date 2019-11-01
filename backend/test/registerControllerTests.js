var RegisterController = require('../build/controllers/register.controller.js')
var assert = require('assert');
var tests = require('./Tests.js');
const bcrypt = require('bcrypt');
var User;

const users = [{
  name: 'hans',
  password: '123',
  eMail: 'example@example.com'
}];

// #### Tests declarations ####
describe('register.controller', registerControllerTests);

function registerControllerTests() {
  describe('Database #register()', databaseRegisterTests);
}

async function databaseRegisterTests() {
  beforeEach(async () => User = (await tests.setupMemoryDatabase(users)).User);
  it('Username already exists', usernameAlreadyExistsTest);
  it('valid Register', validRegisterTest);
}

async function usernameAlreadyExistsTest() {

  const req = {
    body: {
      username: "hans",
      password: "123",
      email: "example@example.com"
    },
    session: {}
  };
  await RegisterController.register(req, tests.getRes(409), User);
}

async function validRegisterTest() {

  const req = {
    body: {
      username: "uelii",
      password: "1234",
      email: "example@example.comm"
    },
    session: {}
  };
  await RegisterController.register(req, tests.getRes(201), User);
}
