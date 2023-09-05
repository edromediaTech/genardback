const Ressource = require('../models/ressource');
const Cour = require('../models/cour');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");


//const {role} = require('../role');

exports.createRessource = async(req, res, next) => {  
  const ressourceObject = req.body;
  delete ressourceObject._id;
  delete ressourceObject._userId;
  const ressource = new Ressource({
      ...ressourceObject           
  });

  ressource.save()
  .then(() => { 
    Cour.findOne({ _id: ressourceObject.cour }, (err, cour) => {
          
        if (cour) {
            cour.ressources.push(ressource);              
            cour.save()          
        }        
    }) 
     res.status(201).json(ressource)      
  })   
  .catch(error => { res.status(400).json( { error })}) 
}



 exports.deleteRessource = (req, res, next) => {
    Ressource.findOne({ _id: req.params.id})
        .then(ressource => {
                if (checkHaveChildren(ressource)===false){
                     const cour_id = ressource.cour
                     
                    ressource.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Cour.findOne({ _id:cour_id }, (err, cour) => {
                            if (cour) {                                
                                cour.ressources.splice(cour.ressources.indexOf(ressource),1);
                                cour.save();                               
                            }
                        });
                          res.status(200).json({message: 'ressource supprimé !'})
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
  
  