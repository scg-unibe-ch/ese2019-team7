import {describe} from "mocha";

var offersUpdateController = require('../build/controllers/offers.controller')
var assert = require('assert');
var tests = require('./Tests.js');
var Db;
var user;

const users = [{
  name: 'hans',
  password: '123',
  eMail: 'example@example.com'
}];

const offers = [{
  title: "Best Italian Food",
  description: "I am the best italian cook",
  price: "10000",
  public: true,
  category: "food",
  dateFrom: undefined,
  dateTo: undefined
}, {
  title: "Best Swiss Food",
  description: "I am the best swiss cook",
  price: "100",
  public: true,
  category: "food",
  dateFrom: undefined,
  dateTo: undefined
}];

const defValidBody = {
  title: "Big beautiful house",
  description: "The most expensive house you can find in bern.",
  price: "100000",
  public: true,
  category: "house",
  dateFrom: undefined,
  dateTo: undefined
};

// #### Tests declarations ####
describe('offers.controller', offerUpdateTests);

function offerUpdateTests() {
  beforeEach(async () => {
    Db = (await tests.setupMemoryDatabase(users, offers));
    user = await Db.User.findOne({where: {name : 'hans' }});
  });
  it('create Offer Test', offerUpdateTest);
}

async function offerUpdateTest() {
  const req = {
    body: defValidBody,
    session: {
      user: user
    }
  };

  await offersUpdateController.updateOffer(req, tests.getRes(201), Db);
  let createdOffer;
  createdOffer = await Db.Offer.findOne({where: {title : 'Big beautiful house' }});
  assert.strictEqual(createdOffer.description, req.body.description, 'Saved description defer from expected value');
  let savedUser = await createdOffer.getProvider();
  assert(savedUser.equals(req.session.user), 'Offer does not belong to the right user');
}
