const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const {
  createSupplierDebt,
  getSupplierDebts,
  updateSupplierDebt,
  deleteSupplierDebt
} = require('../controllers/supplierDebt');

// Routes pour SupplierDebt
router.post('/', createSupplierDebt);
router.get('/', getSupplierDebts);
router.put('/:id', updateSupplierDebt);
router.delete('/:id', deleteSupplierDebt);

module.exports = router;