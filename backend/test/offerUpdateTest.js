var offersController = require('../build/controllers/offers.controller')
var assert = require('assert');
var tests = require('./Tests.js');
var Db;
var hans;
var ueli;

const users = [{
  name: 'hans',
  password: '123',
  eMail: 'example@example.com',
  address: 'Viktoriaplatz 12, 3013 Bern',
  phone: '0313333333'
}, {
  name: 'ueli',
  password: 'ThisIsVerySecret',
  eMail: 'ueli.mueller@schwyz.ch',
  address: 'Schwyzerstrasse 12, 6543 Schwyz',
  phone: '0788888888'
}];

// All offers belong to hans, id 1
const offers = [{
  title: "Best Italian Food",
  description: "I am the best italian cook",
  price: "10000",
  public: true,
  category: "catering",
  dateFrom: undefined,
  dateTo: undefined
}, {
  title: "Best Swiss Food",
  description: "I am the best swiss cook",
  price: "100",
  public: true,
  category: "catering",
  dateFrom: undefined,
  dateTo: undefined
}, {
  title: 'Awful swiss house',
  description: 'The cheapest swiss house you can find in bern.',
  price: '5',
  public: true,
  category: 'location',
  dateFrom: undefined,
  dateTo: undefined
}, {
  title: 'A cool catering offer',
  description: 'This is a new cool catering offer',
  price: '20',
  public: false,
  category: 'catering',
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
describe('offers.controller', offersTests);

function offersTests() {
  beforeEach(async () => {
    Db = (await tests.setupMemoryDatabase(users, offers));
    hans = await Db.User.findOne({where: {name : 'hans' }});
    ueli = await Db.User.findOne({where: {name : 'ueli' }});
  });

  describe('#updateOffer()', updateOfferTests);
  describe('#search()', searchOfferTests);
  describe('#delete()', deleteOfferTests);
  describe('#setPublic()', setPublicTests);
  describe('#adminOffers()', adminOffersTests);
  describe('#myOffers()', myOffersTests);
  describe('#offerDetails()', offerDetailsTests);
}

function updateOfferTests() {
  it('update Offer Test', offerUpdateTest);
}

function searchOfferTests() {
  it('search Offer Test', searchOfferTest);
  it('search Offer not specifying the category', searchOfferTestNoCategory);
}

function deleteOfferTests() {
  it('try to delete offer not belonging to user', deleteOfferWrongUserTest);
  it('successfully delete offer', deleteOfferTest);
  it('try to delete inexistent offer', deleteInexistentOfferTest);
}

function setPublicTests() {
  it('try to set the public flag while not being an admin', setPublicNoAdminTest);

}

function adminOffersTests() {
  it('try to see admin tests while not being logged in', adminOffersTest);
}

function myOffersTests() {

}

function offerDetailsTests() {

}

async function offerUpdateTest() {
  const req = {
    body: {
      id: 1,
      ...defValidBody
    },
    session: {
      user: hans
    }
  };

  await tests.simHttpRequest(req, 201, Db, offersController.loadOffer, offersController.updateOffer);
  let createdOffer;
  createdOffer = await Db.Offer.findOne({where: {title : 'Big beautiful house' }});
  assert.strictEqual(createdOffer.description, req.body.description, 'Saved description defer from expected value');
  let savedUser = await createdOffer.getProvider();
  assert(savedUser.equals(req.session.user), 'Offer does not belong to the right user');
}

async function searchOfferTest() {
  const req = {
    body: {
      category: 'catering',
      searchKey: 'swiss'
    },
    session: {}
  };
  const res = tests.getRes(200);
  await offersController.httpPerformSearch(req, res , Db, ['title']);
  assert.notStrictEqual(res.body, undefined);
  assert.notStrictEqual(res.body, null);
  assert.strictEqual(res.body.length, 1);
  assert.strictEqual(res.body[0].title, 'Best Swiss Food');
}

async function searchOfferTestNoCategory() {
  const req = {
    body: {
      searchKey: 'swiss'
    },
    session: {}
  };
  const res = tests.getRes(200);
  await offersController.httpPerformSearch(req, res , Db, ['title']);
  assert.strictEqual(res.body.length, 2);
  assert.strictEqual(res.body[0].title, 'Best Swiss Food');
  assert.strictEqual(res.body[1].title, 'Awful swiss house');
}

async function deleteOfferWrongUserTest() {
  const req = {
    body: {
      id: 1 // title: "Best Italian Food"
    },
    session: {
      user: ueli // (no offers)
    }
  };
  const res = await tests.simHttpRequest(req, 403, Db, offersController.loadOffer, offersController.deleteOffer);
  const allOffers = await Db.Offer.findAll({});
  assert.strictEqual(allOffers.length, 4);
}

async function deleteInexistentOfferTest() {
  const req = {
    body: {
      id: 26 // inexistent offer
    },
    session: {
      user: hans // (has offers)
    }
  };
  const res = await tests.simHttpRequest(req, 400, Db, offersController.loadOffer, offersController.deleteOffer);
  const allOffers = await Db.Offer.findAll({});
  assert.strictEqual(allOffers.length, 4);
}

async function deleteOfferTest() {
  const req = {
    body: {
      id: 1 // title: "Best Italian Food"
    },
    session: {
      user: hans // (has offers)
    }
  };
  const res = await tests.simHttpRequest(req, 200, Db, offersController.loadOffer, offersController.deleteOffer);
  const allOffers = await Db.Offer.findAll({});
  assert.strictEqual(allOffers.length, 3);
}

async function setPublicNoAdminTest() {
  const req = {
    body: {
      id: 1 // title: "Best Italian Food"
    },
    session: {
      user: users[0] // Hans (has offers)
    }
  };
  const res = tests.getRes(401);
  await offersController.setPulic(req, res , Db);
  const firstOffer = await Db.Offer.findOne({where: {id: 1}});
  assert.strictEqual(firstOffer.public, false);
}

async function adminOffersTest() {
  const req = {
    body: {},
    session: {}
  };
  const res = tests.getRes(401);
  await offersController.adminOffers(req, res , Db);
}
