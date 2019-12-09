
var indexModel = require('../build/models/index.model.js');
const bcrypt = require('bcrypt');
var assert = require('assert');
const setupFunctions = require('../build/setupFunctions');

/*
  Execute the tests with 'npm test'

  To run manual tests with curl:
  curl -X PUT  -H 'Content-Type: application/json' -d '{"username": "mueller", "password": "1234", "phone": "079",
    "email": "examples@example.com", "address": "Bern" }' "http://localhost:3000/login"

  -b cookie => send cookie to server
  -c file => save cookies to file
 */

exports.simHttpRequest = async function(req, expectedStatus, ...fToCall) {
  const res = exports.getRes(expectedStatus);
  let cmd = [];
  cmd[fToCall.length-1] = async () => await fToCall[fToCall.length - 1](req, res);
  for(let i=fToCall.length-2; i>=0; i--) {
    cmd[i] = async () => await fToCall[i](req, res, cmd[i+1]);
  }
  await cmd[0]();
  return res;
};

exports.getRes = function(expectedStatus) {
  const res = {
    body: null,
    status: (status) => {assert.strictEqual(status, expectedStatus, 'Wrong http error code'); return res;},
    sendStatus: (status) => {assert.strictEqual(status, expectedStatus, 'Wrong http error code');},
    send: function (object) {
      this.body = object;
    }
  };
  setupFunctions.addFullResponseFunctions(res);
  return res;
};

exports.setupMemoryDatabase = async function(users, offers) {
  const db = await indexModel.createModels(':memory:', false);
  await db.sequelize.sync();
  // await needed?
  await Promise.all(users.map(
    async (user) => { user.password = bcrypt.hashSync(user.password, 10); await db.User.create(user); })
  );
  // Create offers
  if(offers) {
    const firstUser = await db.User.findOne({where: {id: 1}});
    await Promise.all(offers.map(
      async (offer) => {
        try {
          let dbOffer;
          dbOffer = await db.Offer.build(offer);
          if (firstUser != null) await dbOffer.setProvider(firstUser, {save: false});
          await dbOffer.save();
        } catch (e) {
          throw new assert.AssertionError({actual: 'Failed to create offer', expected: 'create offer', message: e.message});
        }
      })
    );
  }
  // Create admin
  const adminUser = await db.User.create({name: 'admin', password: 'admin', eMail: 'admin@admin.ch'});
  const admin = await db.Admin.create();
  await adminUser.setAdmin(admin);

  await db.sequelize.sync();
  return db;
};

