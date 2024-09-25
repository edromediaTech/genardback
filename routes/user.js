const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get('/all', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.getUser);
router.patch('/:id',auth, userCtrl.updateUser);
router.patch('/code/:id',auth, userCtrl.updateUserCode);
router.patch('/userlevel/:id',auth, userCtrl.updateUserLevel);
router.delete('/logout', userCtrl.logout);
router.delete('/:id',auth, userCtrl.deleteUser);


module.exports = router;