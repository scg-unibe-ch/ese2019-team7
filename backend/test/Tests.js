var indexModel = require('../build/models/index.model.js');
const bcrypt = require('bcrypt');
var assert = require('assert');

/*
  Execute the tests with 'npm test'

  To run manual tests with curl:
  curl -X PUT  -H 'Content-Type: application/json' -d '{"username": "mueller", "password": "1234", "phone": "079", \
    "email": "examples@example.com", "address": "Bern" }' "http://localhost:3000/login"

  -b cookie => send cookie to server
  -c file => save cookies to file
 */

exports.getRes = function(expectedStatus) {
  const res = {
    status: (status) => {assert.strictEqual(status, expectedStatus); return res;},
    sendStatus: (status) => {assert.strictEqual(status, expectedStatus);},
    send: () => {}
  };
  return res;
};

exports.setupMemoryDatabase = async function(users) {
  const db = await indexModel.createModels(':memory:', false);
  await db.sequelize.sync();
  // await needed?
  await Promise.all(users.map(
    async (user) => { user.password = bcrypt.hashSync(user.password, 10); await db.User.create(user); })
  );
  await db.sequelize.sync();
  return db;
};

