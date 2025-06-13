// migrations/2025xxxxxx-add-categoria-to-products.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'categoria', {
      type: Sequelize.ENUM('Roupas', 'Eletrônicos'),
      allowNull: false,
      defaultValue: 'Roupas'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'categoria');
  }
};