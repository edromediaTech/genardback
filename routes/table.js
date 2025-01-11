const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table');

// Ajouter une table
router.post('/', tableController.createTable);

// Obtenir toutes les tables
router.get('/', tableController.getTables);

// Obtenir une table par ID
router.get('/:id', tableController.getTableById);

// Mettre à jour une table
router.put('/:id', tableController.updateTable);

// Supprimer une table
router.delete('/:id', tableController.deleteTable);

module.exports = router;
