'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "User1"})
      this.belongsTo(models.User, {foreignKey: "User2"})
      // define association here
    }
  }
  Friendship.init({
    status: DataTypes.STRING,
    User1: DataTypes.INTEGER,
    User2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friendship',
  });
  return Friendship;
};