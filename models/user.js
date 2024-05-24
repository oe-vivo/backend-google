'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Define las relaciones del modelo aquí si es necesario
  }

  User.init({
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    displayName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
