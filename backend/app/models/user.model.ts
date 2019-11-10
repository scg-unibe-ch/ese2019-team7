import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../dbtypings/sequelizeAttributes';

import { OfferAttributes, OfferInstance } from '../models/offer.model';

export interface UserAttributes {
  id?: number;
  name: string;
  password: string;
  phone?: string;
  eMail: string;
  address?: string;
  offers?: OfferAttributes[] | OfferAttributes['id'][];


  createdAt?: Date;
  updatedAt?: Date;
};
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  getOffers: Sequelize.HasManyGetAssociationsMixin<UserInstance>;
  setOffers: Sequelize.HasManySetAssociationsMixin<UserInstance, UserInstance['id']>;
  addOffers: Sequelize.HasManyAddAssociationsMixin<UserInstance, UserInstance['id']>;
  addOffer: Sequelize.HasManyAddAssociationMixin<UserInstance, UserInstance['id']>;
  createOffer: Sequelize.HasManyCreateAssociationMixin<OfferAttributes, UserInstance>;
  removeOffer: Sequelize.HasManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
  removeOffers: Sequelize.HasManyRemoveAssociationsMixin<UserInstance, UserInstance['id']>;
  hasOffer: Sequelize.HasManyHasAssociationMixin<UserInstance, UserInstance['id']>;
  hasOffers: Sequelize.HasManyHasAssociationsMixin<UserInstance, UserInstance['id']>;
  countOffers: Sequelize.HasManyCountAssociationsMixin;

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
    User.hasMany(models.Offer, {foreignKey: 'providerId'});
    User.belongsTo(models.Admin, {foreignKey: 'AdminID'});
  };

  return User;
};
