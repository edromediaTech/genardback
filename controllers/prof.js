const Prof = require("../models/prof");
const Universite = require("../models/universite");
const User = require("../models/user");

//const fs = require('fs');
const { role } = require("../role");
const {
  codeFormat, checkHaveChildren,
} = require("../helper");
const logger = require("../utils/logger");
const { info } = require("../utils/logger");
const universite = require("../models/universite");


exports.createProf = async (req, res, next) => {
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  const profObject = req.body;
  
  delete profObject._id;
  delete profObject._userId;
//  generer code prof____________-----------------------
  Prof.find().then(    
    (profs) => {
      
      //res.status(201).json({reponse: eleves,message: 'eleve enregistré !'})
// creer payload eleve
  const prof = new Prof({
  ...profObject,
  universite:univ._id,
  user: req.auth.userId   
});

prof.save()
  .then(() => { 
    Universite.findOne({ _id: univ._id }, (err, universite) => {
          
      if (universite) {
          universite.profs.push(prof);              
          universite.save() 
          
           // ============= update user

           User.findOne({_id: req.auth.userId}, (err, user) => 
           {
            if (user) {
              user.checInsc = true;              
              user.save()   
            }
          });

        // ====================fin 
       
         
      }      
  }) 
    res.status(201).json(prof)
  })
  .catch(error => { res.status(400).json(error)
    logger.error(error.message);
  })

      
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );

  }
  
  exports.deleteProf = (req, res, next) => {
    Prof.findOne({ _id: req.params.id})
        .then(prof => {
                if (checkHaveChildren(prof)===false){
                     const univ_id = prof.universite
                     const userId = prof.user
                    prof.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Universite.findOne({ _id: univ_id }, (err, universite) => {
                            if (universite) {                                
                                universite.profs.splice(universite.profs.indexOf(prof),1);
                                universite.save(); 
                                
                                // ============= update user

                                User.findOne({_id: userId }, (err, user) => 
                                {
                                if (user) {
                                  user.checInsc = false;              
                                  user.save()   
                                }
                              });

                            // ====================fin
                            }
                        });
                          res.status(200).json({message: 'prof supprimé !'})
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
  
 
exports.updateProf = (req, res, next) => {
    constprofbject = req.body;
    delete profObject._id;
    delete profObject._profId;
    const prof = new Prof({
      _id: req.params.id,
      ...profObject 
      });
    Prof.updateOne({_id: req.params.id}, prof).then(
      () => {
        res.status(201).json({
          message: 'prof updated successfully!'
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
  

exports.getAllProf = (req, res, next) => { 
 
  Prof.find({universite:req.auth.universite}).then(
    (profs) => {      
    
       res.status(201).json(profs)
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

exports.getProfById = (req, res, next) => { 
 
  Prof.findOne({_id:req.params.id}).populate('cours').then(
    (prof) => {      
    
       res.status(201).json(prof)
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

exports.getProfByUser = (req, res, next) => { 
 
  Prof.findOne({user:req.auth.userId}).populate('cours').then(
    (prof) => {      
    
       res.status(201).json(prof)
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

