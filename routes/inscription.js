const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const inscriptionCtrl = require('../controllers/inscription');


router.post('/',   inscriptionCtrl.createInscription);
router.get('/all',   inscriptionCtrl.getAllInscription);
router.get('/complete',   inscriptionCtrl.getAllInsComp);

module.exports = router;