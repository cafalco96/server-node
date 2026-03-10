const express = require('express');
const router = express.Router();
const userService = require('../services/serviceUser');
router.get('/', (req, res) => {
  userService.getAllUsers(req, res);
});

module.exports = router;
