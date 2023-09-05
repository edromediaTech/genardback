const Universite = require('../models/universite');
const mongoose = require('mongoose');
const { checkHaveChildren } = require('../helper');


const logger = require("../utils/logger");

//const {role} = require('../role');

exports.createUniversite = (req, res, next) => {
  const universiteObject = req.body;
  delete universiteObject._id;
  delete universiteObject._userId;
  const universite = new Universite({
      ...universiteObject
      
  });

  universite.save()
  .then(() => { 
          res.status(201).json(universite)
      
  })   

  .catch(error => { res.status(400).json( { error })})
 
}

exports.getAllUniversite = (req, res, next) => { 
  Universite.find().then(
    (universites) => {
      res.status(200).json(universites);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

exports.getUniversiteFromUrl = async (req, res, next) => { 
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  Universite.findOne({"url":url}).populate("facultes").then(
    (universite) => {
      res.status(200).json(universite);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

 exports.deleteUniversite = (req, res, next) => {
  Universite.findOne({ _id: req.params.id})
      .then(universite => {
                  if(checkHaveChildren(universite) === false)
                    universite.deleteOne({_id: req.params.id})
                      .then(() => { 
                        res.status(200).json({message: 'universite supprimé !'})
                    }).catch(error => res.status(401).json({ error }));
                  else res.status(201).json({message: 'Suppression non autorisée !'})
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};


 