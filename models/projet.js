const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
    nomProjet: { type: String, required: true },
    description: String,
    montantNecessaire: { type: Number, required: true },   
    dateDebut: Date,
    dateFin: Date,
    tauxRendement: {type:Number, default:0},
    risque: { type: String, enum: ['faible', 'modéré', 'élevé'], default: 'modéré' },
    statut: { type: String, enum: ['ouvert', 'fermé', 'financé'], default: 'ouvert' },
    investissements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investissement' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  
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
