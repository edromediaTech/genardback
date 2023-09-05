const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const clientSchema = mongoose.Schema({
    code:{  type: String, required:true, trim: true,unique:true },
    nom: {  type: String, required:true, trim: true },
    adresse: { type: String, trim: true },
    telephone: { type: String, required:true, trim: true },
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now }
  });
  clientSchema.plugin(uniqueValidator);
  clientSchema.index({ "nom": 1, "telephone":1 }, { unique: true });

  
export const Client =  model("Client", clientSchema)