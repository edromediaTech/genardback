const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const inscriptionCtrl = require('../controllers/inscription');


router.post('/',   inscriptionCtrl.createInscription);
router.get('/all/:id',   inscriptionCtrl.getAllInscription);
router.get('/all/option/:id',   inscriptionCtrl.getOptionInscription);
router.get('/complete',   inscriptionCtrl.getAllInsComp);
router.patch('/:id',   inscriptionCtrl.updateInscription);
router.delete('/:id',   inscriptionCtrl.deleteInscription);

module.exports = router;