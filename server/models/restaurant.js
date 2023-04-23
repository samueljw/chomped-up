'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, {foreignKey: "RestoId"})
      this.hasMany(models.User, {foreignKey: "RestoId"})
      this.hasMany(models.Rating, {foreignKey: "RestoId"})
      this.hasMany(models.Wishlist, {foreignKey: "RestoId"})
    }
  }
  Restaurant.init({
    photo: DataTypes.STRING,
    title: DataTypes.STRING,
    timeOfOperation: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};