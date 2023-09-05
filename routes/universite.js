const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');
const universiteCtrl = require('../controllers/universite');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.get('/', auth, universiteCtrl.getUniversiteFromUrl);
router.post('/', universiteCtrl.createUniversite);
//router.patch('/:id',  universiteCtrl.updateuniversite);
router.delete('/:id',auth, universiteCtrl.deleteUniversite);
router.get('/all/',auth, universiteCtrl.getAllUniversite);


module.exports = router;