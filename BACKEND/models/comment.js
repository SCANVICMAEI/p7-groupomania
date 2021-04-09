'use strict';

const {Sequelize,DataTypes, database} = require('../config/sequelizeConfig.js');

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.definie('Comment', {
    idComment: DataTypes.INTEGER,
    content: DataTypes.STRING,
    idMessage: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    classMethods:{
      associate: function(models){
        models.Comment.hasMany(models.Comment)
      }
    }
  });
  return Comment;
};
