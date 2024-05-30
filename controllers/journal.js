const Universite = require('../models/universite');
const Journal = require('../models/journal');
const mongoose = require('mongoose');
const logger = require("../utils/logger");


//const {role} = require('../role');

exports.createJournal = async(req, res, next) => {
   // const url = req.headers.origin  
   // const univ = await Universite.findOne({url:url})      

  const journalObject = req.body;  
  const journal = new Journal({
      ...journalObject,
      universite : req.auth.universite,
      
      //image: `${req.protocol}://${req.get('host')}/journals/${req.file.filename}`      
  });
  
  journal.save()
  .then(() => { 
    Universite.findOne({ _id: req.auth.universite}, (err, universite) => {
         
        if (universite) {
            universite.journals.push(journal);              
            universite.save()   
            res.status(201).json(journal)       
        }        
    })          
  })   
  .catch(error => { res.status(400).json( { error })}) 
}

exports.getAllJournal = async (req, res, next) => { 
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  Journal.find({universite:univ._id}).sort({created_at: -1}).then(
    (journals) => {
      res.status(201).json(journals);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  ); 
 };

exports.getAllJournalAdm = async (req, res, next) => { 
    const url = req.headers.origin  
    const univ = await Universite.findOne({url:url})      

  Journal.find({universite:univ._id}).sort({created_at: -1}).then(
    (journals) => {
      res.status(201).json(journals);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  ); 
 };

exports.getJournal = async (req, res, next) => { 
    
  Journal.findOne({"_id":req.params.id}).then(
    (journal) => {
      res.status(200).json(journal);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };


 exports.updateJournal = (req, res, next) => {
    const journalObject = req.body;
    delete journalObject._id;
    delete journalObject._journalId;
    const journal = new journal({
      _id: req.params.id,
      ...journalObject ,
      universite:req.auth.universite 
      });
    Journal.updateOne({_id: req.params.id}, journal).then(
      () => {
        res.status(201).json({
          message: 'journal updated successfully!'
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
  

 exports.deleteJournal = (req, res, next) => {
  Journal.findOne({ _id: req.params.id})
      .then(journal => {
                  if(checkHaveChildren === false)
                    journal.deleteOne({_id: req.params.id})
                      .then(() => { 
                        res.status(200).json({message: 'journal supprimé !'})
                    }).catch(error => res.status(401).json({ error }));
                  else res.status(201).json({message: 'Suppression non autorisée !'})
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};


 