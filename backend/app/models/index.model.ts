import Sequelize from 'sequelize';
import { DbInterface } from '../typings/dbInterface';
import { UserFactory } from './user.model';

export const createModels = (): DbInterface => {
 // const { database,  username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db3.sqlite'
  });

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize)
  };

  return db;
};
