const express = require('express');
const transactionController = require('../controllers/transaction');
const router = express.Router();

// Routes CRUD Transaction
router.post('/transactions', transactionController.createTransaction);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);
router.get('/transactions/:id', transactionController.getTransaction);

module.exports = router;
