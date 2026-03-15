const {User, UserSchema} = require('./user.model');
const {Client, ClientSchema} = require('./models/client.model');
const { Category, CategorySchema } = require('./models/category.model');
const { Product, ProductSchema } = require('./models/product.model');

const setupModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  Client.associate(sequelize.models)
  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
};

module.exports = {setupModels};