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
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }

});

router.post('/', 
  validatorHandler(schemaProductCreate, 'body'),
  async (req, res, next) => {
  // const body = await productService.createNewProduct(req, res);
  // res.status(201).json({
  //   'ok': true,
  //   'data': body
  // });
  try {
    const body = req.body;
    const newProduct = await productService.createNewProduct(body);
    res.status(201).json({
      'ok': true,
      'data': newProduct
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', 
  validatorHandler(updateSchemaProduct, 'body'),
  validatorHandler(getProductByIdSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const updatedProduct = await productService.updateProduct(id, body);
    return res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', 
  validatorHandler(getProductByIdSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const deletedMessage = await productService.deleteProduct(id);
    res.json(deletedMessage);
  } catch (error) {
    next(error);
  }
});

module.exports = router;