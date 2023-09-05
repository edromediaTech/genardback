const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/all', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.getOneUser);
router.patch('/:id',auth, userCtrl.updateUser);
// router.patch('/password/:id',auth, userCtrl.updatePassword);
router.delete('/logout', userCtrl.logout);
router.delete('/:id', userCtrl.deleteUser);


module.exports = router;