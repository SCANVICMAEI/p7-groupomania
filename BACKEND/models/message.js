'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');


var Message = database.define('Message', {
    idMessage:DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    message: DataTypes.STRING,
  }

);

module.exports = Message;