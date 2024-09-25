const express = require('express');
const investisseurController = require('../controllers/investisseur');
const router = express.Router();

// Routes CRUD Investisseur
router.post('/investisseurs', investisseurController.createInvestisseur);
router.put('/investisseurs/:id', investisseurController.updateInvestisseur);
router.delete('/investisseurs/:id', investisseurController.deleteInvestisseur);
router.get('/investisseurs/:id', investisseurController.getInvestisseur);

module.exports = router;
