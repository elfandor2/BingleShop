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
      },
      {
        full_name: 'John Doe',
        email: 'john_doe@gmail.com',
        phone: '0856777777',
        address: 'Amerika',
        password: '12345678',
      },
      {
        full_name: 'Ivan',
        email: 'ivan@gmail.com',
        phone: '08569888888',
        address: 'Kanada',
        password: '12345678',
      },
      {
        full_name: 'Mei',
        email: 'mei@gmail.com',
        phone: '085693333333',
        address: 'Cina',
        password: '12345678',
      },
      {
        full_name: 'Andre',
        email: 'andre@gmail.com',
        phone: '0855555555',
        address: 'Bandung',
        password: '12345678',
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
