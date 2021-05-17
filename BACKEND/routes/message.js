const express = require('express');

const router = express.Router();

const messageCtrl = require('../controllers/message');

// const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer');

router.post('/',messageCtrl.createMessage);

router.get('/', messageCtrl.allMessage)

router.delete('/:id', messageCtrl.deleteMessage);



module.exports = router;