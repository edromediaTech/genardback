const Achat = require('../models/Achat');

// ➜ Créer un nouvel achat
exports.createAchat = async (req, res) => {
  try {
    const achat = new Achat(req.body);
    await achat.save();
    res.status(201).json(achat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➜ Récupérer tous les achats
exports.getAllAchats = async (req, res) => {
  try {
    const achats = await Achat.find().populate('supplier').populate('articles.produit');
    res.status(200).json(achats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➜ Récupérer un achat par ID
exports.getAchatById = async (req, res) => {
  try {
    const achat = await Achat.findById(req.params.id).populate('supplier').populate('articles.produit');
    if (!achat) return res.status(404).json({ message: 'Achat non trouvé' });
    res.status(200).json(achat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➜ Mettre à jour un achat
exports.updateAchat = async (req, res) => {
  try {
    const achat = await Achat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achat) return res.status(404).json({ message: 'Achat non trouvé' });
    res.status(200).json(achat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ➜ Supprimer un achat
exports.deleteAchat = async (req, res) => {
  try {
    const achat = await Achat.findByIdAndDelete(req.params.id);
    if (!achat) return res.status(404).json({ message: 'Achat non trouvé' });
    res.status(200).json({ message: 'Achat supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
