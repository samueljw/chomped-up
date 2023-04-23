'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'RestoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Restaurants',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {})
    await queryInterface.addColumn('Posts', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'RestoId', {})
    await queryInterface.removeColumn('Posts', 'UserId', {})
  }
};
