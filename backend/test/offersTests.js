
var authenticationController = require('../build/controllers/authentication.controller');
var offersController = require('../build/controllers/offers.controller');
var testData = require('./testData');
var assert = require('assert');
var tests = require('./Tests.js');
var Db;
var hans;
var ueli;
var admin;



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
    Db = (await tests.setupMemoryDatabase(testData.users, testData.offers));
    hans = await Db.User.findOne({where: {name : 'hans' }});
    ueli = await Db.User.findOne({where: {name : 'ueli' }});
    admin = await Db.User.findOne({where: {name : 'admin' }});
  });

  describe('#create()', createOfferTests);
  describe('#updateOffer()', updateOfferTests);
  describe('#search()', searchOfferTests);
  describe('#delete()', deleteOfferTests);
  describe('#setPublic()', setPublicTests);
  describe('#adminOffers()', adminOffersTests);
  describe('#myOffers()', myOffersTests);
  describe('#offerDetails()', offerDetailsTests);
}

function createOfferTests() {
  it('create Offer', createOfferTest);
}

function updateOfferTests() {
  it('update Offer Test', offerUpdateTest);
}

function searchOfferTests() {
  it('search Offer Test', searchOfferTest);
  it('search Offer not specifying the category', searchOfferTestNoCategory);
  it('search Offer by usernames', searchInUserTest);
  it('search Offer by Description and Address', searchDescriptionAndAddress);
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
  it('try to see not approved Offers while not being an admin', notAnAdminNotApprovedTest);
}

function myOffersTests() {

}

function offerDetailsTests() {

}

async function createOfferTest() {
  const req = {
    body: defValidBody,
    db: Db,
    session: {
      user: hans
    }
  };

  await offersController.create(req, tests.getRes(201));
  let createdOffer;
  createdOffer = await Db.Offer.findOne({where: {title : 'Big beautiful house' }});
  assert.strictEqual(createdOffer.description, req.body.description, 'Saved description defer from expected value');
  let savedUser = await createdOffer.getProvider();
  assert(savedUser.equals(req.session.user), 'Offer does not belong to the right user');
}

async function offerUpdateTest() {
  const req = {
    db: Db,
    body: {
      id: 1,
      ...defValidBody
    },
    session: {
      user: hans
    }
  };

  await tests.simHttpRequest(req, 201, offersController.loadOffer, offersController.updateOffer);
  let createdOffer;
  createdOffer = await Db.Offer.findOne({where: {title : 'Big beautiful house' }});
  assert.strictEqual(createdOffer.description, req.body.description, 'Saved description defer from expected value');
  let savedUser = await createdOffer.getProvider();
  assert(savedUser.equals(req.session.user), 'Offer does not belong to the right user');
}

async function searchOfferTest() {

  const req = {
    db: Db,
    body: {
      category: 'catering',
      searchKey: 'swiss'
    },
    session: {}
  };
  const res = tests.getRes(200);
  await offersController.search(req, res);
  assert.notStrictEqual(res.body.offers, undefined);
  assert.notStrictEqual(res.body.offers, null);
  assert.strictEqual(res.body.offers.length, 1);
  assert.strictEqual(res.body.offers[0].title, 'Best Swiss Food');
}

async function searchOfferTestNoCategory() {
  const req = {
    db: Db,
    body: {
      searchKey: 'swiss'
    },
    session: {}
  };
  const res = tests.getRes(200);
  await offersController.search(req, res);
  assert.strictEqual(res.body.offers.length, 2);
  assert.strictEqual(res.body.offers[0].title, 'Best Swiss Food');
  assert.strictEqual(res.body.offers[1].title, 'Awful swiss house');
}

async function searchInUserTest() {
  const entry = await Db.Offer.findOne({where: {title: 'Awful swiss house'}});
  assert.notStrictEqual(entry, null, 'entry should not be null');
  await entry.setProvider(ueli);
  const req = {
    db: Db,
    body: {
      searchKey: 'ans',
      attributes: ['$provider.name$']
    },
    session: {
      user: hans
    }
  };
  const res = tests.getRes(200);
  await offersController.search(req, res);
  assert.strictEqual(res.body.offers.length, 2);
  assert.strictEqual(res.body.offers[0].title, 'Best Italian Food');
  assert.strictEqual(res.body.offers[1].title, 'Best Swiss Food');
}

async function searchDescriptionAndAddress() {
  // Bern is in the description of awful swiss house
  // Best Italian food belongs to Hans, who lives in bern
  const entry = await Db.Offer.findOne({where: {title: 'Awful swiss house'}});
  assert.notStrictEqual(entry, null, 'entry should not be null');
  await entry.setProvider(ueli);
  const entry2 = await Db.Offer.findOne({where: {title: 'Best Swiss Food'}});
  assert.notStrictEqual(entry2, null, 'entry should not be null');
  await entry2.setProvider(ueli);
  const req = {
    db: Db,
    body: {
      searchKey: 'Bern',
      attributes: ['$provider.address$', 'description']
    },
    session: {
      user: hans
    }
  };
  const res = tests.getRes(200);
  await offersController.search(req, res);
  assert.strictEqual(res.body.offers.length, 2);
  assert.strictEqual(res.body.offers[0].title, 'Best Italian Food');
  assert.strictEqual(res.body.offers[1].title, 'Awful swiss house');
}

async function deleteOfferWrongUserTest() {
  const req = {
    db: Db,
    body: {
      id: 1 // title: "Best Italian Food"
    },
    session: {
      user: ueli, // (no offers)
      admin: null
    }
  };
  const res = await tests.simHttpRequest(req, 403, offersController.loadOffer, offersController.deleteOffer);
  const allOffers = await Db.Offer.findAll({});
  assert.strictEqual(allOffers.length, 4);
}

async function deleteInexistentOfferTest() {
  const req = {
    db: Db,
    body: {
      id: 26 // inexistent offer
    },
    session: {
      user: hans // (has offers)
    }
  };
  const res = await tests.simHttpRequest(req, 400, offersController.loadOffer, offersController.deleteOffer);
  const allOffers = await Db.Offer.findAll({});
  assert.strictEqual(allOffers.length, 4);
}

async function deleteOfferTest() {
  const req = {
    db: Db,
    body: {
      id: 1 // title: "Best Italian Food"
    },
    session: {
      user: hans // (has offers)
    }
  };
  const res = await tests.simHttpRequest(req, 200, offersController.loadOffer, offersController.deleteOffer);
  const allOffers = await Db.Offer.findAll({});
  assert.strictEqual(allOffers.length, 3);
}

async function setPublicNoAdminTest() {
  const req = {
    db: Db,
    body: {
      id: 4 // title: 'A cool catering offer'
    },
    session: {
      user: hans // Hans (has offers)
    }
  };
  await tests.simHttpRequest(req, 403, authenticationController.checkAuthentication, offersController.patchNotApproved);
  const lastOffer = await Db.Offer.findOne({where: {id: 4}});
  assert.strictEqual(lastOffer.public, false);
}

async function notAnAdminNotApprovedTest() {
  const req = {
    db: Db,
    body: {},
    session: {
      user: hans
    }
  };
  await tests.simHttpRequest(req, 403, authenticationController.checkAuthentication, offersController.getNotApproved);
}
