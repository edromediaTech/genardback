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

// Ajouter un article à une commande existante
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
        path: 'articles.produit',
        model: 'Produit',
        select: 'nom prix'
      })
      .populate('serveur', 'prenom email');
    res.status(200).json(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate('articles.produit')
      .populate('serveur');
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

// Ajouter un paiement à une commande
exports.ajouterPaiement = async (req, res) => {
 
  const { commandeId, montant } = req.body;
  
  try {
    const commande = await Commande.findById(commandeId);
    if (!commande) {
      return res.status(404).json({ error: 'Commande introuvable' });
    }

    const result = await commande.ajouterPaiement(montant);

    // Vérifier si le paiement a été ajouté avec succès
    if (result.surplus) {
      return res.status(200).json({
        message: result.message,
        surplus: result.surplus,
        commande,
      });
    }

    res.status(200).json({
      message: result.message,
      commande,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du paiement :', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les statistiques des règlements par période
exports.getStatistiquesReglements = async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.query;
    if (!dateDebut || !dateFin) {
      return res.status(400).json({ error: 'Les dates dateDebut et dateFin sont requises.' });
    }

    // Créer les dates en tenant compte du fuseau horaire d'Haïti (UTC-5)
    const debut = new Date(`${dateDebut}T00:00:00-05:00`);
    const fin = new Date(`${dateFin}T23:59:59-05:00`);

    // Récupérer les commandes dans la plage de dates
    const commandes = await Commande.find({
      createdAt: { $gte: debut, $lte: fin },
    });

    // Calculer les statistiques
    let totalNonPaye = 0;
    let totalPartiel = 0;
    let totalComplet = 0;

    commandes.forEach((commande) => {
      if (commande.statutReg === 'Non paiement') {
        totalNonPaye += commande.total - commande.reglement;
      } else if (commande.statutReg === 'Partiel') {
        totalPartiel += commande.reglement;
      } else if (commande.statutReg === 'Complet') {
        totalComplet += commande.reglement;
      }
    });

    res.status(200).json({
      totalNonPaye,
      totalPartiel,
      totalComplet,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques des règlements :', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les produits vendus par période
exports.getProduitsParPeriode = async (req, res) => {
  try {
    // Récupérer les dates de la requête
    const { dateDebut, dateFin } = req.query;
    if (!dateDebut || !dateFin) {
      return res.status(400).json({ error: 'Les dates dateDebut et dateFin sont requises.' });
    }

    // Créer les dates en tenant compte du fuseau horaire d'Haïti (UTC-5)
    const debut = new Date(`${dateDebut}T00:00:00-05:00`);
    const fin = new Date(`${dateFin}T23:59:59-05:00`);

    // Vérifier les commandes dans la plage de dates
    const commandes = await Commande.find({
      createdAt: { $gte: debut, $lte: fin },
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