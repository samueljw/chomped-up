'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Wishlists', 'RestoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Restaurants',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {})
    await queryInterface.addColumn('Wishlists', 'UserId', {
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
    await queryInterface.removeColumn('Wishlists', 'RestoId', {})
    await queryInterface.removeColumn('Wishlists', 'UserId', {})
  }
};
