'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

require('../models/user');
require('../models/comment');
require('../models/like');

var Message = database.define('message', {
  idUser: DataTypes.INTEGER,
  message: DataTypes.STRING,
});

// Message.belongsTo(User);
// Message.hasMany(Comment);
// Message.hasMany(Like);

module.exports = Message;