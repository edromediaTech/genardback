const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');

// Ajouter un client
router.post('/', clientController.createClient);

// Obtenir tous les clients
router.get('/', clientController.getClients);

// Obtenir un client par ID
router.get('/:id', clientController.getClientById);

// Mettre à jour un client
router.put('/:id', clientController.updateClient);

// Supprimer un client
router.delete('/:id', clientController.deleteClient);

module.exports = router;
