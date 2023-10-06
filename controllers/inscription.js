const Inscription = require("../models/inscription");
const Faculte = require("../models/faculte");
const Universite = require("../models/universite");

const {
  codeFormat, checkHaveChildren, createCode,
} = require("../helper");
const logger = require("../utils/logger");
const { info } = require("../utils/logger");
const annee = require("../models/annee");

exports.createInscription = async (req, res, next) => {
 
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})      
  const inscriptionObject = req.body;
  delete inscriptionObject._id;
  delete inscriptionObject._userId;
 
  const inscription = new Inscription({
      ...inscriptionObject, 
      universite:univ._id   
         
  });
  
  inscription.save()
  .then(() => {
    Faculte.findOne({ _id: inscriptionObject.faculte }, (err, faculte) => {
     
      if (faculte){
          faculte.inscriptions.push(inscription);              
          faculte.save()
          res.status(201).json(inscription)          
      }
      
  }) 
    
  })
  .catch(error => { res.status(400).json( { error })})
 
}

  
  exports.deleteInscription = (req, res, next) => {
    Inscription.findOne({ _id: req.params.id})
        .then(inscription => {
                if (checkHaveChildren(inscription)===false){
                     const fac_id = inscription.faculte
                     const userId = inscription.user
                    inscription.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Faculte.findOne({ _id: fac_id }, (err, faculte) => {
                            if (faculte) {                                
                                faculte.inscriptions.splice(faculte.inscriptions.indexOf(inscription),1);
                                faculte.save();  
                                res.status(200).json({message: 'Inscription supprimée !'})                  
                            }
                        });
                         
                        })
                        .catch(error => res.status(401).json({ error }));
                      }
                  else{
                   
                    res.status(203).json({message: 'Suppression non autorisee !'})
                  }
                })       
        
        .catch( error => {
          logger.error(error.message);
            res.status(500).json({ error });
        });
  };
  
 
exports.updateInscription = (req, res, next) => {
  
    const inscriptionObject = req.body;
    delete inscriptionObject._id;
    const inscription = new Inscription({
      _id: req.params.id,
      ...inscriptionObject ,
      
      });
      
    Inscription.updateOne({_id: req.params.id}, inscription).then(
      () => {
          if(inscription.faculte !== inscription.lastFaculte){
            Faculte.findOne({ _id: inscriptionObject.lastFaculte }, (err, faculte) => {
            
              if (faculte) {     
                   delete inscription.lastFaculte;                         
                  faculte.inscriptions.splice(faculte.inscriptions.indexOf(inscription),1);
               
                  faculte.save();  
                  Faculte.findOne({ _id: inscriptionObject.faculte }, (err, faculte) => {
                   
                    if (faculte) {
                        faculte.inscriptions.push(inscription);  
                                
                        faculte.save()  
                       
                    }
                 });        
              }
          });
          }
          res.status(201).json({
            message: 'inscription updated successfully!'})
        })
      
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  

exports.getAllInscription = async (req, res, next) => { 
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})   
 
  Inscription.find({universite:univ.id,annee:req.params.id}).populate("notecs").then(
    (inscriptions) => {      
       res.status(201).json(inscriptions)
     })
  .catch(
          (error) => {
            logger.error(`405 || ${error} `);           
            res.status(405).json ({
              error: error
            });
          }
        );  
};

exports.getAllInsComp = async (req, res, next) => { 
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})   
  Inscription.find({universite:univ.id,annee:req.body.annee,complete:true}).then(
    (inscriptions) => {      
    
       res.status(201).json(inscriptions)
     })
  .catch(
          (error) => {
            logger.error(`405 || ${error} `);           
            res.status(405).json ({
              error: error
            });
          }
        );  
};

exports.getOptionInscription = async (req, res, next) => { 
  
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})   
  const option = req.params.id.split("|")[0]
  const annee = req.params.id.split("|")[1]
  
  Inscription.find({option:option,annee:annee,complete:true}).populate("notecs").then(
    (inscriptions) => {        
       res.status(201).json(inscriptions)
     })
  .catch(
          (error) => {
            logger.error(`405 || ${error} `);           
            res.status(405).json ({
              error: error
            });
          }
        );  
};