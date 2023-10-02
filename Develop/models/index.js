// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)
sequelize.sync({ force: false }).then(() => {
  console.log('All models synchronized with the database');
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
