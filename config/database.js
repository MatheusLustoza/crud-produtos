const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // Arquivo do banco que será criado automaticamente
});

module.exports = sequelize;