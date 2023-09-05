const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const matiereCtrl = require('../controllers/matiere');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  matiereCtrl.createMatiere);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id',auth, matiereCtrl.deleteMatiere);
router.get('/all/',auth, matiereCtrl.getAllMatiere);


module.exports = router;