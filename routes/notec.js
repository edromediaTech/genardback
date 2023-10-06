const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const notecCtrl = require('../controllers/notec');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  notecCtrl.createNotec);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id',auth, notecCtrl.deleteNotec);
//router.get('/all/', courCtrl.getAllCour);


module.exports = router;