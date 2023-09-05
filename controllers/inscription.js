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

  
//   exports.deleteEtudiant = (req, res, next) => {
//     Etudiant.findOne({ _id: req.params.id})
//         .then(etudiant => {
//                 if (checkHaveChildren(etudiant)===false){
//                      const fac_id = etudiant.faculte
//                      const userId = etudiant.user
//                     etudiant.deleteOne({_id: req.params.id})
//                         .then(() => { 
//                           Faculte.findOne({ _id: fac_id }, (err, faculte) => {
//                             if (faculte) {                                
//                                 faculte.etudiants.splice(faculte.etudiants.indexOf(etudiant),1);
//                                 faculte.save();  
//                                 // ============= update user

//                                 User.findOne({_id: userId }, (err, user) => 
//                                 {
//                                 if (user) {
//                                   user.checInsc = false;              
//                                   user.save()   
//                                 }
//                               });

//                             // ====================fin                              
//                             }
//                         });
//                           res.status(200).json({message: 'Etudiant supprimé !'})
//                         })
//                         .catch(error => res.status(401).json({ error }));
//                       }
//                   else{
//                     console.log('Suppression non autorisee !') 
//                     res.status(203).json({message: 'Suppression non autorisee !'})
//                   }
//                 })       
        
//         .catch( error => {
//           logger.error(error.message);
//             res.status(500).json({ error });
//         });
//   };
  
 
// exports.updateEtudiant = (req, res, next) => {
//     constetudiantbject = req.body;
//     delete etudiantObject._id;
//     delete etudiantObject._etudiantId;
//     const etudiant = new Etudiant({
//       _id: req.params.id,
//       ...etudiantObject ,
//       universite_id:req.auth.universite_id  
//       });
//     Etudiant.updateOne({_id: req.params.id}, etudiant).then(
//       () => {
//         res.status(201).json({
//           message: 'etudiant updated successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
  

exports.getAllInscription = async (req, res, next) => { 
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})   
  Inscription.find({universite:univ.id,annee:req.body.annee}).then(
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

