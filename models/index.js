// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id"
});

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,
  {
    // referencing the products fk of product_id
    through: ProductTag
    , foreignKey: 'product_id'
  });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,
  {
    // referencing the tags fk of tag_id
    through: ProductTag
    , foreignKey: 'tag_id'
  });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
