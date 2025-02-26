const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const {
  createBudgetLine,
  getBudgetLines,
  updateBudgetLine,
  deleteBudgetLine
} = require('../controllers/budgetLine');

// Routes pour BudgetLine
router.post('/', createBudgetLine);
router.get('/', getBudgetLines);
router.put('/:id', updateBudgetLine);
router.delete('/:id', deleteBudgetLine);

module.exports = router;