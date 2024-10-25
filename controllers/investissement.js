const Investissement = require('../models/investissement');

// Ajouter un investissement
exports.createInvestissement = async (req, res) => {
    try {
        const investissement = new Investissement(req.body);
        await investissement.save();
        res.status(201).json(investissement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour un investissement
exports.updateInvestissement = async (req, res) => {
    try {
        const investissement = await Investissement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(investissement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un investissement
exports.deleteInvestissement = async (req, res) => {
    try {
        await Investissement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Investissement supprimé' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer un investissement
exports.getInvestissement = async (req, res) => {
    try {
        const investissement = await Investissement.findById(req.params.id).populate('projet').populate('investisseur');
        res.status(200).json(investissement);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getInvestissements = async (req, res) => {
    try {
      // Cherche tous les documents dans la collection 'Investisseur'
      const investissements = await Investissement.find()
      .populate({
        path: 'investisseur',
        populate: { path: 'user' } // Peupler le champ 'user' dans 'investisseur'
      })
      .populate('projet');
      
      // Vérifie si des investissements sont trouvés
      if (!investissements.length) {
        return res.status(404).json({ message: 'Aucun investisseur trouvé.' });
      }
      
      // Retourne la liste des investissements
      res.status(200).json(investissements);
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des investissements.' });
    }
  };