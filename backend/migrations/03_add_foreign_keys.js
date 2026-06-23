// Migracija 3: Dodavanje foreign key ograničenja

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Dodavanje foreign key za organizer_id u events tabeli
    await queryInterface.addConstraint('events', {
      fields: ['organizer_id'],
      type: 'foreign key',
      name: 'fk_events_organizer',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Dodavanje foreign key za category_id u events tabeli
    await queryInterface.addConstraint('events', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_events_category',
      references: {
        table: 'categories',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Dodavanje foreign key za location_id u events tabeli
    await queryInterface.addConstraint('events', {
      fields: ['location_id'],
      type: 'foreign key',
      name: 'fk_events_location',
      references: {
        table: 'locations',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('events', 'fk_events_organizer');
    await queryInterface.removeConstraint('events', 'fk_events_category');
    await queryInterface.removeConstraint('events', 'fk_events_location');
  }
};
