const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  nom: { type: String, required: true,   unique: true },
  categorie: { type: String, enum: ['Boisson', 'Dessert',  'Jus naturel', 'Jus emboité', 
     'Produits laitier','Produits cosmetiques','Article de nettoyage','Fuits de mer',
    'Boisson Alcoolisé', 'Apéritif', 'Patisserie' ], required: true },
  prix: { type: Number, required: true },
  quantite: { type: Number, default: 0 },
  ramplacement: { type: Number, default: 0 },
  defectue: { type: Number, default: 0 },
  critique: { type: Number, default: 1 },
  alerte: { type: Number, default: 1 },
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }] // Liste des fournisseurs

}, { timestamps: true });

module.exports = mongoose.model('Produit', ProduitSchema);
