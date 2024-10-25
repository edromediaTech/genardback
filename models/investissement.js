const mongoose = require('mongoose');

const investissementSchema = new mongoose.Schema({
    investisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Investisseur', required: true },
    projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true },
    montantInvesti: { type: Number, required: true },
    dateInvestissement: { type: Date, default: Date.now },
    dateEcheance: {type:Date, default:new Date('2034-01-01')},
    tauxRendement: {type:Number, default:0},
    statut: { type: String, enum: ['en cours', 'terminé', 'annulé'], default: 'en cours' },
    retourSurInvestissement: {type:Number, default:0},
    rendements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rendement' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  
});

// Middleware pre-save : Ajouter l'investissement dans les collections Investisseur et Projet
investissementSchema.pre('save', async function (next) {
    try {
        const Investisseur = mongoose.model('Investisseur');
        const Projet = mongoose.model('Projet');
        
        // Ajoute l'investissement au tableau 'investissements' de l'investisseur et du projet
        await Investisseur.findByIdAndUpdate(
            this.investisseur, 
            { $addToSet: { investissements: this._id } }, // Ajoute l'investissement sans doublons
            { new: true }
        );
        
        await Projet.findByIdAndUpdate(
            this.projet, 
            { $addToSet: { investissements: this._id } }, // Ajoute l'investissement sans doublons
            { new: true }
        );

        next();
    } catch (error) {
        next(error);
    }
});

// Middleware pre-remove : Supprimer l'investissement des collections Investisseur et Projet
investissementSchema.pre('remove', async function (next) {
    try {
        // Supprime l'investissement du tableau 'investissements' de l'investisseur et du projet
        await mongoose.model('Investisseur').findByIdAndUpdate(
            this.investisseur, 
            { $pull: { investissements: this._id } } // Retire l'investissement du tableau
        );
        
        await mongoose.model('Projet').findByIdAndUpdate(
            this.projet, 
            { $pull: { investissements: this._id } } // Retire l'investissement du tableau
        );

        next(); // Continue la suppression de l'investissement
    } catch (error) {
        next(error); // Passe l'erreur à la prochaine étape
    }
});

module.exports = mongoose.model('Investissement', investissementSchema);
