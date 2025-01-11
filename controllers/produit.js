const Produit = require('../models/produit');

// Ajouter un produit
exports.createProduit = async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getProduitsBoissonEnAlerte = async (req, res) => {
  try {
    // Récupérer les produits de catégorie 'Boisson' avec quantité <= alerte
    const produitsEnAlerte = await Produit.find({
      categorie: 'Boisson',
      quantite: { $lte: '$alerte' }
    });

    // Retourner les produits trouvés
    res.status(200).json(produitsEnAlerte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les produits
exports.getProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un produit par ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) return res.status(404).json({ error: 'Produit non trouvé' });
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un produit
exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produit) return res.status(404).json({ error: 'Produit non trouvé' });
    res.status(200).json(produit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) return res.status(404).json({ error: 'Produit non trouvé' });
    res.status(200).json({ message: 'Produit supprimé avec succès', produit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
