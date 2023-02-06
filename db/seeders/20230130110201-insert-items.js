'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items', [
      {
        name: 'Silverqueen',
        price: 18000,
        stock: 120,
        sku: 'BE112'
      },
      {
        name: 'Dairy Milk',
        price: 23000,
        stock: 120,
        sku: 'BE113'
      },
      {
        name: 'Toblerone',
        price: 24000,
        stock: 120,
        sku: 'BE114'
      },
      {
        name: 'Chitato',
        price: 11000,
        stock: 120,
        sku: 'BE115'
      },
      {
        name: 'Cheetos',
        price: 9000,
        stock: 120,
        sku: 'BE116'
      },
      {
        name: 'Lays',
        price: 10000,
        stock: 120,
        sku: 'BE117'
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', null, {});
  }
};
