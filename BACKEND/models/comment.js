'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

const Message = require('../models/message');
const User = require('../models/user');

var Comment = database.define('comment', {
    content: DataTypes.STRING,
    idMessage: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }
);

//RELATIONS

Comment.belongsTo(Message);
Comment.belongsTo(User);

module.exports = Comment;

