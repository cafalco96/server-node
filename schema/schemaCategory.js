const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const image = Joi.string().uri();

const getCategoryByIdSchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image
});

const updateCategorySchema = Joi.object({
  name,
  image
});

module.exports = { getCategoryByIdSchema, createCategorySchema, updateCategorySchema };