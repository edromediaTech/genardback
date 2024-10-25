const express = require('express');
const projetController = require('../controllers/projet');
const router = express.Router();

// Routes CRUD Projet
router.post('/', projetController.createProjet);
router.put('/:id', projetController.updateProjet);
router.delete('/:id', projetController.deleteProjet);
router.get('/:id', projetController.getProjet);
router.get('/', projetController.getAllProjets);

module.exports = router;
