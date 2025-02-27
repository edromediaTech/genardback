const Achat = require('../models/achat'); // Importez le modèle Achat
const Produit = require('../models/produit'); // Importez le modèle Produit

// Créer un achat
exports.createAchat = async (req, res) => {
  try {
    const { fournisseur, produitId, quantite, prix, versement, reglement, livraison } = req.body;

    // Vérifier si le produit existe
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    // Créer un nouvel achat
    const nouvelAchat = new Achat({
      fournisseur,
      produitId,
      quantite,
      prix,
      versement,
      reglement,
      livraison,
    });

    // Sauvegarder l'achat
    await nouvelAchat.save();

    // Répondre avec l'achat créé
    res.status(201).json(nouvelAchat);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'achat', error: error.message });
  }
};

// Lire tous les achats
exports.getAllAchats = async (req, res) => {
  try {
    const achats = await Achat.find().populate('produitId'); // Peupler les informations du produit
    res.status(200).json(achats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des achats', error: error.message });
  }
};

// Lire un achat par son ID
exports.getAchatById = async (req, res) => {
  try {
    const achat = await Achat.findById(req.params.id).populate('produitId'); // Peupler les informations du produit
    if (!achat) {
      return res.status(404).json({ message: 'Achat introuvable' });
    }
    res.status(200).json(achat);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'achat', error: error.message });
  }
};

// Mettre à jour un achat
exports.updateAchat = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite, prix, versement, reglement, livraison } = req.body;

    // Vérifier si l'achat existe
    const achat = await Achat.findById(id);
    if (!achat) {
      return res.status(404).json({ message: 'Achat introuvable' });
    }

    // Mettre à jour l'achat
    const updatedAchat = await Achat.findByIdAndUpdate(
      id,
      { quantite, prix, versement, reglement, livraison },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedAchat);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'achat", error: error.message });
  }
};


// Supprimer un achat
exports.deleteAchat = async (req, res) => {
  try {
    const { id } = req.params;

    // Trouver l'achat existant
    const achat = await Achat.findById(id);
    if (!achat) {
      return res.status(404).json({ message: 'Achat introuvable' });
    }

    // Supprimer l'achat
    await Achat.findByIdAndDelete(id);

    res.status(200).json({ message: 'Achat supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'achat', error: error.message });
  }
};