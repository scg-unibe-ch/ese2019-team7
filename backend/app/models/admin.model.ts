import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../dbtypings/sequelizeAttributes';
import {UserAttributes, UserInstance} from './user.model';
import {Models} from 'sequelize';

export interface AdminAttributes {
  id?: number;
  setPublic: boolean;
  deleteOffers: boolean;
  deleteUsers: boolean;
  createAdmins: boolean;
  userId?: UserAttributes | UserAttributes['id'];


  createdAt?: Date;
  updatedAt?: Date;
};
export interface AdminInstance extends Sequelize.Instance<AdminAttributes>, AdminAttributes {

  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
}
export const AdminFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes)
  : Sequelize.Model<AdminInstance, AdminAttributes> => {
  const attributes: SequelizeAttributes<AdminAttributes> = {
    createAdmins: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deleteOffers: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deleteUsers: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    setPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

  };

  const Admin = sequelize.define<AdminInstance, AdminAttributes>('Admin', attributes);
  Admin.associate = (models: Models) => {
    Admin.belongsTo(models.User, { as: 'user' });
  };

  return Admin;
};
