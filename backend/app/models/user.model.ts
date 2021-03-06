import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../dbtypings/sequelizeAttributes';

import { OfferAttributes, OfferInstance } from '../models/offer.model';
import {AdminAttributes, AdminInstance} from './admin.model';

export interface UserAttributes {
  id?: number;
  name: string;
  password: string;
  phone?: string;
  eMail: string;
  address?: string;
  offers?: OfferAttributes[] | OfferAttributes['id'][];
  adminId?: AdminAttributes | AdminAttributes['id'];


  createdAt?: Date;
  updatedAt?: Date;
};
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  getOffers: Sequelize.HasManyGetAssociationsMixin<OfferInstance>;
  setOffers: Sequelize.HasManySetAssociationsMixin<OfferInstance, OfferInstance['id']>;
  addOffers: Sequelize.HasManyAddAssociationsMixin<OfferInstance, OfferInstance['id']>;
  addOffer: Sequelize.HasManyAddAssociationMixin<OfferInstance, OfferInstance['id']>;
  createOffer: Sequelize.HasManyCreateAssociationMixin<OfferAttributes, OfferInstance>;
  removeOffer: Sequelize.HasManyRemoveAssociationMixin<OfferInstance, OfferInstance['id']>;
  removeOffers: Sequelize.HasManyRemoveAssociationsMixin<OfferInstance, OfferInstance['id']>;
  hasOffer: Sequelize.HasManyHasAssociationMixin<OfferInstance, OfferInstance['id']>;
  hasOffers: Sequelize.HasManyHasAssociationsMixin<OfferInstance, OfferInstance['id']>;
  countOffers: Sequelize.HasManyCountAssociationsMixin;

  getAdmin: Sequelize.BelongsToGetAssociationMixin<AdminInstance>;
  setAdmin: Sequelize.BelongsToSetAssociationMixin<AdminInstance, AdminInstance['id']>;
  createAdmin: Sequelize.BelongsToCreateAssociationMixin<AdminAttributes, AdminInstance>;

};
export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes)
  : Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true}
    },
   phone: {
      type: DataTypes.STRING,
    },
    eMail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING
    }
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);
  User.associate = models => {
    User.hasMany(models.Offer, {foreignKey: 'providerId', onDelete: 'cascade'});
    User.hasOne(models.Admin, {foreignKey: 'userId'});
  };

  return User;
};
