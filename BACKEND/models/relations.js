const Message = require('../models/message');
const User = require('../models/user');
const Comment = require('../models/comment');

Comment.belongsTo(Message); 
Comment.belongsTo(User);

Message.belongsToMany(User);
Message.hasMany(Comment);

module.exports = (Comment ,User, Message);