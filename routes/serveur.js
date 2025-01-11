const express = require('express');
const router = express.Router();
const serveurController = require('../controllers/serveur');

// Ajouter un serveur
router.post('/', serveurController.createServeur);

// Obtenir tous les serveurs
router.get('/', serveurController.getServeurs);

// Obtenir un serveur par ID
router.get('/:id', serveurController.getServeurById);

// Mettre à jour un serveur
router.put('/:id', serveurController.updateServeur);

// Supprimer un serveur
router.delete('/:id', serveurController.deleteServeur);

module.exports = router;
