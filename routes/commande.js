const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware d'authentification
const commandeController = require('../controllers/commande');

// Ajouter une commande
router.post('/', auth, commandeController.createCommande);

// Obtenir les produits vendus sur une période
router.get('/produits', commandeController.getProduitsParPeriode);

// Obtenir toutes les commandes
router.get('/', commandeController.getCommandes);

// Obtenir une commande par ID
router.get('/:id', commandeController.getCommandeById);

// Mettre à jour une commande
router.put('/:id', auth, commandeController.updateCommande);

// Supprimer une commande
router.delete('/:id', auth, commandeController.deleteCommande);

// Ajouter un article à une commande existante
router.post('/add', auth, commandeController.addToCommande);

// Ajouter un paiement à une commande
router.post('/paiement', auth, commandeController.ajouterPaiement);



// Obtenir les statistiques des règlements sur une période
router.get('/statistiques-reglements', commandeController.getStatistiquesReglements);

module.exports = router;