const Universite = require('../models/universite');
const Mail = require('../models/mail');
const axios = require('axios');
const fs = require('fs');
const formData = require('form-data');


const nodemailer = require('nodemailer');
//const mailgun = require("mailgun-js");

//const DOMAIN = "https://api.mailgun.net/v3/upnch.univ.ht"
const DOMAIN = "https://api.mailgun.net/v3/upga.univ.ht"

// Configurez Mailgun avec vos clés d'API et votre domaine

      
exports.sendEmail = async(req, res, next) => {
  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})      
 
    let transporter = nodemailer.createTransport({        
      host: "smtp.mailgun.org", 
      port: 587, 
      auth: {        
      //user: "postmaster@upga.univ.ht", 
      user: univ.mail.user, 
      pass: univ.mail.pass, 
   
      }
      });   
      const atts = req.body.attachments
      
      const attachments =[]
      for (let i = 0; i<atts.length; i++){
        const attachment = new formData();
        attachment.append(atts[i].filename, fs.createReadStream(atts[i].path)); // Assurez-vous que le chemin d'accès est correct
        attachments.push(attachment)  
      }
      console.log(attachments)
   
   const mailData = {
        from: req.body.from,  // sender address
          to: req.body.to,   // list of receivers
          subject: req.body.subject,        
          html: req.body.html,
          attachments: attachments,
        };

        transporter.sendMail(mailData, function (err, info) {
            if(err){
             
              res.status(400).json({message:"error"})              
            }
            else{               
              const mail = new Mail({
                ...mailData,
               "universite" : univ._id                  
            }); 
             mail.save()
            .then(() => { 
              Universite.findOne({ _id: univ._id }, (err, universite) => {                    
                  if (universite) {
                      universite.mails.push(mail);              
                      universite.save()  
                      res.status(201).json({message:"Email sent"})                  
                  }                  
              }) 
              
            })             
            .catch(error => { res.status(400).json( { error })})             
            }
         });
    }

// -----------------------------------------------------

 exports.getmail = async(req, res, next) => {
  if(typeof req.body.To !== 'undefined'){
    const message = {created_at:req.body.Date,from:req.body.From, subject:req.body.Subject,to:req.body.To,html:req.body['body-html']}
    
    
    const url ='https://' + req.body.To.split('@')[1]
    const univ = await Universite.findOne({url:url})      
   
    const email = new Mail({
      ...message,
     "universite" : univ._id                  
  }); 
   email.save()
  .then(() => { 
    Universite.findOne({ _id: univ._id }, (err, universite) => {                    
        if (universite) {
            universite.mails.push(email);              
            universite.save()  
            res.status(200).json(email)                
        }                  
    })     
  })             
  .catch(error => { res.status(400).json( { error })})             
}
res.status(200).json('ok')   
}

exports.getAllReceiveMailUser = async (req, res, next) => { 
   const email = req.auth.email
  Mail.find({to:email}).then(
    (mails) => {
      res.status(200).json(mails);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

 exports.getAllMailUser = async (req, res, next) => { 

  const email = req.params.id
 
 // Mail.find({$or:{to:email, from:email}}).then(
 Mail.find({$or: [{to:{$in:[email]}},{ from: email }]}).then(
   (mails) => {
    
     res.status(200).json(mails);
   }
 ).catch(
   (error) => {
     res.status(401).json({
       error: error
     });
   }
 ); 
};


exports.getAllSendMailUser = async (req, res, next) => { 
   const email = req.auth.email
  Mail.find({from:email}).then(
    (mails) => {
      res.status(200).json(mails);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };


 
 

    // An array of attachments
    // attachments: [
    //     {
    //         filename: 'text notes.txt',
    //         path: 'notes.txt
    //     },
    //  ]
