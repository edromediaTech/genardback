const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const optionCtrl = require('../controllers/option');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  optionCtrl.createOption);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id',auth, optionCtrl.deleteOption);
router.get('/all/', optionCtrl.getAllOption);


module.exports = router;