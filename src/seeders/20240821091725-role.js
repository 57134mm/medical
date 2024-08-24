module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'doctor', createdAt: new Date(), updatedAt: new Date() },
      { name: 'patient', createdAt: new Date(), updatedAt: new Date() },
      { name: 'accountant', createdAt: new Date(), updatedAt: new Date() },
      { name: 'receptionist', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
