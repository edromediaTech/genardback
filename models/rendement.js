const mongoose = require('mongoose');

const rendementSchema = new mongoose.Schema({
    investissement: { type: mongoose.Schema.Types.ObjectId, ref: 'Investissement', required: true },
    dateEvaluation: { type: Date, default: Date.now },
    tauxRendementActuel: Number,
    montantRetour: Number
});

// Middleware pre-save
rendementSchema.pre('save', function (next) {
    console.log('Rendement ajouté/modifié:', this);
    next();
});

// Middleware pre-remove
rendementSchema.pre('remove', function (next) {
    console.log('Rendement supprimé:', this);
    next();
});

module.exports = mongoose.model('Rendement', rendementSchema);
