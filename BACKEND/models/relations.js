const Message = require('../models/message');
const User = require('../models/user');
const Comment = require('../models/comment');


// belongs to = appartien a 
// has many = a plusieur 

Comment.belongsTo(User, { onDelete: 'cascade', hooks:true });

User.hasMany(Message, { onDelete: 'cascade', hooks:true });

Message.hasMany(Comment, { onDelete: 'cascade', hooks:true });
Message.belongsTo(User, { onDelete: 'cascade', hooks:true });

async function loadModel() {
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null)
  await User.sync({alter:true});
  await Message.sync({alter:true});
  await Comment.sync({alter:true});
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null)
};

loadModel();

module.exports = {Comment ,User, Message};

