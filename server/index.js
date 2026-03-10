const productsRouter = require('../routes/product');
const usersRouter = require('../routes/users');
const express = require('express');


function apiRoutes(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
}

module.exports = apiRoutes;