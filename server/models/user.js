'use strict';
const {
  Model
} = require('sequelize');
const { bcryptHashSync } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.User, {
      //   through: models.Friendship, 
      //   foreignKey: "User1"
      // })
      // this.belongsToMany(models.User, {
      //   through: models.Friendship, 
      //   foreignKey: "User2"
      // })
      this.hasMany(models.Friendship, {foreignKey: "User1"})
      this.hasMany(models.Friendship, {foreignKey: "User2"})
      this.hasMany(models.Post, {foreignKey: "UserId"})
      this.hasMany(models.Comment, {foreignKey: "UserId"})
      this.belongsTo(models.Restaurant, {foreignKey: "RestoId"})
      this.hasMany(models.Rating, {foreignKey: "UserId"})
      this.hasMany(models.Wishlist, {foreignKey: "UserId"})

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Username is empty" },
        notNull: { msg: "Username is null" },
      },
      unique: {
        msg: "Username must be unique"
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email is empty" },
        notNull: { msg: "Email is null" },
        isEmail: { msg: "Email has to be in email format" },
      },
      unique: {
        msg: "Email must be unique"
      },
    },
    profilePicture: DataTypes.STRING,
    bio: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is empty" },
        notNull: { msg: "Password is null" },
        len: {
          args: [5],
          msg: "Password has to be more than 5 characters"
        }
      },
    },
    RestoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    const hash = bcryptHashSync(instance.password, 10)
    instance.password = hash
  })
  return User;
};