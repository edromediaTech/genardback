const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const {
  createCashRegister,
  getCashRegister,
  addTransactionToCashRegister
} = require('../controllers/cashRegister');

// Routes pour CashRegister
router.post('/', createCashRegister);
router.get('/', getCashRegister);
router.post('/transactions', addTransactionToCashRegister);

module.exports = router;