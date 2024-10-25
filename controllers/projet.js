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


// Fonction pour retourner tous les projets
exports.getAllProjets = async (req, res) => {
    try {
        // Récupérer tous les projets dans la base de données
        const projets = await Projet.find();
        
        // Vérifier si des projets sont trouvés
        if (projets.length === 0) {
            return res.status(404).json({ message: 'Aucun projet trouvé.' });
        }

        // Retourner la liste des projets
        res.status(200).json(projets);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: 'Erreur lors de la récupération des projets.', error: error.message });
    }
};
