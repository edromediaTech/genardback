const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  capacite: { type: Number, required: true },
  statut: { 
    type: String, 
    enum: ['Disponible', 'Occupée', 'En Nettoyage', 'Réservée'], 
    default: 'Disponible' 
  },
  localisation: { type: String, enum: ['Intérieur', 'Terrasse', 'Bar', 'VIP'], required: true }
}, { timestamps: true });

// Middleware pour valider le statut
TableSchema.pre('save', function (next) {
  if (this.capacite < 1) {
    return next(new Error('La capacité doit être au moins 1.'));
  }
  next();
});

module.exports = mongoose.model('Table', TableSchema);
