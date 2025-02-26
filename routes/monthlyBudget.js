const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const {
  createMonthlyBudget,
  getMonthlyBudgets,
  updateMonthlyBudget,
  deleteMonthlyBudget
} = require('../controllers/monthlyBudget');

// Routes pour MonthlyBudget
router.post('/', createMonthlyBudget);
router.get('/', getMonthlyBudgets);
router.put('/:id', updateMonthlyBudget);
router.delete('/:id', deleteMonthlyBudget);

module.exports = router;