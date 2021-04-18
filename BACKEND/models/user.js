'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

const Message = require('../models/message');
const Comment = require('../models/comment');
const Like = require('../models/like');

var User = database.define('user', {
    email: { type: DataTypes.STRING, unique: true},
    username: { type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    job: DataTypes.TEXT,
    bio: DataTypes.TEXT,
  }
);

//RELATIONS

User.hasMany(Comment);
User.hasMany(Like);
User.hasMany(Message);

module.exports = User;