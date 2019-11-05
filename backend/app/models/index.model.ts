import Sequelize from 'sequelize';
import { DbInterface } from '../dbtypings/dbInterface';
import { UserFactory } from './user.model';
import {OfferFactory} from './offer.model';

export const createModels = (storagefile = 'db3.sqlite', loggingFunction: any = console.log): DbInterface => {
 // const { database,  username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: storagefile,
    logging: loggingFunction
  });

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Offer: OfferFactory(sequelize, Sequelize)
  };
  /*Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });*/
  // @ts-ignore
  db.User.associate(db);
  // @ts-ignore
  db.Offer.associate(db);

 /* if (db.User.associate) {
    db.User.associate();
  }

  */
  return db;
};
