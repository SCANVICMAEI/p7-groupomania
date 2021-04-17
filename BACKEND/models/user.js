'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

require('../models/message');
require('../models/comment');
require('../models/like');

var User = database.define('user', {
    email: { type: DataTypes.STRING, unique: true},
    username: { type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    job: DataTypes.TEXT,
    bio: DataTypes.TEXT,
  }
);

// User.hasMany(Comment);
// User.hasMany(Like);
// User.hasMany(Message);

module.exports = User;