const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns

    // this is a lookup table relating the two tables product and tag
    id: {
      type: DataTypes.INTEGER
      , allowNull: false
      , autoIncrement: true
      , primaryKey: true
    }
    , product_id: {
      type: DataTypes.INTEGER,
    }
    , tag_id: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
