const faker = require('faker');
const boom = require('@hapi/boom');
const { pool } = require('../libs/postgres');
const { sequelize } = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

const getAllProducts = async (req, res) => {
  try {
    // const query = 'SELECT * FROM products';
    // const [data] = await sequelize.query(query);
    // return { data };
    const response = await models.Product.findAll({
      include: ['Category']
    });
    return response;
  } catch (error) {
    console.log(error);
    
  }
  // const products = [];
  // const { size } = req.query;
  // const limit = size || 10;
  // for (let i = 0; i < limit; i++) {
  //   products.push({
  //     name: faker.commerce.productName(),
  //     price: parseFloat(faker.commerce.price()),
  //     description: faker.commerce.productDescription(),
  //     category: faker.commerce.department(),
  //     image: faker.image.imageUrl()
  //   });
  // }
  // return products;
};

const createNewProduct = async (body) => {
  // const body = req.body;
  // const newProduct = {
  //   id: faker.datatype.uuid(),
  //   ...body
  // };
  // return newProduct;
  try {
    const newProduct = await models.Product.create(body);
    return newProduct;
  } catch (error) {
    console.log(error);
    throw boom.badRequest('Error al crear el producto');
  }
};

const updateProduct = async (id, body) => {
  try {
  //   const { id } = req.params;
  // if (id != 1) {
  //   throw boom.notFound(`Producto con id ${id} no encontrado`);
  // }
  // const body = req.body;
  // const productUpdated = {
  //   'message': `Producto con id ${id} actualizado`,
  //   'id': id,
  //   'name': body.name || 'Laptop',
  //   'price': body.price || 999.99,
  //   'description': body.description || 'A high-performance laptop for all your computing needs.',
  //   'category': body.category || 'Electronics'
  // };
  // return productUpdated;
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound(`Producto con id ${id} no encontrado`);
    }
    const response = await product.update(body);
    return {
      message: `Producto con id ${id} actualizado`,
      product: response
    };
  } catch (error) {
    console.log(error);
    
  }
};

const deleteProduct = async (id) => {
  // return {
  //   'message': `Producto con id ${id} eliminado`
  // };
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound(`Producto con id ${id} no encontrado`);
    }
    await product.destroy();
    return {
      message: `Producto con id ${id} eliminado`
    };
  } catch (error) {
    console.log(error);
    
  };
};

const getProductById = async (id) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound(`Producto con id ${id} no encontrado`);
    }
    return product;
  } catch (error) {
    console.log(error);
    throw boom.badRequest('Error al obtener el producto');
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductById
};