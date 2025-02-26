const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const {
  createClientDebt,
  getClientDebts,
  updateClientDebt,
  deleteClientDebt
} = require('../controllers/clientDebt');

// Routes pour ClientDebt
router.post('/', createClientDebt);
router.get('/', getClientDebts);
router.put('/:id', updateClientDebt);
router.delete('/:id', deleteClientDebt);

module.exports = router;