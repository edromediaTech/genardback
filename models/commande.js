const mongoose = require('mongoose');
const Produit = require('./produit'); // Assurez-vous que le modèle Produit est correctement défini.

const CommandeSchema = new mongoose.Schema({
  client: { type: String, required: true },
  date:{type:Date, default: Date.now},
  articles: [{
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
    quantite: { type: Number, default: 1 },
  }],
  statut: { 
    type: String, 
    enum: ['En attente', 'En préparation', 'Servie', 'Terminée'], 
    default: 'En attente',
  },
  total: { type: Number, required: true },
  serveur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

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

  await this.save();
};

module.exports = mongoose.model('Commande', CommandeSchema);
