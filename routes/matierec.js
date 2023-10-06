const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const matierecCtrl = require('../controllers/matierec');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  matierecCtrl.createMatierec);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id',auth, matierecCtrl.deleteMatierec);
router.get('/all/:id',auth, matierecCtrl.getAllMatierec);


module.exports = router;