const { ro } = require('faker/lib/locales');
const joi = require('joi');

const id = joi.number().integer().positive();
const email = joi.string().min(3).max(50);
const password = joi.string().min(6).max(100);
const role = joi.string().min(5);

const schemaUserCreate = joi.object({
  email : email.required(),
  password : password.required(),
  role : role
});

const updateSchemaUser = joi.object({
  email : email,
  role : role
});

const getUserByIdSchema = joi.object({
  id : id.required()
});

module.exports = {
  schemaUserCreate,
  updateSchemaUser,
  getUserByIdSchema
};