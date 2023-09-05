const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Contact = require('../models/contact');
const User = require('../models/user');
const Annee = require('../models/annee');
const Inscription = require('../models/inscription');
const Faculte = require('../models/faculte');
const Prof = require('../models/prof');
const Atualite = require('../models/actualite');
const Mail = require('../models/mail');
const Administration = require('../models/administration');

const universiteSchema = mongoose.Schema({ 
        nom: { type: String, required: true, trim: true },
        coord: {long:Number, lat:Number},
        logo:{                        
            data: Buffer,
            contentType: String
        },    
        tel:[],
        email:String,
        url:{ type: String, required: true, trim: true },
        adresse:String,
        sigle:String,
        slogan:String,
        website:String,        
        date_fondation:Date,
        mail:{apikey:String, pass:String,user:String,domain:String},
        secteur:Boolean,
        actualites:[{type:mongoose.Schema.Types.ObjectId,ref:"Actualite"}],        
        contacts:[{type:mongoose.Schema.Types.ObjectId,ref:"Contact"}],        
        facultes:[{type:mongoose.Schema.Types.ObjectId,ref:"Faculte"}],        
        mails:[{type:mongoose.Schema.Types.ObjectId,ref:"Mail"}],        
        profs:[{type:mongoose.Schema.Types.ObjectId,ref:"Prof"}],  
        administrations:[{type:mongoose.Schema.Types.ObjectId,ref:"Administration"}],      
        inscriptions:[{type:mongoose.Schema.Types.ObjectId,ref:"Inscription"}],      
        annees:[{type:mongoose.Schema.Types.ObjectId,ref:"Annee"}],        
        users:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],        
        created_at: {type: Date, default: Date.now },
        updated_at: {type: Date, default: Date.now }
    });
    
    universiteSchema.plugin(uniqueValidator);
    universiteSchema.index({ "nom":1, "email":1, "url":1 }, { unique: true });

    module.exports = mongoose.model('Universite', universiteSchema);