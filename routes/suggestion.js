// routes/suggestionRoutes.js
const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestion');

// Créer une suggestion
router.post('/', suggestionController.createSuggestion);

// Récupérer les suggestions pour un utilisateur
router.get('/user/:userId', suggestionController.getSuggestionsForUser);

// Marquer une suggestion comme lue
router.put('/:id/markAsRead', suggestionController.markAsRead);

// Supprimer une suggestion
router.delete('/:id', suggestionController.deleteSuggestion);

module.exports = router;
