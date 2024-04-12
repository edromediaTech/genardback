const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../middleware/auth');
const sendmailCtrl = require('../controllers/sendmail');


router.post('/', sendmailCtrl.sendEmailWithAttachment);

module.exports = router;
