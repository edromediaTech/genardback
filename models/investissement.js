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
    rendements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rendement' }]
});

// Middleware pre-save
investissementSchema.pre('save', async function (next) {
    
    try {
        const investisseur = mongoose.model('Investisseur');
        const projet = mongoose.model('Projet');
        
        // Mise à jour de la catégorie pour ajouter le investissement
        await investisseur.findByIdAndUpdate(
          doc.investisseur, 
          { $addToSet: { investissements: doc } }, // Ajoute le investissement dans le tableau 'investissements' sans doublons
          { new: true, useFindAndModify: false } 
        );
        await projet.findByIdAndUpdate(
          doc.investissement, 
          { $addToSet: { investissements: doc } }, // Ajoute le projet dans le tableau 'projets' sans doublons
          { new: true, useFindAndModify: false } 
        );
        next();
      } catch (error) {
        next(error);
      }
    
});

// Middleware pre-remove
investissementSchema.pre('remove',async function (next) {
    try {
        // Obtenir la investissement à supprimer
        const investissement = await this.model.findOne(this.getFilter());
    
        if (!investissement) {
          return next(new Error('investissement non trouvée.'));
        }
    
        // Retirer la investissement du membre
        await mongoose.model('Investisseur').findByIdAndUpdate(investissement.investisseur, {
          $pull: { investissements: investissement._id }  // Supprime la investissement du tableau 'investissements'
        });
        await mongoose.model('Projet').findByIdAndUpdate(investissement.investisseur, {
          $pull: { investissements: investissement._id }  // Supprime la investissement du tableau 'investissements'
        });
    
        console.log(`La investissement avec l'ID ${investissement._id} a été retirée du membre.`);
        next(); // Continue la suppression de la investissement
      } catch (error) {
        next(error); // Passe l'erreur à la prochaine étape
      }
    
});

module.exports = mongoose.model('Investissement', investissementSchema);
