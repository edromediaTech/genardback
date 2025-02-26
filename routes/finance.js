const express = require('express');
const router = express.Router();

// Importer les routes individuelles
const budgetLineRoutes = require('./budgetLine');
const monthlyBudgetRoutes = require('./monthlyBudget');
const expenseRoutes = require('./expense');
const bankAccountRoutes = require('./bankAccount');
const supplierDebtRoutes = require('./supplierDebt');
const clientDebtRoutes = require('./clientDebt');
const cashRegisterRoutes = require('./cashRegister');

// Préfixes pour chaque route
router.use('/budget-lines', budgetLineRoutes);
router.use('/monthly-budgets', monthlyBudgetRoutes);
router.use('/expenses', expenseRoutes);
router.use('/accounts', bankAccountRoutes);
router.use('/supplier-debts', supplierDebtRoutes);
router.use('/client-debts', clientDebtRoutes);
router.use('/cash-register', cashRegisterRoutes);

module.exports = router;