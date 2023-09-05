//const {addNode,getPaysId, deleteNode, updateNode, getOne, getAll, getPathEcole} = require('../helper')
const logger = require('../utils/logger');
const Annee = require('../models/annee');
const Universite = require('../models/universite');
exports.createAnnee =async (req, res, next) => {
  const url = req.headers.origin   
  const univ = await Universite.findOne({url:url}) 
  const anneeObject = req.body;
  delete anneeObject._id;
  delete anneeObject._userId;
  const annee = new Annee({
      ...anneeObject,
      universite : univ._id
      // userId: req.auth.userId,
      // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  annee.save()
  .then(() => { 
    Universite.findOne({ _id: univ._id }, (err, universite) => {        
      if (universite) {
          universite.annees.push(annee);
          universite.save();
          res.status(201).json(annee)
      }
    });
  
  
  })
  .catch(error => { res.status(400).json( { error })})
};

exports.deleteAnnee = (req, res, next) => {
  Annee.findOne({ _id: req.params.id})
      .then(annee => {
                  const univ_id = annee.universite
                  annee.deleteOne({_id: req.params.id})
                      .then(() => { 
                        Universite.findOne({ _id: univ_id }, (err, universite) => {
                          if (universite) {
                              
                              universite.annees.splice(universite.annees.indexOf(annee),1);
                              universite.save();
                              
                              
                          }
                      });                      
                        
                        res.status(200).json({message: 'Année supprimé !'})
                      
                      })
                      .catch(error => res.status(401).json({ error }));
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};

 
// exports.createAnnee =  async (req, res, next) => {    
//   const AnneeObject = req.body;
//   Pays.findOne({_id:pays_id}).then(
//     (pays) => {
//   var pathEcole = getPathEcole(AnneeObject.parent_id, pays.index_pays)
//   idnode = {nom:AnneeObject.nom, rang:AnneeObject.rang}
//  result = addNode(pays, AnneeObject, AnneeObject.parent_id, "annee",{pays:pays.index_pays, ecole:pathEcole + '.index_ecole'}, idnode)
     
//  if(result.status === false)
//        res.status(400).json({ message: result.message})
//     else {        
//            Pays.updateOne({_id: pays_id}, result.data).then(
//         () => {   
//           res.status(201).json({  message: result.message, data:result.saveObj})
      
//         }
      
//       ).catch(
//         (error) => {
//           logger.error(`400 || ${error} `);           
//           res.status(400).json ({
//             error: error
//           });
//         }
//       );
    
//       }
//     }
//   )
  
//    .catch(
//       (error) => {
//         logger.error(`400 || ${error} `);           
//         res.status(400).json ({
//           error: error
//         });
//       }
//     );
  
// };
