var authenticationController = require('../build/controllers/authentication.controller');
var userController = require('../build/controllers/user.controller');
var assert = require('assert');
var tests = require('./Tests.js');
var testData = require('./testData');
var Db;
var hans;
var ueli;
var admin;

describe('user.controller', userTests);
function userTests() {
  beforeEach(async () => {
    Db = (await tests.setupMemoryDatabase(testData.users, testData.offers));
    hans = await Db.User.findOne({where: {name : 'hans' }});
    ueli = await Db.User.findOne({where: {name : 'ueli' }});
    admin = await Db.User.findOne({where: {name : 'admin' }});
  });

  describe('#update()', updateUserTests);
  describe('#delete()', deleteUserTests);
  describe('#changePassword()', changePasswordTests);
}

function updateUserTests() {

}

function deleteUserTests() {
  it('Delete Hans', deleteHans);
}

function changePasswordTests() {

}

async function deleteHans() {
  const req = {
    db: Db,
    body: {},
    session: {
      user: hans
    }
  };
  await tests.simHttpRequest(req, 200, userController.deleteUser);
  assert.ok((await Db.User.findOne({where: {name: 'admin'}})), 'Admin must exist');
  assert.ok((await Db.User.findOne({where: {name: 'ueli'}})), 'Ueli must exist');
  assert.ok(!(await Db.User.findOne({where: {name: 'hans'}})), 'Hans must not exist');
  assert.strictEqual((await Db.User.count()), 2, 'Only ueli and admin should now exist in the Db');
}
