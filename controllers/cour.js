const Matiere = require('../models/matiere');
const Cour = require('../models/cour');
const Prof = require('../models/prof');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");
const universite = require('../models/universite');

//const {role} = require('../role');

exports.createCour = (req, res, next) => {
  // const url = req.headers.origin  
  // const univ = await Universite.findOne({url:url})      

  const courObject = req.body;
  delete courObject._id;
  delete courObject._userId;
  const cour = new Cour({
      ...courObject,  
      annee:req.auth.annee         
  });

  cour.save()
  .then(() => { 
    Matiere.findOne({ _id: courObject.matiere }, (err, matiere) => {
          
        if (matiere) {
            matiere.cours.push(cour);              
            matiere.save()  
            Prof.findOne({ _id: courObject.prof }, (err, prof) => {
          
              if (prof) {
                  prof.cours.push(cour);              
                  prof.save()          
              }        
          })        
        }        
    }) 
     res.status(201).json(cour)      
  })   
  .catch(error => { res.status(400).json( { error })}) 
}


exports.getAllCour = async (req, res, next) => { 
   
  Cour.find({universite:req.auth.universite}).populate('matiere').then(
    (cours) => {
      res.status(200).json(cours);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

exports.getCourByUserProf = async (req, res, next) => { 

  Prof.findOne({user:req.auth.userId}).then(pro =>{

    Cour.find({prof:pro._id}).populate('matiere').populate('devoirs').populate('ressources').then(
      (cours) => {
        res.status(200).json(cours);
      }
    ).catch(
      (error) => {
        res.status(401).json({
          error: error
        });
      }
    );

  }).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  );

   
 };


 exports.deleteCour = (req, res, next) => {
    Cour.findOne({ _id: req.params.id})
        .then(cour => {
                if (checkHaveChildren(cour)===false){
                     const mat_id = cour.matiere
                     
                    cour.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Matiere.findOne({ _id:fac_id }, (err, matiere) => {
                            if (matiere) {                                
                                matiere.cours.splice(matiere.cours.indexOf(cour),1);
                                matiere.save();                               
                            }
                        });
                          res.status(200).json({message: 'cour supprimé !'})
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
  
  