const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

// const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get 

router.

module.exports = router;