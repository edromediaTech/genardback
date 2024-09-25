const express = require('express');
const projetController = require('../controllers/projet');
const router = express.Router();

// Routes CRUD Projet
router.post('/projets', projetController.createProjet);
router.put('/projets/:id', projetController.updateProjet);
router.delete('/projets/:id', projetController.deleteProjet);
router.get('/projets/:id', projetController.getProjet);

module.exports = router;
