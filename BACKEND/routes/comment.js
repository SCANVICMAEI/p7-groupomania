const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');


const commentCtrl = require('../controllers/comment');

router.post('/:id',auth,commentCtrl.createComment);

router.get('/',auth,commentCtrl.allComment);

router.delete('/:id',auth, commentCtrl.deleteComment);

module.exports = router;

