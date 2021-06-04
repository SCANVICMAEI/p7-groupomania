'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

//RELATIONS

const Comment = database.define('Comment', {
  content: DataTypes.STRING,
}, {
  Sequelize,
  modelName: 'Comment'
});

module.exports = Comment;

