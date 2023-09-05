const Universite = require('../models/universite');
const Actualite = require('../models/actualite');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const logger = require("../utils/logger");

//const {role} = require('../role');

exports.createComment = async(req, res, next) => {
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})      

  const commentObject = req.body;
  delete commentObject._id;
  delete commentObject._userId;
  const comment = new Comment({
      ...commentObject      
  });
  console.log(commentObject.actualite)
  comment.save()
  .then(() => { 
    Actualite.findOne({ _id: commentObject.actualite }, (err, actualite) => {
          
        if (actualite) {
            actualite.comments.push(comment);              
            actualite.save()       
            res.status(201).json(comment)
        }       
    })       
  }) 
  .catch(error => { res.status(400).json( { error })})
 
}

exports.getAllCommentActu = async (req, res, next) => { 
    
  Actualite.find({_id: req.params.id}).populate("comments").then(
    (actualites) => {
      res.status(200).json(actualites);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };


 exports.updateComment = (req, res, next) => {
    const commentObject = req.body;
    delete commentObject._id;
    delete commentObject._commentId;
    const comment = new Comment({
      _id: req.params.id,
      ...commentObject ,
      universite_id:req.auth.universite_id  
      });
    Comment.updateOne({_id: req.params.id}, comment).then(
      () => {
        res.status(201).json({
          message: 'comment updated successfully!'
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
  

 exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id})
      .then(comment => {
                  if(checkHaveChildren === false)
                    comment.deleteOne({_id: req.params.id})
                      .then(() => { 
                        res.status(200).json({message: 'comment supprimé !'})
                    }).catch(error => res.status(401).json({ error }));
                  else res.status(201).json({message: 'Suppression non autorisée !'})
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};


 