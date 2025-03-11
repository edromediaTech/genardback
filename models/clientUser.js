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
        max: 50    // Maximum 100% de réduction
    }
}, { timestamps: true });

/**
 * Met à jour la valeur du discount pour un client
 * @param {Number} newDiscount - Nouvelle valeur du discount (0-100)
 * @returns {Promise<ClientUser>} ClientUser mis à jour
 */
clientUserSchema.methods.updateDiscount = async function (newDiscount) {
    if (newDiscount < 0 || newDiscount > 50) {
        throw new Error("Le discount doit être compris entre 0 et 100%");
    }
    this.discount = newDiscount;
    return await this.save();
};

module.exports = mongoose.model('ClientUser', clientUserSchema);