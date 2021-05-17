const express = require('express');

const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/:id',commentCtrl.createComment);

router.get('/', commentCtrl.allComment);

router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;