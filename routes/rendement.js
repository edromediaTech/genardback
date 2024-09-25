const express = require('express');
const rendementController = require('../controllers/rendement');
const router = express.Router();

// Routes CRUD Rendement
router.post('/rendements', rendementController.createRendement);
router.put('/rendements/:id', rendementController.updateRendement);
router.delete('/rendements/:id', rendementController.deleteRendement);
router.get('/rendements/:id', rendementController.getRendement);

module.exports = router;
