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
  //  console("ok")
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})      
  const inscriptionObject = req.body;
  delete inscriptionObject._id;
  delete inscriptionObject._userId;
  console.log(inscriptionObject)
  const inscription = new Inscription({
      ...inscriptionObject, 
      universite:univ._id   
         
  });

  inscription.save()
  .then(() => {  
    res.status(201).json(inscription)
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
                    console.log('Suppression non autorisee !') 
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
    inscription.updateOne({_id: req.params.id}, inscription).then(
      () => {
        res.status(201).json({
          message: 'inscription updated successfully!'
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
  

exports.getAllInscription = async (req, res, next) => { 
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})   
 
  Inscription.find({universite:univ.id,annee:req.params.id}).then(
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

