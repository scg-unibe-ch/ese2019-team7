import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../dbtypings/sequelizeAttributes';

export interface UserAttributes {
  id?: number;
  name: string;
  password: string;
  phone: number;
  eMail: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  // At the moment, there's nothing more to add apart
  // from the methods and attributes that the types
  // `Sequelize.Instance<UserAttributes>` and
  // `UserAttributes` give us. We'll add more here when
  //  we get on to adding associations.
};
export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes)
  : Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        unique: true,
        notEmpty: true}
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        notEmpty: true}
    },
   phone: {
      type: DataTypes.INTEGER,
    },
    eMail: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING
    }
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  return User;
};
