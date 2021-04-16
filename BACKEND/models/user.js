'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

var User = database.define('user', {
    email: { type: DataTypes.STRING, unique: true},
    username: { type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    job: DataTypes.TEXT,
    bio: DataTypes.TEXT,
  }
);

User.hasMany(Like);
User.hasMany(Message);
User.hasMany(Comment);

module.exports = User;