
var assert = require('assert');
describe('login.controller', loginControllerTests);

/*
  Execute the tests with 'npm test'
 */

function loginControllerTests() {
  before(setupExpress);
  describe('#login()', loginTests);
}

function setupExpress() {
  //Setup environment for the tests here
  return;
}

function loginTests() {
  //Put the calls to all testfunctions here
  it('should return -1 when the value is not present', mochaTest);
}

function mochaTest() {
  assert.equal([1, 2, 3].indexOf(4), -1);
}


