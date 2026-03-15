const { tr } = require('faker/lib/locales');
const { config } = require('../config/config');
const { Sequelize } = require('sequelize');
const {setupModels} = require('../db/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log
});

setupModels(sequelize);

module.exports = {
  sequelize,
  models: sequelize.models  // Exportar los modelos registrados
};