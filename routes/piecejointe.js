const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const fs = require('fs')
const multer = require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'pj');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null,  Date.now()+'_' + name);
    }
  });
  
const upload = multer({storage:storage})

router.post('/upload', upload.single('piecej'),(req, res) => {    
  console.log(`${req.protocol}://${req.get('host')}/pj/${req.file.filename}`)
    res.status(200).json({path: `${req.protocol}://${req.get('host')}/pj/${req.file.filename}`
    ,filename:req.file.filename,originalname:req.file.originalname})  
});

router.post('/delete',(req,res)=>{  
    //const filename = req.body.filename.split('/pj/')[1];    
    const filename = req.body.filename;    
    console.log(filename) 
    fs.unlink(`pj/${filename}`, () => {
    res.status(200).json({message: 'fichier supprimé !'})})            
});


module.exports = router;