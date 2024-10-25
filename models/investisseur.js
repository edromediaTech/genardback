const mongoose = require('mongoose');

const investisseurSchema = new mongoose.Schema({     
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    investissements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investissement' }],       
    typeInvestisseur: { type: String, enum: ['particulier', 'institutionnel'], default: 'particulier' },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  
});

// Middleware pre-save
investisseurSchema.pre('save', function (next) {
    console.log('Investisseur ajouté/modifié:', this);
    next();
});

// Middleware pre-remove
investisseurSchema.pre('remove', function (next) {
    console.log('Investisseur supprimé:', this);
    next();
});

module.exports = mongoose.model('Investisseur', investisseurSchema);
