'use strict';

const { UserSchema, USER_TABLE } = require('../user.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable(USER_TABLE);

    if (!table.role) {
      await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    }
  },

  async down (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable(USER_TABLE);

    if (table.role) {
      await queryInterface.removeColumn(USER_TABLE, 'role');
    }
  }
};
