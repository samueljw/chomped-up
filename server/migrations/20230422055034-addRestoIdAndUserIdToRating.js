'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Ratings', 'RestoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Restaurants',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {})
    await queryInterface.addColumn('Ratings', 'UserId', {
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
    await queryInterface.removeColumn('Ratings', 'RestoId', {})
    await queryInterface.removeColumn('Ratings', 'UserId', {})
  }
};
