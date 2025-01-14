const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const produitController = require('../controllers/produit');

// Ajouter un produit
router.post('/',auth, produitController.createProduit);

// Obtenir tous les produits
router.get('/', produitController.getProduits);

router.put('/quantite',auth, produitController.updateQuantite);

router.get('/appro', produitController.getProduitsBoissonEnAlerte);

// Obtenir un produit par ID
router.get('/:id', produitController.getProduitById);

// Mettre à jour un produit
router.put('/:id',auth, produitController.updateProduit);

// Supprimer un produit
router.delete('/:id', auth,produitController.deleteProduit);

module.exports = router;
