import { createModels } from './models/index.model';
import {UserAttributes, UserInstance} from './models/user.model';
import {OfferAttributes, OfferInstance} from './models/offer.model';
import {DbInterface} from './dbtypings/dbInterface';

const assert = require('assert');
const bcrypt = require('bcrypt');

let database: DbInterface;

export const initDatabase = async (loadTestDb: boolean) => {
  if (loadTestDb) {
    const db  = await initTestDatabase(createModels('testDb.sqlite'));
    database = db;
  } else {
    database = createModels('db.sqlite');
    await database.sequelize.sync();

    // Create admin if the admin list is empty (every database needs an admin)
    const adminsNb: number = await database.Admin.count();
    if (adminsNb === 0) {
      await createAdmin(database);
    }
  }

};

async function createAdmin(db: DbInterface) {
  const adminAttributes = {
    name: 'admin',
    password: 'admin',
    eMail: 'example@example.com',
    phone: '+41313333333',
    address: 'Viktoriaplatz 12, 3013 Bern'
  };
  adminAttributes.password = bcrypt.hashSync(adminAttributes.password, 10);
  const adminUser = await db.User.create(adminAttributes);

  const admin = await db.Admin.build();
  await admin.setUser(adminUser, {save: false});
  await admin.save();
}

async function setupTestDatabase(users: UserAttributes[], offers: any, db: DbInterface): Promise<DbInterface> {
  await db.sequelize.sync({force: true});
  // await needed?
  await Promise.all(users.map(
    async (user) => { user.password = bcrypt.hashSync(user.password, 10); await db.User.create(user); })
  );
  if (offers) {
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
        }
      })
    );
  }
  await createAdmin(db);
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
  }
  ];

  const offers = [{
    title: 'Best Italian Food',
    description: 'I am the best italian cook',
    price: 'Price after arrangement, but min. 10000.- per meal',
    public: true,
    status: 'approved',
    approved: true,
    category: 'catering',
    dateFrom: undefined,
    dateTo: undefined
  }, {
    title: 'Best Swiss Food',
    description: 'I am the best swiss cook',
    price: '100CHF',
    public: true,
    status: 'approved',
    approved: true,
    category: 'catering',
    dateFrom: undefined,
    dateTo: undefined
  }, {
    title: 'Big beautiful house',
    description: 'The most expensive house you can find in bern.\nYou are rich and you do not know what to do with your money? Rent this house for one night.',
    price: '100000CHF per night',
    public: true,
    status: 'approved',
    approved: true,
    category: 'location',
    dateFrom: undefined,
    dateTo: undefined
  }, {
    title: 'Ok Italian Singer',
    description: 'I know one song: Tanti auguri a te',
    price: '25CHF',
    public: true,
    status: 'approved',
    approved: true,
    category: 'entertainment',
    dateFrom: '2019/12/10',
    dateTo: '2019/12/30'
  }, {
    title: 'Pizza Chef',
    description: 'Cheap pizzas for your party!!\nPizza Margaritha\nPizza Napoli\nPizza alle quattro stagioni\nAny Pizza you want!',
    price: '5CHF per pizza',
    public: true,
    status: 'approved',
    approved: true,
    category: 'catering',
    dateFrom: '2019/12/10',
    dateTo: '2019/12/30'
  }, {
    title: 'sommelier',
    description: 'During the winter holidays, i offer my services as a sommelier.',
    price: '200€',
    public: true,
    status: 'approved',
    approved: true,
    category: 'catering',
    dateFrom: '2019/12/20',
    dateTo: '2020/1/15'
  },
  ];
  return await setupTestDatabase(users, offers, db);
}

export const getDatabase = (): DbInterface => database;
