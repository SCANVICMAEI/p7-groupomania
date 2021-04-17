'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');

require('../models/user');
require('../models/message');

var Like = database.define('like', {
    idMessage: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }

);

// Like.belongsTo(Message);
// Like.belongsTo(User);

module.exports = Like;
