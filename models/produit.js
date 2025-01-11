const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  nom: { type: String, required: true,   unique: true },
  categorie: { type: String, enum: ['Plat', 'Boisson', 'Dessert'], required: true },
  prix: { type: Number, required: true },
  quantite: { type: Number, default: 0 },
  ramplacement: { type: Number, default: 0 },
  defectue: { type: Number, default: 0 },
  critique: { type: Number, default: 1 },
  alerte: { type: Number, default: 1 },

}, { timestamps: true });

module.exports = mongoose.model('Produit', ProduitSchema);
