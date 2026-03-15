const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(50);
const price = joi.number().positive().integer();
const description = joi.string().max(200);
const category = joi.string().max(100);
const image = joi.string().uri();

const schemaProductCreate = joi.object({
  name : name.required(),
  price : price.required(),
  description : description,
  category : category.required(),
  image : image
});

const updateSchemaProduct = joi.object({
  name : name,
  price : price,
  description : description,
  category : category,
  image : image
});
  
const getProductByIdSchema = joi.object({
  id : id.required()
});

module.exports = {
  schemaProductCreate,
  updateSchemaProduct,
  getProductByIdSchema
};