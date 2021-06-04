'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

const Message = database.define('Message', {
  message: DataTypes.STRING,
  attachment: DataTypes.STRING,
},{
  Sequelize,
  modelName:'Message'
});

module.exports = Message;