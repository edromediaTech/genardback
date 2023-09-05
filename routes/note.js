const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const noteCtrl = require('../controllers/note');

//router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth,  noteCtrl.createNote);
//router.patch('/:id',  contactCtrl.updateContact);
router.delete('/:id',auth, noteCtrl.deleteNote);
//router.get('/all/', courCtrl.getAllCour);


module.exports = router;