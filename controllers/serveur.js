const Serveur = require('../models/serveur');

// Ajouter un serveur
exports.createServeur = async (req, res) => {
  try {
    const serveur = new Serveur(req.body);
    await serveur.save();
    res.status(201).json(serveur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les serveurs
exports.getServeurs = async (req, res) => {
  try {
    const serveurs = await Serveur.find();
    res.status(200).json(serveurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un serveur par ID
exports.getServeurById = async (req, res) => {
  try {
    const serveur = await Serveur.findById(req.params.id);
    if (!serveur) return res.status(404).json({ error: 'Serveur non trouvé' });
    res.status(200).json(serveur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un serveur
exports.updateServeur = async (req, res) => {
  try {
    const serveur = await Serveur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!serveur) return res.status(404).json({ error: 'Serveur non trouvé' });
    res.status(200).json(serveur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un serveur
exports.deleteServeur = async (req, res) => {
  try {
    const serveur = await Serveur.findByIdAndDelete(req.params.id);
    if (!serveur) return res.status(404).json({ error: 'Serveur non trouvé' });
    res.status(200).json({ message: 'Serveur supprimé avec succès', serveur });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
