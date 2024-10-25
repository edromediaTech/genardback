const Investisseur = require('../models/investisseur');
const User = require('../models/user');
const {role} = require('../role');
const auth = require('../middleware/auth');

// Ajouter un investisseur
exports.createInvestisseur = async (req, res) => {
    try {
        const investisseur = new Investisseur(req.body);
        await investisseur.save();
        res.status(201).json(investisseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour un investisseur
exports.updateInvestisseur = async (req, res) => {
    try {
        const investisseur = await Investisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(investisseur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un investisseur
exports.deleteInvestisseur = async (req, res) => {
    try {
        await Investisseur.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Investisseur supprimé' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer un investisseur
exports.getInvestisseur = async (req, res) => {
    try {
        const investisseur = await Investisseur.findById(req.params.id).populate('investissements');
        res.status(200).json(investisseur);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getInvestisseurs = async (req, res) => {
    try {
      // Cherche tous les documents dans la collection 'Investisseur'
      const investisseurs = await Investisseur.find().populate('user');
      
      // Vérifie si des investisseurs sont trouvés
      if (!investisseurs.length) {
        return res.status(404).json({ message: 'Aucun investisseur trouvé.' });
      }
      
      // Retourne la liste des investisseurs
      res.status(200).json(investisseurs);
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des investisseurs.' });
    }
  };

