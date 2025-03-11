const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpensesByPeriod
} = require('../controllers/expense');

// Routes pour Expense
router.post('/', createExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get("/period",getExpensesByPeriod);

module.exports = router;