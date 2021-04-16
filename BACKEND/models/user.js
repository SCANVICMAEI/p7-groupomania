'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

var User = database.define('user', {
    email: { type: DataTypes.STRING, unique: true},
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    job: DataTypes.TEXT,
    bio: DataTypes.TEXT,
  }

);

module.exports = User;