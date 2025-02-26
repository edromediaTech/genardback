const mongoose = require('mongoose');
const Produit = require('./produit'); // Assurez-vous que le modèle Produit est correctement défini.

// Schéma pour la commande
const CommandeSchema = new mongoose.Schema({
  client: { type: String, required: true },
  date: { type: Date, default: Date.now },
  articles: [{
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
    quantite: { type: Number, default: 1 },
  }],
  code: { type: String, unique: true }, // Code unique généré automatiquement
  statut: {
    type: String,
    enum: ['En attente', 'En préparation', 'Servie', 'Terminée'],
    default: 'En attente',
  },
  total: { type: Number, required: true },
  reglement: { type: Number, default: 0 }, // Montant payé jusqu'à présent
  statutReg: {
    type: String,
    enum: ['Non paiement', 'Partiel', 'Complet'],
    default: 'Non paiement',
  },
  serveur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Middleware pour générer un code unique avant la sauvegarde
CommandeSchema.pre('save', async function (next) {
  if (!this.code) {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    
    // Trouver le dernier code pour la journée actuelle
    const lastCode = await mongoose.model('Commande').findOne({ code: { $regex: `^${formattedDate}-` } })
      .sort({ code: -1 })
      .limit(1);

    let increment = 1;
    if (lastCode) {
      const lastIncrement = parseInt(lastCode.code.split('-')[1], 10);
      increment = lastIncrement + 1;
    }

    this.code = `${formattedDate}-${String(increment).padStart(3, '0')}`;
  }

  // Mettre à jour le statutReg avant la sauvegarde
  this.updateStatutReg();
  next();
});

// Méthode pour ajouter ou mettre à jour un article dans la commande
CommandeSchema.methods.addOrUpdateArticle = async function (produitId, quantiteAjoutee) {
  // Convertir quantiteAjoutee en nombre
  quantiteAjoutee = Number(quantiteAjoutee);
  if (isNaN(quantiteAjoutee)) {
    throw new Error('La quantité ajoutée doit être un nombre valide.');
  }

  const produit = await Produit.findById(produitId);
  if (!produit) throw new Error('Produit introuvable');

  // Vérifie si le produit existe déjà dans la commande
  const article = this.articles.find(a => a.produit.equals(produitId));
  if (article) {
    // Met à jour la quantité si le produit existe déjà
    article.quantite += quantiteAjoutee;

    // Vérifie et met à jour le stock uniquement si la catégorie est "Boisson"
    if (produit.categorie === 'Boisson') {
      if (produit.quantite < article.quantite) {
        throw new Error(`Stock insuffisant pour le produit : ${produit.nom}`);
      }
      produit.quantite -= quantiteAjoutee;
    }
  } else {
    // Ajoute le produit comme nouvel article
    this.articles.push({ produit: produitId, quantite: quantiteAjoutee });

    // Vérifie et met à jour le stock uniquement si la catégorie est "Boisson"
    if (produit.categorie === 'Boisson') {
      if (produit.quantite < quantiteAjoutee) {
        throw new Error(`Stock insuffisant pour le produit : ${produit.nom}`);
      }
      produit.quantite -= quantiteAjoutee;
    }
  }

  // Sauvegarde les changements au niveau du produit
  if (produit.categorie === 'Boisson') {
    await produit.save();
  }

  // Recalcule le total
  await this.populate('articles.produit'); // Peupler les articles pour accéder aux prix
  this.total = this.articles.reduce((sum, item) => sum + (item.quantite * item.produit.prix), 0);

  // Mettre à jour le statutReg
  this.updateStatutReg();

  await this.save();
};

// Méthode pour ajouter un paiement
CommandeSchema.methods.ajouterPaiement = async function (montant) {
  // Convertir le montant en nombre
  montant = Number(montant);
  if (isNaN(montant) || montant <= 0) {
    throw new Error('Le montant du paiement doit être un nombre positif.');
  }

  // Calculer le nouveau montant cumulé
  const nouveauReglement = this.reglement + montant;

  // Vérifier si le paiement dépasse le total
  if (nouveauReglement > this.total) {
    const surplus = nouveauReglement - this.total;
    return { message: `Paiement dépassé. Surplus : ${surplus.toFixed(2)} €`, surplus };
  }

  // Mettre à jour le champ reglement
  this.reglement = nouveauReglement;

  // Mettre à jour le statutReg
  this.updateStatutReg();

  // Sauvegarder les modifications
  await this.save();

  return { message: 'Paiement ajouté avec succès.', reglement: this.reglement };
};

// Méthode pour mettre à jour le statutReg
CommandeSchema.methods.updateStatutReg = function () {
  if (this.reglement === 0) {
    this.statutReg = 'Non paiement';
  } else if (this.reglement > 0 && this.reglement < this.total) {
    this.statutReg = 'Partiel';
  } else if (this.reglement >= this.total) {
    this.statutReg = 'Complet';
    this.statut = 'Terminée';
  }
};

module.exports = mongoose.model('Commande', CommandeSchema);