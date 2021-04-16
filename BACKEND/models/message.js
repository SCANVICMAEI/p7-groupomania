'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');


var Message = database.define('message', {
    message: DataTypes.STRING,
  }

);
Message.belongsTo(User);
Message.hasMany(Comment);
Message.belongsToMany(User,{as: "likes"});

module.exports = Message;

