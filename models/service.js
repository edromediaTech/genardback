const mongoose = require('mongoose');

// Schéma pour les services
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String, 
    trim: true
  },
  category: {
    type: String,
    enum: ['restauration', 'conference', 'evenement', 'autre'],
    default:"restauration",
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number, // Durée en heures (optionnel)
    default: null
  },
  capacity: {
    type: Number, // Capacité maximale (ex: nombre de personnes pour une salle de conférence)
    default: null
  },
  availability: {
    type: Boolean,
    default: true // Indique si le service est disponible ou non
  },
  images: [{
    type: String, // URL des images du service
    default: []
  }],
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);