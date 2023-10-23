const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model { }

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER
      , allowNull: false
      , autoIncrement: true
      , primaryKey: true
    }
    , category_name: {
      type: DataTypes.STRING
      , allowNull: false
      , defaultValue: ""
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
