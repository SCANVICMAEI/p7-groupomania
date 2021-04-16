'use strict';

const {
  Sequelize,
  DataTypes,
  database
} = require('../config/sequelizeConfig.js');


var Comment = database.define('comment', {
    content: DataTypes.STRING,
  }

);
Comment.belongsTo(Message);
Comment.belongsTo(User);
module.exports = Comment;

