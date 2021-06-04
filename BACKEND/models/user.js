'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');


const User = database.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  job: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  isAdmin: DataTypes.BOOLEAN,
}, {
  Sequelize,
  modelName: 'User'
});

//RELATIONS

module.exports = User;