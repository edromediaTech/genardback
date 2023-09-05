const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const etudiantCtrl = require('../controllers/etudiant');


router.post('/', auth,etudiantCtrl.createEtudiant);
//router.post('/many', auth, etudiantCtrl.createetudiantMany);
// router.get('/:id', auth, etudiantCtrl.getOneetudiant);
// router.patch('/:id', auth,secretaire, etudiantCtrl.updateEtudiant);
router.delete('/:id',auth,  etudiantCtrl.deleteEtudiant);
router.get('/all',auth, etudiantCtrl.getAllEtudiant);
// router.get('/classe/:id',auth, eleveCtrl.getAllEleveByClasse);
// router.get('/salle/:id', auth, eleveCtrl.getEleveBySalle);
// router.get('/:id', auth, eleveCtrl.getOneEleve);
// router.get('/make/test', eleveCtrl.test);


module.exports = router;