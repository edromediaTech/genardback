const Projet = require('../models/projet');

// Ajouter un projet
exports.createProjet = async (req, res) => {
    try {
        const projet = new Projet(req.body);
        await projet.save();
        res.status(201).json(projet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour un projet
exports.updateProjet = async (req, res) => {
    try {
        const projet = await Projet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(projet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un projet
exports.deleteProjet = async (req, res) => {
    try {
        await Projet.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Projet supprimé' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer un projet
exports.getProjet = async (req, res) => {
    try {
        const projet = await Projet.findById(req.params.id).populate('investisseurs');
        res.status(200).json(projet);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
