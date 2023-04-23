'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Restaurant, {foreignKey: "RestoId"})
      this.belongsTo(models.User, {foreignKey: "UserId"})
      this.hasMany(models.Comment, {foreignKey: "PostId"})

    }
  }
  Post.init({
    photo: DataTypes.STRING,
    title: DataTypes.STRING,
    caption: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    RestoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};