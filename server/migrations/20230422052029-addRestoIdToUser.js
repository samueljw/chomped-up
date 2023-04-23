'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'RestoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Restaurants',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'RestoId', {})
  }
};
