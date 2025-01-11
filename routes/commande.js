const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commandeController = require('../controllers/commande');

// Ajouter une commande
router.post('/',  commandeController.createCommande);
router.get('/produits', commandeController.getProduitsParPeriode);

// Obtenir toutes les commandes
router.get('/', commandeController.getCommandes);

// Obtenir une commande par ID
router.get('/:id', commandeController.getCommandeById);

router.get('/produits', commandeController.getProduitsParPeriode);

// Mettre à jour une commande
router.put('/:id', commandeController.updateCommande);

router.post('/add',  commandeController.addToCommande);
// Supprimer une commande
router.delete('/:id', commandeController.deleteCommande);

module.exports = router;
