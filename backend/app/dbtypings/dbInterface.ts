import * as Sequelize from 'sequelize';

import { UserAttributes, UserInstance } from '../models/user.model';
import { OfferAttributes, OfferInstance } from '../models/offer.model';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Offer: Sequelize.Model<OfferInstance, OfferAttributes>;
}













