const Administration = require("../models/administration");
const Universite = require("../models/universite");
//const fs = require('fs');
const { role } = require("../role");
const {
  codeFormat, checkHaveChildren,
} = require("../helper");
const logger = require("../utils/logger");
const { info } = require("../utils/logger");
const universite = require("../models/universite");


exports.createAdministration = (req, res, next) => {
  
  const administrationObject = req.body;
  
  delete administrationObject._id;
  delete administrationObject._userId;
// creer payload eleve
  const administration = new Administration({
  ...administrationObject,  
  user: req.auth.userId,     
});

administration.save()
  .then(() => { 
    Universite.findOne({ _id: req.auth.userId }, (err, universite) => {
          
      if (universite) {
          universite.administrations.push(administration);              
          universite.save()    
         
      }      
  }) 
    res.status(201).json(administration)
  })
  .catch(error => { res.status(400).json(error)
    logger.error(error.message);
  })
      
    }
   
  
  exports.deleteAdministration = (req, res, next) => {
    Administration.findOne({ _id: req.params.id})
        .then(administration => {
                if (checkHaveChildren(administration)===false){
                                         
                    administration.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Universite.findOne({ _id: req.auth.universite_id }, (err, universite) => {
                            if (universite) {                                
                                universite.administrations.splice(universite.administrations.indexOf(administration),1);
                                universite.save();                               
                            }
                        });
                          res.status(200).json({message: 'Employe supprimé !'})
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
  
 
exports.updateAdministration = (req, res, next) => {
    const administrationObject = req.body;
    delete administrationObject._id;
    
    const administration = new Administration({
      _id: req.params.id,
      ...administrationObject ,
      universite_id:req.auth.universite_id  
      });
    administration.updateOne({_id: req.params.id}, administration).then(
      () => {
        res.status(201).json({
          message: 'administration updated successfully!'
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
  

exports.getAllAdministration = (req, res, next) => { 
 
  Administration.find({universite_id:req.auth.universite_id}).then(
    (administrations) => {      
    
       res.status(201).json(administrations)
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

