const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    investisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Investisseur', required: true },
    typeTransaction: { type: String, enum: ['dépôt', 'retrait', 'rétransaction'], required: true },
    montant: { type: Number, required: true },
    dateTransaction: { type: Date, default: Date.now },
    statut: { type: String, enum: ['en attente', 'confirmée', 'échouée'], default: 'en attente' },
    moyenPaiement: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  
});

// Middleware pre-save
transactionSchema.pre('save', async function (next) {
    
    try {
        const investisseur = mongoose.model('Investisseur');
        
        // Mise à jour de la catégorie pour ajouter le transaction
        await investisseur.findByIdAndUpdate(
          doc.investisseur, 
          { $addToSet: { transactions: doc } }, // Ajoute le transaction dans le tableau 'transactions' sans doublons
          { new: true, useFindAndModify: false } 
        );
        next();
      } catch (error) {
        next(error);
      }
    
});

// Middleware pre-remove
transactionSchema.pre('remove',async function (next) {
    try {
        // Obtenir la transaction à supprimer
        const transaction = await this.model.findOne(this.getFilter());
    
        if (!transaction) {
          return next(new Error('transaction non trouvée.'));
        }
    
        // Retirer la transaction du membre
        await mongoose.model('Investisseur').findByIdAndUpdate(transaction.investisseur, {
          $pull: { transactions: transaction._id }  // Supprime la transaction du tableau 'transactions'
        });
    
        console.log(`La transaction avec l'ID ${transaction._id} a été retirée du membre.`);
        next(); // Continue la suppression de la transaction
      } catch (error) {
        next(error); // Passe l'erreur à la prochaine étape
      }
});

module.exports = mongoose.model('Transaction', transactionSchema);
