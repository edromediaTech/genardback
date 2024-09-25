const mongoose = require('mongoose');

const investissementSchema = new mongoose.Schema({
    investisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Investisseur', required: true },
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
    montantInvesti: { type: Number, required: true },
    dateInvestissement: { type: Date, default: Date.now },
    dateEcheance: Date,
    tauxRendement: Number,
    statut: { type: String, enum: ['en cours', 'terminé', 'annulé'], default: 'en cours' },
    retourSurInvestissement: Number,
    historiqueRendement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rendement' }]
});

// Middleware pre-save
investissementSchema.pre('save', function (next) {
    console.log('Investissement ajouté/modifié:', this);
    next();
});

// Middleware pre-remove
investissementSchema.pre('remove', function (next) {
    console.log('Investissement supprimé:', this);
    next();
});

module.exports = mongoose.model('Investissement', investissementSchema);
