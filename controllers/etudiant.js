const Etudiant = require("../models/etudiant");
const Faculte = require("../models/faculte");
const User = require("../models/user");
//const fs = require('fs');
const { role } = require("../role");
const {
  codeFormat, checkHaveChildren,
} = require("../helper");
const logger = require("../utils/logger");
const { info } = require("../utils/logger");


exports.createEtudiant = (req, res, next) => {
  
  const etudiantObject = req.body;
  
  delete etudiantObject._id;
  delete etudiantObject._userId;
//  generer code etudiant____________-----------------------
  Etudiant.find().then(    
    (etudiants) => {
      
      var code = codeFormat(
        etudiantObject.nom.toUpperCase(),
        etudiantObject.prenom.substr(0, 1).toUpperCase() +
          etudiantObject.prenom.slice(1),
        etudiantObject.sexe,
        etudiants
      );
      
      //res.status(201).json({reponse: eleves,message: 'eleve enregistré !'})
// creer payload eleve
  const etudiant = new Etudiant({
  ...etudiantObject,  
  code:code,
  option:null,
  niveaux: [{niveau:etudiantObject.niveaux,annee:"2022-2023"}],
  user: req.auth.userId,     
});

etudiant.save()
  .then(() => { 
    Faculte.findOne({ _id: etudiant.faculte }, (err, faculte) => {
          
      if (faculte) {
          faculte.etudiants.push(etudiant);              
          faculte.save()   
          
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
    res.status(201).json(etudiant)
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
  
  
  exports.deleteEtudiant = (req, res, next) => {
    Etudiant.findOne({ _id: req.params.id})
        .then(etudiant => {
                if (checkHaveChildren(etudiant)===false){
                     const fac_id = etudiant.faculte
                     const userId = etudiant.user
                    etudiant.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Faculte.findOne({ _id: fac_id }, (err, faculte) => {
                            if (faculte) {                                
                                faculte.etudiants.splice(faculte.etudiants.indexOf(etudiant),1);
                                faculte.save();  
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
                          res.status(200).json({message: 'Etudiant supprimé !'})
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
  
 
exports.updateEtudiant = (req, res, next) => {
    constetudiantbject = req.body;
    delete etudiantObject._id;
    delete etudiantObject._etudiantId;
    const etudiant = new Etudiant({
      _id: req.params.id,
      ...etudiantObject ,
      universite_id:req.auth.universite_id  
      });
    Etudiant.updateOne({_id: req.params.id}, etudiant).then(
      () => {
        res.status(201).json({
          message: 'etudiant updated successfully!'
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
  

exports.getAllEtudiant = (req, res, next) => { 
 
  Etudiant.find({universite_id:req.auth.universite_id}).then(
    (etudiants) => {      
    
       res.status(201).json(etudiants)
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

