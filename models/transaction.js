const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    investisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Investisseur', required: true },
    typeTransaction: { type: String, enum: ['dépôt', 'retrait', 'réinvestissement'], required: true },
    montant: { type: Number, required: true },
    dateTransaction: { type: Date, default: Date.now },
    statut: { type: String, enum: ['en attente', 'confirmée', 'échouée'], default: 'en attente' },
    moyenPaiement: String
});

// Middleware pre-save
transactionSchema.pre('save', function (next) {
    console.log('Transaction ajoutée/modifiée:', this);
    next();
});

// Middleware pre-remove
transactionSchema.pre('remove', function (next) {
    console.log('Transaction supprimée:', this);
    next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
