const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    expediteur:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    destinataire:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sujet: { type: String, enum: ['Financement', 'Projet', 'Administration','Reglements','Global','Autres'], default: 'Global' },
    message: String,   
    date: Date,
    trash: Boolean,
    attachments:[],
    lue: Boolean,
   
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  
});

// Middleware pre-save
suggestionSchema.pre('save', function (next) {
    console.log('Suggestion ajouté/modifié:', this);
    next();
});

// Middleware pre-remove
suggestionSchema.pre('remove', function (next) {
    console.log('suggestion supprimé:', this);
    next();
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
