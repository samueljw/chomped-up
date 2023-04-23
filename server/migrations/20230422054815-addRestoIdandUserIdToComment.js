'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments', 'PostId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {})
    await queryInterface.addColumn('Comments', 'UserId', {
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
    await queryInterface.removeColumn('Comments', 'PostId', {})
    await queryInterface.removeColumn('Comments', 'UserId', {})
  }
};
