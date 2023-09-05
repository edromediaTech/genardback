const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const etudiantSchema = mongoose.Schema({
    nom:{type:String,required:true, trim:true},
    prenom:{type:String,required:true, trim:true},
    sexe:{type:Boolean, required:true},
    naissance: {type:Date, required:true}
    
  });
  
    
  
  etudiantSchema.plugin(uniqueValidator);
  etudiantSchema.index({ "nom": 1, "telephone":1 }, { unique: true });

  
export const etudiant =  model("Etudiant", etudiantSchema)