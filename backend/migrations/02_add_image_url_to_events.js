// Migracija 2: Dodavanje nove kolone image_url u events tabelu

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('events', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'description'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('events', 'image_url');
  }
};
