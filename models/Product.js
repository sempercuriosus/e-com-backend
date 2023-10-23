// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER
      , allowNull: false
      , autoIncrement: true
      , primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING
      , allowNull: false
      , defaultValue: ""
    },
    price: {
      type: DataTypes.DECIMAL(8, 2)
      , allowNull: false
      , defaultValue: 0.00
      , validate: {
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER
      , allowNull: false
      , defaultValue: 10
      , validate: {
        isInt: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER
      , allowNull: true
      , references: {
        model: 'category'
        , foreignKey: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
