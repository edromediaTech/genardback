// suggestionRoutes.js
const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestion'); // Assurez-vous du chemin correct

// Route pour créer une suggestion
router.post('/', suggestionController.createSuggestion);

// Route pour récupérer toutes les suggestions
router.get('/', suggestionController.getAllSuggestions);

// Route pour récupérer une suggestion par ID
router.get('/:id', suggestionController.getSuggestionById);

// Route pour mettre à jour une suggestion par ID
router.put('/:id', suggestionController.updateSuggestion);

// Route pour supprimer une suggestion par ID
router.delete('/:id', suggestionController.deleteSuggestion);

module.exports = router;
