const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Matierec = require('../models/matierec');
const Inscription = require('../models/inscription');



const notecSchema = mongoose.Schema({
  valeur:{ type: Number, required: true},
  annee:{ type: String, required: true},  
  matierec:{type:mongoose.Schema.Types.ObjectId,ref:"Matierec"},
  inscription:{type:mongoose.Schema.Types.ObjectId,ref:"Inscription"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

notecSchema.post('save', async function (doc,next) {
    await Inscription.update({ _id: doc.inscription._id }, { $push: { notecs: doc._id } })
    return next();
});

notecSchema.plugin(uniqueValidator);
notecSchema.index({ "matierec":1,"annee":1,"inscription":1}, { unique: true });

module.exports = mongoose.model('Notec', notecSchema);