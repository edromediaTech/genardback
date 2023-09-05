const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roleCtrl = require('../controllers/role');


//router.post('/', profCtrl.createProf);
//router.post('/many', auth, profCtrl.createprofMany);
// router.get('/:id', auth, profCtrl.getOneprof);
// router.patch('/:id', auth,secretaire, profCtrl.updateprof);
//router.delete('/:id',  profCtrl.deleteProf);
router.get('/all', roleCtrl.getAllRole);
module.exports = router;