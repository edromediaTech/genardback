const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const eleve = require('../middleware/eleve');
//const multer = require('../middleware/multer-config');
const contactCtrl = require('../controllers/contact');
router.post('/',   contactCtrl.createContact);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id', contactCtrl.deleteContact);
router.get('/all/', contactCtrl.getAllContact);


module.exports = router;