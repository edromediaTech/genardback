const mongoose = require('mongoose');

const clientUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
  
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    nationalId: {
        type: String,
        required: true,
        unique: true
    },
    address: {       
        city: { type: String, required: true },        
        country: { type: String, required: true }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
    
    },
    discount: {
        type: Number,
        default: 0, // Réduction en pourcentage (par défaut 0%)
        min: 0,     // Pas de réduction négative
        max: 100    // Maximum 100% de réduction
    }
}, { timestamps: true });

module.exports = mongoose.model('ClientUser', clientUserSchema);