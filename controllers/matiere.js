const Universite = require('../models/universite');
const Faculte = require('../models/faculte');
const Matiere = require('../models/matiere');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");
const universite = require('../models/universite');

//const {role} = require('../role');

exports.createMatiere = async(req, res, next) => { 
  const matiereObject = req.body;
  delete matiereObject._id;
  delete matiereObject._userId;
  const matiere = new Matiere({
      ...matiereObject      
  });

  matiere.save()
  .then(() => { 
    Faculte.findOne({ _id: matiereObject.faculte }, (err, faculte) => {          
        if (faculte) {
            faculte.matieres.push(matiere);              
            faculte.save()          
        }        
    }) 
     res.status(201).json(matiere)      
  })   
  .catch(error => { 
    logger.error(`400 || ${error} `);
    res.status(400).json( { error })}) 
}


exports.getAllMatiere = async (req, res, next) => { 
    Faculte.find({universite:req.auth.universite}).populate('matieres').then(
    (matieres) => {
      res.status(200).json(matieres);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };


 exports.deleteMatiere = (req, res, next) => {
    Matiere.findOne({ _id: req.params.id})
        .then(matiere => {
                if (checkHaveChildren(matiere)===false){
                     const fac_id = matiere.faculte
                     
                    matiere.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Faculte.findOne({ _id:fac_id }, (err, faculte) => {
                            if (faculte) {                                
                                faculte.matieres.splice(faculte.matieres.indexOf(matiere),1);
                                faculte.save();                               
                            }
                        });
                          res.status(200).json({message: 'matiere supprimé !'})
                        })
                        .catch(error => res.status(401).json({ error }));
                      }
                  else{
                    console.log('Suppression non autorisee !') 
                    res.status(203).json({message: 'Suppression non autorisee !'})
                  }
                })       
        
        .catch( error => {
          logger.error(error.message);
            res.status(500).json({ error });
        });
  };
  
  