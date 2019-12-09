import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../dbtypings/sequelizeAttributes';
import {UserAttributes, UserInstance} from './user.model';
import {Models} from 'sequelize';

export interface AdminAttributes {
  id?: number;
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
  };

  const Admin = sequelize.define<AdminInstance, AdminAttributes>('Admin', attributes);
  Admin.associate = (models: Models) => {
    Admin.belongsTo(models.User, { as: 'user' });
  };

  return Admin;
};
