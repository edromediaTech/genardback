const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const financeController = require('../controllers/financeTool');
const revenueController = require('../controllers/revenue');

// Routes pour les lignes budgétaires
router.post('/budget-lines', financeController.createBudgetLine);

// Routes pour comparer le budget vs dépenses
router.get('/compare-budget-expenses', financeController.compareBudgetVsExpenses);

// Routes pour générer un rapport financier
router.get('/financial-report', financeController.generateFinancialReport);

// Routes pour exporter les dépenses en CSV
router.get('/export-expenses-csv', financeController.exportExpensesToCSV);

// Routes pour envoyer des rappels de paiement
router.post('/send-client-reminder/:id', financeController.sendClientPaymentReminder);

// Routes pour Revenue
router.post('/revenues', revenueController.createRevenue);
router.get('/revenues', revenueController.getRevenues);
router.put('/revenues/:id', revenueController.updateRevenue);
router.delete('/revenues/:id', revenueController.deleteRevenue);

module.exports = router;