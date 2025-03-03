const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware d'authentification
const serviceController = require('../controllers/service');

// Créer un service
router.post('/', auth, serviceController.createService);

// Récupérer tous les services
router.get('/', serviceController.getServices);

// Récupérer un service par ID
router.get('/:id', serviceController.getServiceById);

// Mettre à jour un service
router.put('/:id', auth, serviceController.updateService);

// Supprimer un service
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;