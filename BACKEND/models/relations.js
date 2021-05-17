const Message = require('../models/message');
const User = require('../models/user');
const Comment = require('../models/comment');

Comment.belongsTo(Message); 
User.hasMany(Message);
User.hasMany(Comment)

module.exports = (Comment ,User, Message);

