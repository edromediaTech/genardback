const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-actu');
const actualiteCtrl = require('../controllers/actualite');
const fs = require('fs')
const multer = require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'actualites');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null,  Date.now() + name);
    }
  });
  

// const storage = multer.diskStorage({destination:function(req, file, cb){    
//     cb(null, 'actualites')
// }, filename: function(req, file, cb){    
//     let extArray = file.mimetype.split("/");
//     let extension = extArray[extArray.length - 1];
//     if(extension ==='image/jpg')
//        extension = 'jpg'    
//     if(extension ==='image/png')
//        extension = 'png'
//     if(extension ==='image/jpeg')
//        extension = 'jpg'
//     let name = file.originalname.split('.')[0]
    
//     //cb(null, file.fieldname +'_'+ Date.now() + '.' + extension)
//     cb(null, name +'_'+ Date.now() + '.' + extension)
// }, 
// })

const upload = multer({storage:storage})

router.get('/all/', actualiteCtrl.getAllActualite);
router.get('/all/adm/',auth, actualiteCtrl.getAllActualiteAdm);
router.get('/:id', auth, actualiteCtrl.getActualite);
router.get('/approuve', auth, actualiteCtrl.updateApprouvePublie);

router.post('/', auth, actualiteCtrl.createActualite);
router.patch('/:id', auth,  actualiteCtrl.updateActualite);
router.delete('/:id',auth, actualiteCtrl.deleteActualite);


router.post('/upload/', upload.single('imgfile'),(req, res) => {
    //const img = fs.readFileSync(req.file.path)

    //let extArray = req.file.mimetype.split("/");
    //let extension = extArray[extArray.length - 1];
    
    res.status(200).json({path: `${req.protocol}://${req.get('host')}/actualites/${req.file.filename}`
    ,filename:req.file.filename,originalname:req.file.originalname})
    // res.status(200).json(img)
});

router.post('/delimageactu',(req,res)=>{
    const filename = req.body.filename.split('/actualites/')[1];  
    //console.log(`devoirs/${filename}`)  
    fs.unlink(`actualites/${filename}`, () => {
        res.status(200).json({message: 'fichier supprimé !'})})            
});


module.exports = router;