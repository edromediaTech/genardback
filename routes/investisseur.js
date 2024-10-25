const express = require('express');
const investisseurController = require('../controllers/investisseur');
const router = express.Router();
const auth = require('../middleware/auth');

// Routes CRUD Investisseur
router.post('/', investisseurController.createInvestisseur);
router.get('/', investisseurController.getInvestisseurs);
router.put('/:id', investisseurController.updateInvestisseur);
router.delete('/:id', investisseurController.deleteInvestisseur);
router.get('/:id', investisseurController.getInvestisseur);
//router.get('/unlinked', auth, investisseurController.getUnlinkedInvestisseurs);

module.exports = router;
