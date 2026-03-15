const express = require('express');
const router = express.Router();
const userService = require('../services/serviceUser');
const { schemaUserCreate, updateSchemaUser, getUserByIdSchema } = require('../schema/schemaUser');
const validatorHandler = require('../middleware/validator.handle');

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getUserByIdSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', 
  validatorHandler(schemaUserCreate, 'body'),
  async (req, res, next) => {
  try {
    const response = await userService.createNewUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', 
  validatorHandler(updateSchemaUser, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userService.updateUser(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', 
  validatorHandler(getUserByIdSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
