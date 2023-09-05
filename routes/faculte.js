const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const eleve = require('../middleware/eleve');
//const multer = require('../middleware/multer-config');
const faculteCtrl = require('../controllers/faculte');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  faculteCtrl.createFaculte);
//router.patch('/:id',  contactCtrl.updateContact);
// router.delete('/:id', contactCtrl.deleteContact);
router.get('/all/', faculteCtrl.getAllFaculte);


module.exports = router;