const Universite = require('../models/universite');
const Faculte = require('../models/faculte');
const mongoose = require('mongoose');
const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");
const universite = require('../models/universite');

//const {role} = require('../role');

exports.createFaculte = async(req, res, next) => {
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  const faculteObject = req.body;
  delete faculteObject._id;
  delete faculteObject._userId;
  const faculte = new Faculte({
      ...faculteObject,
      "universite" : univ._id

      
  });

  faculte.save()
  .then(() => { 
    Universite.findOne({ _id: univ._id }, (err, universite) => {
          
        if (universite) {
            universite.facultes.push(faculte);              
            universite.save()
            
           
        }
        
    }) 
     res.status(201).json(faculte)
      
  })   

  .catch(error => { res.status(400).json( { error })})
 
}

exports.getAllFaculte = async (req, res, next) => { 
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  Faculte.find({universite:univ._id}).populate("etudiants").populate("options").populate("inscriptions").then(
    (facultes) => {
      res.status(200).json(facultes);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

// exports.getUniversiteFromUrl = async (req, res, next) => { 
//     const url = req.headers.origin  
//     const univ = await Universite.findOne({url:url})      

//   Universite.findOne({"url":url}).then(
//     (universite) => {
//       res.status(200).json(universite);
//     }
//   ).catch(
//     (error) => {
//       res.status(401).json({
//         error: error
//       });
//     }
//   ); 
//  };

//  exports.deleteUniversite = (req, res, next) => {
//   Universite.findOne({ _id: req.params.id})
//       .then(universite => {
//                   if(checkHaveChildren === false)
//                     universite.deleteOne({_id: req.params.id})
//                       .then(() => { 
//                         res.status(200).json({message: 'universite supprimé !'})
//                     }).catch(error => res.status(401).json({ error }));
//                   else res.status(201).json({message: 'Suppression non autorisée !'})
//               })       
      
//       .catch( error => {
//           res.status(500).json({ error });
//       });
// };


 