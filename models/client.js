const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  preferences: { type: String },
  historique: [{
    commande: { type: mongoose.Schema.Types.ObjectId, ref: 'Commande' },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
