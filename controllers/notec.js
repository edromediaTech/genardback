const Notec = require('../models/notec');
const Matierec = require('../models/matierec');
const Inscription = require('../models/inscription');
const Universite = require('../models/universite');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");
const inscription = require('../models/inscription');


//const {role} = require('../role');

exports.createNotec = async(req, res, next) => {  
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})  
  const notecObject = req.body;   
  delete notecObject._id;
  delete notecObject._userId;
  const notec = new Notec({
      ...notecObject           
  });
  
  notec.save()
  .then(() => { 
    Inscription.findOne({ _id: notecObject.inscription }, (err, inscription) => {
      
      if (inscription){
          inscription.notecs.push(notec);              
          inscription.save()
          res.status(201).json(notec)            
      }
      
  }) 
       
  })   
  .catch(error => { res.status(400).json( { error })}) 
}


exports.deleteNotec = (req, res, next) => {
    Notec.findOne({ _id: req.params.id})
        .then(notec => {
                if (checkHaveChildren(notec)===false){
                     const inscription_id = notec.inscription
                     
                    notec.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Inscription.findOne({ _id:inscription_id }, (err, inscription) => {
                            if (inscription) {                                
                                inscription.notecs.splice(inscription.notecs.indexOf(notec),1);
                                inscription.save();                               
                            }
                        });
                          res.status(200).json({message: 'note concours supprimé !'})
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
  