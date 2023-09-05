const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const anneeCtrl = require('../controllers/annee');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/',  anneeCtrl.createAnnee);
router.delete('/:id', anneeCtrl.deleteAnnee);
// router.get('/', auth, anneeCtrl.getAllAnnee);
// router.get('/last', auth, anneeCtrl.getLastAnnee);



module.exports = router;