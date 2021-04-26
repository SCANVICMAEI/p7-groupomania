'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

//RELATIONS

const Comment = database.define('Comment', {
  content: DataTypes.STRING,
  idMessage: DataTypes.INTEGER,
  idUser: DataTypes.INTEGER
},{
  Sequelize,
  modelName:'Comment'
});

module.exports = Comment;

