const mongoose = require('mongoose');

const AchatSchema = new mongoose.Schema({
  fournisseur: {    type: String,    required: true,  },
  produitId: {    type: mongoose.Schema.Types.ObjectId,    ref: 'Produit',    required: true, },
  quantite: {    type: Number,    required: true,    min: 0,  },
  prix: {    type: Number,    required: true,    min: 0,  },
  date: {    type: Date,    default: Date.now,  },
  versement: {    type: Number,    required: true,    min: 0,  },
  reglement: {    type: String,    enum: ['total', 'partiel'],    required: true,  },
  livraison: {    type: String,    enum: ['partiel', 'nonlivre', 'total'],    required: true,  },
 
},{ timestamps: true } );

// Middleware pour mettre à jour la quantité du produit après la création d'un achat
AchatSchema.post('save', async function (doc) {
  const Produit = mongoose.model('Produit');
  const produit = await Produit.findById(doc.produitId);

  if (produit) {
    produit.quantite += doc.quantite; // Augmenter la quantité du produit
    await produit.save();
  }
});

// Middleware pour mettre à jour la quantité du produit après la suppression d'un achat
AchatSchema.post('findOneAndDelete', async function (doc) {
  const Produit = mongoose.model('Produit');
  const produit = await Produit.findById(doc.produitId);

  if (produit) {
    produit.quantite -= doc.quantite; // Diminuer la quantité du produit
    await produit.save();
  }
});

// Middleware pour mettre à jour la quantité du produit après la modification d'un achat
AchatSchema.post('findOneAndUpdate', async function (doc) {
  const Produit = mongoose.model('Produit');
  const achat = await this.model.findOne(this.getQuery());

  if (achat) {
    const produit = await Produit.findById(achat.produitId);

    if (produit) {
      // Récupérer l'ancienne quantité et la nouvelle quantité
      const ancienneQuantite = achat.quantite;
      const nouvelleQuantite = this.getUpdate().$set.quantite || achat.quantite;

      // Mettre à jour la quantité du produit
      produit.quantite += nouvelleQuantite - ancienneQuantite;
      await produit.save();
    }
  }
});

const Achat = mongoose.model('Achat', AchatSchema);
module.exports = Achat;