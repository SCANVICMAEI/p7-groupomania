'use strict';

const {Sequelize,DataTypes, database} = require('../config/sequelizeConfig.js');

module.exports = (sequelize, DataTypes) => {
 var Message = sequelize.define('Message', {
  idUSERS: DataTypes.INTEGER,
  content: DataTypes.STRING,
  attachment: DataTypes.STRING,
  likes: DataTypes.INTEGER
 },{
classMethods:{
  associate: function(models){
    models.Message.belongs(models.User,{
      foreignKey:{
        alloNull:false
      }
    })
  }
}
 });
   
  return Message;
};