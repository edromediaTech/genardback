const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const courCtrl = require('../controllers/cour');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  courCtrl.createCour);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id', auth,courCtrl.deleteCour);
router.get('/all/', auth,courCtrl.getAllCour);
router.get('/user/', auth,courCtrl.getCourByUserProf);


module.exports = router;