// controllers/suggestionController.js
const Suggestion = require('../models/suggestion');

// Créer une suggestion
exports.createSuggestion = async (req, res) => {
  try {
    const { expediteur, destinataire, sujet, message, attachments } = req.body;
    const suggestion = new Suggestion({
      expediteur,
      destinataire,
      sujet,
      message,
      attachments,
      trash: false,
      lue: false
    });
    await suggestion.save();
    res.status(201).json(suggestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer les suggestions pour un utilisateur
exports.getSuggestionsForUser = async (req, res) => {
  try {
    const  userId  = req.params.userId;
    const suggestions = await Suggestion.find({ destinataire: userId })
      .populate('expediteur', 'name') // Populate l'expéditeur avec son nom
      .populate('destinataire', 'name');
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Marquer une suggestion comme lue
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const suggestion = await Suggestion.findByIdAndUpdate(id, { lue: true }, { new: true });
    res.status(200).json(suggestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une suggestion
exports.deleteSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Suggestion.findByIdAndDelete(id);
    res.status(200).json({ message: 'Suggestion supprimée' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
