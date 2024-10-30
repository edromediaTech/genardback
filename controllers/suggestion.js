// suggestionController.js
const Suggestion = require('../models/suggestion'); // Assurez-vous du chemin correct vers votre modèle

// Créer une suggestion
exports.createSuggestion = async (req, res) => {
    try {
        const suggestion = new Suggestion(req.body);
        const newSuggestion = await suggestion.save();
        res.status(201).json(newSuggestion);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la suggestion", error });
    }
};

// Lire toutes les suggestions
exports.getAllSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find().populate('expediteur');
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des suggestions", error });
    }
};

// Lire une suggestion par ID
exports.getSuggestionById = async (req, res) => {
    try {
        const suggestion = await Suggestion.findById(req.params.id).populate('expediteur');
        if (!suggestion) return res.status(404).json({ message: "Suggestion non trouvée" });
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la suggestion", error });
    }
};

// Mettre à jour une suggestion par ID
exports.updateSuggestion = async (req, res) => {
    try {
        const suggestion = await Suggestion.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!suggestion) return res.status(404).json({ message: "Suggestion non trouvée" });
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la suggestion", error });
    }
};

// Supprimer une suggestion par ID
exports.deleteSuggestion = async (req, res) => {
    try {
        const suggestion = await Suggestion.findByIdAndDelete(req.params.id);
        if (!suggestion) return res.status(404).json({ message: "Suggestion non trouvée" });
        res.status(200).json({ message: "Suggestion supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la suggestion", error });
    }
};
