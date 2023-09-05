const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const ressourceCtrl = require('../controllers/ressource');
const uploadController = require("../controllers/upload");

const fs = require('fs')
const multer = require("multer")
const storage = multer.diskStorage({destination:function(req, file, cb){ 
          
        cb(null, 'resources')
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    if(extension ==='vnd.openxmlformats-officedocument.wordprocessingml.document')
       extension = 'docx'    
    if(extension ==='vnd.openxmlformats-officedocument.presentationml.presentation')
       extension = 'pptx'
    let name = file.originalname.split('.')[0]
    
    //cb(null, file.fieldname +'_'+ Date.now() + '.' + extension)
    cb(null, name +'_'+ Date.now() + '.' + extension)
        // console.log(file)
        // cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage }); 

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  ressourceCtrl.createRessource);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id', ressourceCtrl.deleteRessource);
//router.get('/all/', courCtrl.getAllCour);
router.post("/upload-multiple", uploadController.multipleUpload);
router.post('/delresource',(req,res)=>{
    //const filename = req.body.filename.split('/resources/')[1];  
    fs.unlink(`resources/${req.body.filename}`, () => {
        res.status(200).json({message: 'fichier supprimé !'})})            
});



module.exports = router;