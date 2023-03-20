'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        full_name: 'Achmad Yoga Prananda',
        email: 'achmd.yoga@gmail.com',
        phone: '085678909',
        address: 'Jakarta',
        password: '12345678',
        role: "admin",
        email_token: null,
        email_verified: true
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
