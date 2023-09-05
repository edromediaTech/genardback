const Contact = require('../models/contact');
const Universite = require('../models/universite');
const mongoose = require('mongoose');



const logger = require("../utils/logger");

//const {role} = require('../role');

exports.createContact = async (req, res, next) => {
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      
  const contactObject = req.body;
  delete contactObject._id;
  delete contactObject._userId;
  console.log(contactObject)
  const contact = new Contact({
      ...contactObject, 
      universite_id:univ._id
      
  });

  contact.save()
  .then(() => { 
    Universite.findOne({ _id: univ._id }, (err, universite) => {
        
      if (universite) {
          universite.contacts.push(contact);
          universite.save();
          res.status(201).json(contact)
      }
  });
    
  })
  .catch(error => { res.status(400).json( { error })})
 
}

exports.getAllContact = async(req, res, next) => { 
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})
  Contact.find({universite_id: univ._id}).then(
    (contacts) => {
      res.status(200).json(contacts);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

 exports.deleteContact = (req, res, next) => {
  Contact.findOne({ _id: req.params.id})
      .then(contact => {
                  const contact_id =  mongoose.Types.ObjectId(contact._id)
                  
                  
                  contact.deleteOne({_id: req.params.id})
                      .then(() => { 
                        Universite.findOne({ _id: universite_id }, (err, universite) => {
                          if (universite) {
                              
                              universite.contacts.splice(universite.contacts.indexOf(contact_id),1);
                              universite.save();
                              
                          }
                      });                      
                        
                        res.status(200).json({message: 'contact supprimé !'})
                    })
                      .catch(error => res.status(401).json({ error }));
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};


 