const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
    nomProjet: { type: String, required: true },
    description: String,
    montantNecessaire: { type: Number, required: true },
    montantCollecte: { type: Number, default: 0 },
    dateDebut: Date,
    dateFin: Date,
    tauxRendement: Number,
    risque: { type: String, enum: ['faible', 'modéré', 'élevé'], default: 'modéré' },
    statut: { type: String, enum: ['ouvert', 'fermé', 'financé'], default: 'ouvert' },
    investissements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investissement' }]
});

// Middleware pre-save
projetSchema.pre('save', function (next) {
    console.log('Projet ajouté/modifié:', this);
    next();
});

// Middleware pre-remove
projetSchema.pre('remove', function (next) {
    console.log('Projet supprimé:', this);
    next();
});

module.exports = mongoose.model('Projet', projetSchema);
