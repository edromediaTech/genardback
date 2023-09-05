const Note = require('../models/note');
const Cour = require('../models/cour');

const { checkHaveChildren } = require('../helper');

const logger = require("../utils/logger");


//const {role} = require('../role');

exports.createNote = async(req, res, next) => {  
  const noteObject = req.body;
  delete noteObject._id;
  delete noteObject._userId;
  const note = new Note({
      ...noteObject           
  });

  note.save()
  .then(() => { 
    Cour.findOne({ _id: noteObject.cour }, (err, cour) => {
          
        if (cour) {
            cour.notes.push(note);              
            cour.save()          
        }        
    }) 
     res.status(201).json(note)      
  })   
  .catch(error => { res.status(400).json( { error })}) 
}



 exports.deleteNote = (req, res, next) => {
    Note.findOne({ _id: req.params.id})
        .then(note => {
                if (checkHaveChildren(note)===false){
                     const cour_id = note.cour
                     
                    note.deleteOne({_id: req.params.id})
                        .then(() => { 
                          Cour.findOne({ _id:cour_id }, (err, cour) => {
                            if (cour) {                                
                                cour.notes.splice(cour.notes.indexOf(note),1);
                                cour.save();                               
                            }
                        });
                          res.status(200).json({message: 'note supprimé !'})
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
  