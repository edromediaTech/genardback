const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Investisseur' }, // ou Projet
    typeDocument: { type: String, required: true },
    url: { type: String, required: true },
    dateAjout: { type: Date, default: Date.now }
});

// Middleware pre-save
documentSchema.pre('save', function (next) {
    console.log('Document ajouté/modifié:', this);
    next();
});

// Middleware pre-remove
documentSchema.pre('remove', function (next) {
    console.log('Document supprimé:', this);
    next();
});

module.exports = mongoose.model('Document', documentSchema);
