const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const devoirCtrl = require('../controllers/devoir');
const fs = require('fs')
const multer = require("multer")

const storage = multer.diskStorage({destination:function(req, file, cb){    
    cb(null, 'devoirs')
}, filename: function(req, file, cb){    
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    if(extension ==='vnd.openxmlformats-officedocument.wordprocessingml.document')
       extension = 'docx'    
    if(extension ==='vnd.openxmlformats-officedocument.presentationml.presentation')
       extension = 'pptx'
    let name = file.originalname.split('.')[0]
    
    //cb(null, file.fieldname +'_'+ Date.now() + '.' + extension)
    cb(null, name +'_'+ Date.now() + '.' + extension)
}, 
})

const upload = multer({storage:storage})
//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/',  auth, devoirCtrl.createDevoir);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id', devoirCtrl.deleteDevoir);
router.get('/:id', auth,devoirCtrl.getDevoirByCours);
router.post('/upload/', upload.single('devoir'),(req, res) => {
    //const img = fs.readFileSync(req.file.path)
    let extArray = req.file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    
    res.status(200).json({path: `${req.protocol}://${req.get('host')}/devoirs/${req.file.filename}`
    ,filename:req.file.filename,originalname:req.file.originalname})
    // res.status(200).json(img)
});

router.post('/deldevoir',(req,res)=>{
    const filename = req.body.filename.split('/devoirs/')[1];  
    //console.log(`devoirs/${filename}`)  
    fs.unlink(`devoirs/${filename}`, () => {
        res.status(200).json({message: 'fichier supprimé !'})})            
});

router.get('/download/:id',(req,res)=>{
    console.log('devoirs/'+req.params.id)
    res.download('devoirs/'+req.params.id, function (err) {
        if (err) {
          // Handle error, but keep in mind the response may be partially-sent
          // so check res.headersSent
          console.log(err)
        } else {
            console.log("download ok ....")
          // decrement a download credit, etc.
        }
      })
      

})

module.exports = router;