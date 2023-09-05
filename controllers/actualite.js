const Universite = require('../models/universite');
const Actualite = require('../models/actualite');
const mongoose = require('mongoose');
const logger = require("../utils/logger");


//const {role} = require('../role');

exports.createActualite = async(req, res, next) => {
   // const url = req.headers.origin  
   // const univ = await Universite.findOne({url:url})      

  const actualiteObject = req.body;
  delete actualiteObject._id;
  delete actualiteObject._userId;
  const actualite = new Actualite({
      ...actualiteObject,
      universite : req.auth.universite,
      auteur: req.auth.userId,
      //image: `${req.protocol}://${req.get('host')}/actualites/${req.file.filename}`      
  });
  
  actualite.save()
  .then(() => { 
    Universite.findOne({ _id: req.auth.universite}, (err, universite) => {
         
        if (universite) {
            universite.actualites.push(actualite);              
            universite.save()   
            res.status(201).json(actualite)       
        }        
    }) 
         
  })   
  .catch(error => { res.status(400).json( { error })}) 
}

exports.getAllActualite = async (req, res, next) => { 
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  Actualite.find({universite:univ._id,publie:true, approuve:true}).sort({created_at: -1}).populate("comments").then(
    (actualites) => {
      res.status(201).json(actualites);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  ); 
 };

exports.getAllActualiteAdm = async (req, res, next) => { 
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  Actualite.find({universite:univ._id}).sort({created_at: -1}).populate("comments").then(
    (actualites) => {
      res.status(201).json(actualites);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  ); 
 };

exports.getActualite = async (req, res, next) => { 
    
  Actualite.findOne({"_id":req.params.id}).populate("comments").then(
    (actualite) => {
      res.status(200).json(actualite);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };


 exports.updateActualite = (req, res, next) => {
    const actualiteObject = req.body;
    delete actualiteObject._id;
    delete actualiteObject._actualiteId;
    const actualite = new Actualite({
      _id: req.params.id,
      ...actualiteObject ,
      universite:req.auth.universite 
      });
    Actualite.updateOne({_id: req.params.id}, actualite).then(
      () => {
        res.status(201).json({
          message: 'actualite updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
 exports.updateApprouvePublie = (req, res, next) => {
    const actualiteObject = req.body;
    delete actualiteObject._id;
    delete actualiteObject._actualiteId;
    //delete actualiteObject.comments;
    const actualite = new Actualite({
      _id: req.params.id,
      ...actualiteObject     
      });
    Actualite.updateOne({_id: req.params.id}, actualite).then(
      () => {
        res.status(201).json({
          message: 'Actualite updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  

 exports.deleteActualite = (req, res, next) => {
  Actualite.findOne({ _id: req.params.id})
      .then(actualite => {
                  if(checkHaveChildren === false)
                    actualite.deleteOne({_id: req.params.id})
                      .then(() => { 
                        res.status(200).json({message: 'actualite supprimé !'})
                    }).catch(error => res.status(401).json({ error }));
                  else res.status(201).json({message: 'Suppression non autorisée !'})
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};


 