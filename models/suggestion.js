const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    expediteur: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
  
    sujet: { 
        type: String, 
        enum: ['Financement', 'Projet', 'Administration', 'Reglements', 'Global', 'Autres'], 
        default: 'Global' 
    },
    message: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    trash: { 
        type: Boolean, 
        default: false 
    },   
   
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware pour mettre à jour la date de mise à jour (updated_at) avant chaque sauvegarde
suggestionSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

// Middleware pour afficher les détails lors de la suppression
suggestionSchema.pre('remove', function (next) {
    console.log('Suggestion supprimée:', this);
    next();
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
