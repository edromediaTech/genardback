const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const profCtrl = require('../controllers/prof');


router.post('/',auth, profCtrl.createProf);
//router.post('/many', auth, profCtrl.createprofMany);
// router.get('/:id', auth, profCtrl.getOneprof);
// router.patch('/:id', auth,secretaire, profCtrl.updateprof);
router.delete('/:id',auth,  profCtrl.deleteProf);
router.get('/all',auth, profCtrl.getAllProf);
router.get('/:id',auth, profCtrl.getProfById);
router.get('/',auth, profCtrl.getProfByUser);
// router.get('/classe/:id',auth, eleveCtrl.getAllEleveByClasse);
// router.get('/salle/:id', auth, eleveCtrl.getEleveBySalle);
// router.get('/:id', auth, eleveCtrl.getOneEleve);
// router.get('/make/test', eleveCtrl.test);


module.exports = router;