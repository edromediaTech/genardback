const express = require('express');
const router = express.Router();
const multer = require('multer');
const formData = require('form-data');

// Configuration de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const auth = require('../middleware/auth');
const mailCtrl = require('../controllers/mail');


router.post('/', mailCtrl.sendEmail);
router.post('/messages',mailCtrl.getmail);
//router.post('/many', auth, profCtrl.createprofMany);
 router.get('/received', auth, mailCtrl.getAllReceiveMailUser);
 router.get('/send', auth, mailCtrl.getAllSendMailUser);
// router.patch('/:id', auth,secretaire, profCtrl.updateprof);
//router.delete('/:id',  profCtrl.deleteProf);
router.get('/all/:id', mailCtrl.getAllMailUser);
module.exports = router;
