const mongoose = require('mongoose');

const rendementSchema = new mongoose.Schema({
    investissement: { type: mongoose.Schema.Types.ObjectId, ref: 'Investissement', required: true },
    dateEvaluation: { type: Date, default: Date.now },
    tauxRendementActuel: Number,
    montantRetour: Number
});

// Middleware pre-save
rendementSchema.pre('save',async function (next) {
    
    try {
        const investissement = mongoose.model('Investissement');
        
        // Mise à jour de la catégorie pour ajouter le investissement
        await investissement.findByIdAndUpdate(
          doc.investissement, 
          { $addToSet: { rendements: doc } }, // Ajoute le rendeement dans le tableau 'rendements' sans doublons
          { new: true, useFindAndModify: false } 
        );
        next();
      } catch (error) {
        next(error);
      }
    
});

// Middleware pre-remove
rendementSchema.pre('remove',async function (next) {
    try {
        // Obtenir la investissement à supprimer
        const rendement = await this.model.findOne(this.getFilter());
    
        if (!rendement) {
          return next(new Error('rendement non trouvée.'));
        }
    
        // Retirer la rendement du membre
        await mongoose.model('Investissement').findByIdAndUpdate(rendement.investissement, {
          $pull: { rendements: rendement._id }  // Supprime la rendement du tableau 'rendements'
        });
    
        console.log(`La rendement avec l'ID ${rendement._id} a été retirée du membre.`);
        next(); // Continue la suppression de la rendement
      } catch (error) {
        next(error); // Passe l'erreur à la prochaine étape
      }
});

module.exports = mongoose.model('Rendement', rendementSchema);
