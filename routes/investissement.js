const express = require('express');
const investissementController = require('../controllers/investissement');
const router = express.Router();

// Routes CRUD Investissement
router.post('/investissements', investissementController.createInvestissement);
router.put('/investissements/:id', investissementController.updateInvestissement);
router.delete('/investissements/:id', investissementController.deleteInvestissement);
router.get('/investissements/:id', investissementController.getInvestissement);

module.exports = router;
