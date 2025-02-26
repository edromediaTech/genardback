const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const {
  createAccount,
  getAllAccounts,
  updateAccount,
  deposit,
  withdraw,
  deleteAccount,
  getStatement,
  getBalance,
  getTransactionsByType,
  getAccountsByBank

} = require('../controllers/bankAccount');

// Routes pour BankAccount
router.post('/', createAccount);
router.get('/', getAllAccounts);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.post('/:id/deposit', deposit);
router.post('/:id/withdraw', withdraw);

router.get('/:id/statement', getStatement);  // Relevé d'un compte
router.get('/:id/balance', getBalance);  // Solde actuel
router.get('/:id/transactions', getTransactionsByType);  // Transactions filtrées
router.get('/by-bank', getAccountsByBank);  // Comptes par banque

module.exports = router;