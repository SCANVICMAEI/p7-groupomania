const Message = require('../models/message');
const User = require('../models/user');
const Comment = require('../models/comment');

Comment.belongsTo(Message); 
User.hasMany(Message);
Message.hasMany(Comment);
Comment.belongsTo(User);


async function loadModel() {
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null)
  await User.sync({alter:true});
  await Message.sync({alter:true});
  await Comment.sync({alter:true});
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null)
};
// loadModel();

module.exports = {Comment ,User, Message};

