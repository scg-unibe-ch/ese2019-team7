import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../dbtypings/sequelizeAttributes';
import { UserAttributes, UserInstance } from '../models/user.model';

export interface OfferAttributes {
  id?: number;
  providerId?: number;

  title: string;
  description: string;
  public: boolean;
  category: 'entertainment' | 'catering' | 'location' | 'other';
  dateFrom: Date;
  dateTo: Date;
  price: number;
  status: string;
  provider?: UserAttributes | UserAttributes['id'];
  createdAt?: Date;
  updatedAt?: Date;
};
export interface OfferInstance extends Sequelize.Instance<OfferAttributes>, OfferAttributes {
  getProvider: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setProvider: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createProvider: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;
};
export const OfferFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes)
  : Sequelize.Model<OfferInstance, OfferAttributes> => {
  const attributes: SequelizeAttributes<OfferAttributes> = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true}
    },
    description: {
      type: DataTypes.TEXT,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dateFrom: {
      type: DataTypes.DATE,
    },
    dateTo: {
      type: DataTypes.DATE,
    },
    category: {
      type: DataTypes.ENUM('entertainment', 'catering', 'location', 'other'),
      allowNull: false
    },
    price:  {
    type: DataTypes.INTEGER,
  },
  status: {
      type: DataTypes.TEXT,
    defaultValue: `validation in progress`,
    allowNull: false,
    validate: {
      notEmpty: true}
  }
  };

  const Offer = sequelize.define<OfferInstance, OfferAttributes>('Offer', attributes);
  Offer.associate = models => {
    Offer.belongsTo(models.User, { as: 'provider' });
  };

  return Offer;
};
