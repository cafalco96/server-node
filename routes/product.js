const express = require('express');
const router = express.Router(); 
const productService = require('../services/serviceProduct');
const validatorHandler = require('../middleware/validator.handle');
const {schemaProductCreate, updateSchemaProduct, getProductByIdSchema} = require('../schema/schemaProduct');

router.get('/', async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(req, res);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getProductByIdSchema, 'params'),
  async (req, res) => {
  const product = await productService.getProductById(req, res);
  res.json(product);
});

router.post('/', 
  validatorHandler(schemaProductCreate, 'body'),
  async (req, res) => {
  const body = await productService.createNewProduct(req, res);
  res.status(201).json({
    'ok': true,
    'data': body
  });
});

router.patch('/:id', 
  validatorHandler(updateSchemaProduct, 'body'),
  validatorHandler(getProductByIdSchema, 'params'),
  async (req, res) => {
  const updatedProduct = await productService.updateProduct(req, res);
  res.json(updatedProduct);
});

router.delete('/:id', 
  validatorHandler(getProductByIdSchema, 'params'),
  async (req, res) => {
  const deletedMessage = await productService.deleteProduct(req, res);
  res.json(deletedMessage);
});

module.exports = router;