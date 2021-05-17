const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
// const multer = require('../middlewares/multer');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/:id',userCtrl.userGetOne)

router.delete('/:id', userCtrl.userDelete);

router.put('/:id',auth,userCtrl.userUpdate);

module.exports = router;