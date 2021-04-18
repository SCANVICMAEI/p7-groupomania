'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

const User = require('../models/user');
const Comment = require('../models/comment');
const Like = require('../models/like');

var Message = database.define('message', {
  idUser: DataTypes.INTEGER,
  message: DataTypes.STRING,
});

//RELATIONS

Message.belongsTo(User);
Message.hasMany(Comment);
Message.hasMany(Like);

module.exports = Message;