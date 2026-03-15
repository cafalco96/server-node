const express = require('express');
const servicesCategory = require('../services/serviceCategory');
const router = express.Router();
const { getCategoryByIdSchema, createCategorySchema, updateCategorySchema } = require('../schema/schemaCategory')
const validatorHendler = require('../middleware/validator.handle');

router.get('/', async (req, res, next) => {
  try {
    const getCategory = await servicesCategory.getCategories()
    return res.json({ getCategory })
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHendler(getCategoryByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const oneCategory = await servicesCategory.findCategoryById(id)
      res.json(oneCategory)
    } catch (error) {
      next(error)
    }
  });

router.post('/', validatorHendler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await servicesCategory.createCategory(body)
      return res.json({ newCategory })
    } catch (error) {
      next(error)
    }
  });
  
router.patch('/:id', validatorHendler(getCategoryByIdSchema, 'params'),
validatorHendler(updateCategorySchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const updateCategory = await servicesCategory.updateCategory(id, body)
    return res.json(updateCategory)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHendler(getCategoryByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const deleteCategory = await servicesCategory.deleteCategory(id)
      return res.json(deleteCategory)
    } catch (error) {
      next(error)
    }
  });

module.exports = router;