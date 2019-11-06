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
  Object.values(db).forEach((model: any) => {
    if (model.associate) {
      model.associate(db);
    }
  });
  return db;
};
