'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

const Message = require('../models/message');
const User = require('../models/user');

var Like = database.define('liketest', {
    idMessage: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }

);

//RELATIONS

Like.belongsTo(Message);
Like.belongsTo(User);

module.exports = Like;
