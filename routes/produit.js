const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produit');

// Ajouter un produit
router.post('/', produitController.createProduit);

// Obtenir tous les produits
router.get('/', produitController.getProduits);

router.put('/quantite', produitController.updateQuantite);

router.get('/appro', produitController.getProduitsBoissonEnAlerte);

// Obtenir un produit par ID
router.get('/:id', produitController.getProduitById);

// Mettre à jour un produit
router.put('/:id', produitController.updateProduit);

// Supprimer un produit
router.delete('/:id', produitController.deleteProduit);

module.exports = router;
