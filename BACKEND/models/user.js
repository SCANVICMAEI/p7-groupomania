'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

var User = database.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    job: DataTypes.STRING,
    bio: DataTypes.STRING,
  }

);

module.exports = User;