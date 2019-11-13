import { createModels } from './models/index.model';
import {UserAttributes, UserInstance} from './models/user.model';
import {OfferAttributes, OfferInstance} from './models/offer.model';
import {DbInterface} from './dbtypings/dbInterface';

const assert = require('assert');
const bcrypt = require('bcrypt');

let database: DbInterface;

export const initDatabase = async () => {
  const db  = await initTestDatabase(createModels());
  database = db;
};

async function setupDatabase(users: UserAttributes[], offers: any, db: DbInterface): Promise<DbInterface> {
  await db.sequelize.sync({force: true});
  // await needed?
  await Promise.all(users.map(
    async (user) => { user.password = bcrypt.hashSync(user.password, 10); await db.User.create(user); })
  );
  if(offers) {
    const firstuser = await db.User.findOne({where: {id: 1}});
    await Promise.all(offers.map(
      async (offer: OfferAttributes) => {
        try {
          let dboffer;
          dboffer = await db.Offer.build(offer);
          if (firstuser != null) await dboffer.setProvider(firstuser, {save: false});
          await dboffer.save();
        } catch (e) {
          throw e;
          // throw new assert.AssertionError({actual: 'Failed to create offer', expected: 'create offer', message: e.message});
        }
      })
    );
  }
  const admin = await db.User.findOne({where: {id: 2}});
  try {
    let dbadmin;
    dbadmin = await db.Admin.create();
    if (admin != null) await admin.setAdmin(dbadmin, {save: false});
    // @ts-ignore
    await admin.save();
  } catch (e) {
    throw e;
    // throw new assert.AssertionError({actual: 'Failed to create offer', expected: 'create offer', message: e.message});
  }

  await db.sequelize.sync();
  return db;
}

async function initTestDatabase(db: DbInterface) {
  const users = [{
    name: '123',
    password: '123',
    eMail: 'example@example.com',
    phone: '+41313333333',
    address: 'Viktoriaplatz 12, 3013 Bern'
  },
    {
      name: 'admin',
      password: 'admin',
      eMail: 'example@example.com',
      phone: '+41313333333',
      address: 'Viktoriaplatz 12, 3013 Bern'
    }
  ];

  const offers = [{
    title: 'Best Italian Food',
    description: 'I am the best italian cook',
    price: '10000',
    public: true,
    approved: true,
    category: 'catering',
    dateFrom: undefined,
    dateTo: undefined
  }, {
    title: 'Best Swiss Food',
    description: 'I am the best swiss cook',
    price: '100',
    public: true,
    approved: true,
    category: 'catering',
    dateFrom: undefined,
    dateTo: undefined
  }, {
    title: 'Big beautiful house',
    description: 'The most expensive house you can find in bern.',
    price: '100000',
    public: true,
    approved: true,
    category: 'location',
    dateFrom: undefined,
    dateTo: undefined
  }];
  return await setupDatabase(users, offers, db);
}

export const getDatabase = (): DbInterface => database;
