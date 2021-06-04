const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/:id',userCtrl.userGetOne)

router.delete('/:id',auth, userCtrl.userDelete);

router.put('/:id',auth,userCtrl.userUpdate);

module.exports = router;