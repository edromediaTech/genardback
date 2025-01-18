const Commande = require('../models/commande');
const Produit = require('../models/produit');

// Ajouter une commande
exports.createCommande = async (req, res) => {
  
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }
};


exports.addToCommande = async (req, res) => {
  
  const { commandeId, produitId, quantite } = req.body;

  try {
    const commande = await Commande.findById(commandeId);
    if (!commande) {
      return res.status(404).json({ error: 'Commande introuvable' });
    }

    await commande.addOrUpdateArticle(produitId, quantite);

    res.status(200).json({
      message: 'Article ajouté ou mis à jour avec succès dans la commande.',
      commande,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article à la commande :', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Obtenir toutes les commandes avec les détails des produits et du serveur
exports.getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate({
        path: 'articles.produit', // Chemin pour accéder au produit dans chaque article
        model: 'Produit', // Assurez-vous que le modèle associé est bien défini
        select: 'nom prix' // Sélectionne uniquement le nom et le prix des produits
      })
      .populate('serveur', 'prenom email'); // Inclut uniquement le prénom et l'email du serveur

    console.log(commandes); // Vérifiez si les données sont correctement peuplées
    res.status(200).json(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getProduitsParPeriode = async (req, res) => {
  try {
    // Récupérer les dates de la requête
    const { dateDebut, dateFin } = req.query;

    if (!dateDebut || !dateFin) {
      return res.status(400).json({ error: 'Les dates dateDebut et dateFin sont requises.' });
    }

    // Créer les dates en tenant compte du fuseau horaire d'Haïti (UTC-5)
    const debut = new Date(`${dateDebut}T00:00:00-05:00`);
    let fin = new Date(`${dateFin}T23:59:59-05:00`);

    // Vérifier les commandes dans la plage de dates
    const commandes = await Commande.find({
      createdAt: { $gte: debut, $lte: fin }
    }).populate('articles.produit');

    // Regrouper les produits par ID
    const produitsMap = {};

    commandes.forEach((commande) => {
      commande.articles.forEach((article) => {
        const produitId = article.produit._id.toString();

        if (!produitsMap[produitId]) {
          produitsMap[produitId] = {
            nom: article.produit.nom,
            prix: article.produit.prix,
            quantite: 0,
            total: 0,
          };
        }

        // Mettre à jour la quantité et le total pour ce produit
        produitsMap[produitId].quantite += article.quantite;
        produitsMap[produitId].total += article.quantite * article.produit.prix;
      });
    });

    // Convertir l'objet en tableau
    const resultats = Object.values(produitsMap);

    // Retourner les résultats
    res.status(200).json(resultats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Obtenir une commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate('serveur');
    if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une commande
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) return res.status(404).json({ error: 'Commande non trouvée' });
    res.status(200).json({ message: 'Commande supprimée avec succès', commande });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
