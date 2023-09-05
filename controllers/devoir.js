const Devoir = require('../models/devoir');
const Cour = require('../models/cour');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");
const universite = require('../models/universite');

//const {role} = require('../role');

exports.createDevoir = async(req, res, next) => {  
  const devoirObject = req.body;
  delete devoirObject._id;
  delete devoirObject._userId;
  console.log(req.auth)
  const devoir = new Devoir({
      ...devoirObject,  
      annee:req.auth.annee         
  });

  devoir.save()
  .then(() => { 
    Cour.findOne({ _id: devoirObject.cour }, (err, cour) => {
          
        if (cour) {
            cour.devoirs.push(devoir);              
            cour.save()          
        }        
    }) 
     res.status(201).json(devoir)      
  })   
  .catch(error => { res.status(400).json( { error })}) 
}


exports.deleteDevoir = (req, res, next) => {
    Devoir.findOne({ _id: req.params.id})
        .then(devoir => {
                if (checkHaveChildren(devoir)===false){
                     const cour_id = devoir.cour
                     // delete file devoir
                     
                     fs.unlink(`devoirs/${devoir.document}`, () => {
                      devoir.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Cour.findOne({ _id:cour_id }, (err, cour) => {
                            if (cour) {                                
                                cour.devoirs.splice(cour.devoirs.indexOf(devoir),1);
                                cour.save();                               
                            }
                        });
                          res.status(200).json({message: 'devoir supprimé !'})
                        })
                        .catch(error => res.status(401).json({ error }));
                      })
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
  
exports.getDevoirByCours = (req, res, next) => {
    Devoir.find({ cour: req.params.id,universite :req.auth.universite,annee:req.auth.annee})
        .then(devoirs => {
          res.status(200).json(devoirs)
                
                })         
        .catch( error => {
          logger.error(error.message);
            res.status(500).json({ error });
        });
  };
  
  