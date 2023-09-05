const Option = require('../models/option');
const Faculte = require('../models/faculte');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");
const Universite = require('../models/universite');

//const {role} = require('../role');

exports.createOption = async(req, res, next) => {
 
  const optionObject = req.body;
  delete optionObject._id;
  delete optionObject._userId;
  const option = new Option({
      ...optionObject      
  });

  option.save()
  .then(() => { 
    Faculte.findOne({ _id: optionObject.faculte }, (err, faculte) => {
          
        if (faculte) {
            faculte.options.push(option);              
            faculte.save()          
        }        
    }) 
     res.status(201).json(option)      
  })   
  .catch(error => { 
    logger.error(`400 || ${error} `);
    res.status(400).json( { error })}) 
}


exports.getAllOption = async (req, res, next) => { 
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})    
  Faculte.find({universite:univ._id}).populate('options').then(
    (options) => {
      res.status(200).json(options);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };


 exports.deleteOption = (req, res, next) => {
    Option.findOne({ _id: req.params.id})
        .then(option => {
                if (checkHaveChildren(option)===false){
                     const fac_id = option.faculte
                     
                    option.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Faculte.findOne({ _id:fac_id }, (err, faculte) => {
                            if (faculte) {                                
                                faculte.options.splice(faculte.options.indexOf(option),1);
                                faculte.save();                               
                            }
                        });
                          res.status(200).json({message: 'option supprimé !'})
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
  
  