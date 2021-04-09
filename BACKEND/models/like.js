'use strict';
const {Sequelize,DataTypes, database} = require('../config/sequelizeConfig.js');

module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.definie('Like', {
    idMessage: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    classMethods:{
      associate: function(models){
        models.Like.hasMany(models.Like)
      }
    }
  });
  return Like;
};