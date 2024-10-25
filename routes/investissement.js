const express = require('express');
const investissementController = require('../controllers/investissement');
const router = express.Router();

// Routes CRUD Investissement
router.post('/', investissementController.createInvestissement);
router.put('/:id', investissementController.updateInvestissement);
router.delete('/:id', investissementController.deleteInvestissement);
router.get('/:id', investissementController.getInvestissement);
router.get('/', investissementController.getInvestissements);

module.exports = router;
