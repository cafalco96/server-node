const productsRouter = require('../routes/product');
const usersRouter = require('../routes/users');
const clientsRouter = require('../routes/client');
const categoriesRouter = require('../routes/category');
const express = require('express');


function apiRoutes(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/clients', clientsRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = apiRoutes;