const faker = require('faker');
const boom = require('@hapi/boom');

const getAllProducts = (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      image: faker.image.imageUrl()
    });
  }
  return products;
};

const createNewProduct = (req, res) => {
  const body = req.body;
  const newProduct = {
    id: faker.datatype.uuid(),
    ...body
  };
  return newProduct;
};

const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
  if (id != 1) {
    throw boom.notFound(`Producto con id ${id} no encontrado`);
  }
  const body = req.body;
  const productUpdated = {
    'message': `Producto con id ${id} actualizado`,
    'id': id,
    'name': body.name || 'Laptop',
    'price': body.price || 999.99,
    'description': body.description || 'A high-performance laptop for all your computing needs.',
    'category': body.category || 'Electronics'
  };
  return productUpdated;
  } catch (error) {
    console.log(error);
    
  }
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  return {
    'message': `Producto con id ${id} eliminado`
  };
};

const getProductById = (req, res) => {
  return ({
    'id': req.params.id,
    'name': 'Laptop',
    'price': 999.99,
    'description': 'A high-performance laptop for all your computing needs.',
    'category': 'Electronics'
  });
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductById
};