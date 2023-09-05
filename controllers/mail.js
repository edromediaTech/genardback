const Universite = require('../models/universite');
const Mail = require('../models/mail');
const axios = require('axios');


const nodemailer = require('nodemailer');
const mailgun = require("mailgun-js");
//const api_key = "b080e42beb8ab9cdefb4a273aae0bab2-2cc48b29-45bb2c03" //upnch
const api_key = "94ad3915760537975a72dced8edfa2bf-181449aa-6a0b5a9d" //upga
//const DOMAIN = "https://api.mailgun.net/v3/upnch.univ.ht"
const DOMAIN = "https://api.mailgun.net/v3/upga.univ.ht"


      
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
     // pass: "12494a38268c71b1462d08da6952e7b5-2cc48b29-3c6e95ef" //upnch
     // pass: "b809dc92eab11dec73fdf77d6af8d00a-2cc48b29-d74c77fa" //upga
     // pass: "5f017735ccd1635a52a12482acfb1567-5645b1f9-e8f1a4df" lemodele
      }
      });   
   const mailData = {
        from: req.body.from,  // sender address
          to: req.body.to,   // list of receivers
          subject: req.body.subject,        
          html: req.body.html,
        };

        transporter.sendMail(mailData, function (err, info) {
            if(err){
              console.log(err)
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
    console.log('mail ok')
    
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
