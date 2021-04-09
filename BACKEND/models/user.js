'use strict';
const {Sequelize,DataTypes, database} = require('../config/sequelizeConfig.js');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.definie('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    job: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods:{
      associate: function(models){
        models.User.hasMany(models.Message)
      }
    }
  });
  return User;
};