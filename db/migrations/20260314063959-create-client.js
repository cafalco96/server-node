'use strict';

const { ClientSchema, CLIENT_TABLE  } = require('../models/client.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CLIENT_TABLE, ClientSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CLIENT_TABLE);
  }
};
