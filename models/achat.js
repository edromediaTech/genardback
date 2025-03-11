const mongoose = require('mongoose');

const AchatSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  articles: [
    {
      produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
      quantite: { type: Number, required: true, min: 1 },
      unitPrice: { type: Number, required: true }, // Prix unitaire au moment de l'achat
      subtotal: { type: Number, required: true } // Calculé automatiquement
    }
  ],
  totalAmount: { type: Number, default: 0 }, // Calculé automatiquement
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


AchatSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const achat = await this.model.findOne(this.getQuery());
    if (achat) {
      this.options.ancienneQuantite = achat.quantite; // Stocke l'ancienne quantité dans les options
    }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'ancienne quantité :", error);
  }
  next();
});

AchatSchema.post('findOneAndUpdate', async function (doc) {
  if (!doc) return; // Vérifier si l'achat existe

  const Produit = mongoose.model('Produit');

  try {
    // Trouver l'achat mis à jour
    const achat = await this.model.findOne(this.getQuery());
    if (!achat) return;

    // Récupérer le produit associé
    const produit = await Produit.findById(achat.produitId);
    if (!produit) return;

    // Récupérer l'ancienne et la nouvelle quantité
    const ancienneQuantite = this.options.ancienneQuantite || 0; // Récupère l'ancienne quantité des options
    const nouvelleQuantite = this.getUpdate().$set?.quantite || achat.quantite;

  
    if (nouvelleQuantite !== ancienneQuantite) {
      produit.quantite += (nouvelleQuantite - ancienneQuantite);
      await produit.save();
      
    }
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du stock du produit :", error);
  }
});

// Middleware après un achat ou une mise à jour
AchatSchema.post(['save', 'findOneAndUpdate'], async function (doc) {
  if (!doc || !doc.supplier) return;

  try {
    // Rechercher le fournisseur
    //const supplier = await mongoose.Model('Supplier').findById(doc.supplier);
    const supplier = await mongoose.model('Supplier').findOne({ _id:doc.supplier});
    if (!supplier) return;

    // Calcul de la dette si applicable
    if (doc.reglement === "partiel" || doc.totalAmount > doc.versement) {
      supplier.totalDebt = doc.totalAmount - doc.versement;
    } else {
      supplier.totalDebt = 0; // Remise à zéro si la dette est réglée
    }

    await supplier.save();
    console.log(`✅ TotalDebt mis à jour : ${supplier.totalDebt}`);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de la dette du fournisseur :", error);
  }
});

AchatSchema.pre('save', function (next) {
  if (this.versement < this.totalAmount) {
    this.reglement = "partiel";
  } else {
    this.reglement = "total";
  }

  next();
});


const Achat = mongoose.model('Achat', AchatSchema);
module.exports = Achat;