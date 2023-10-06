const Faculte = require('../models/faculte');
const Option = require('../models/option');
const Matierec = require('../models/matierec');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");
const universite = require('../models/universite');

exports.createMatierec = async (req, res, next) => {
 
    // const url = req.headers.origin  
    // const univ = await Universite.findOne({url:url})      
    const matierecObject = req.body;
    delete matierecObject._id;
    delete matierecObject._userId;
   
    const matierec = new Matierec({
        ...matierecObject, 
      //  universite:univ._id           
    });
  
    matierec.save()
    .then(() => {  Option.findOne({ _id: matierecObject.option }, (err, option) => {          
      if (option) {
          option.matierecs.push(matierec);              
          option.save() 
          res.status(201).json(matierec)         
      }        
  }) 

      
    })
    .catch(error => { res.status(400).json( { error })})
   
  }

  exports.getAllMatierec = async (req, res, next) => { 
     
    Option.find({faculte:req.params.id}).populate('matierecs').then(
      (matierecs) => {
        res.status(200).json(matierecs);
      }
    ).catch(
      (error) => {
        res.status(401).json({
          error: error
        });
      }
    ); 
   };
 
exports.deleteMatierec = (req, res, next) => {
      Matierec.findOne({ _id: req.params.id})
          .then(matierec => {
                  if (checkHaveChildren(matierec)===false){
                       const fac_id = matierec.faculte
                       const userId = matierec.user
                      matierec.deleteOne({_id: req.params.id})
                          .then(() => { 
                            Option.findOne({ _id: fac_id }, (err, option) => {
                              if (option) {                                
                                  option.matierecs.splice(option.matierecs.indexOf(matierec),1);
                                  option.save();  
                                  res.status(200).json({message: 'matiere concours supprimée !'})                  
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
    