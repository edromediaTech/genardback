const mongoose = require('mongoose');

const ServeurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  tablesAttribuees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  performances: {
    commandesServies: { type: Number, default: 0 },
    tempsMoyen: { type: Number, default: 0 } // en minutes
  }
}, { timestamps: true });

module.exports = mongoose.model('Serveur', ServeurSchema);
