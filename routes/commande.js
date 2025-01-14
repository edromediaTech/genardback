const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commandeController = require('../controllers/commande');

// Ajouter une commande
router.post('/',auth,  commandeController.createCommande);
router.get('/produits', commandeController.getProduitsParPeriode);

// Obtenir toutes les commandes
router.get('/', commandeController.getCommandes);

// Obtenir une commande par ID
router.get('/:id', commandeController.getCommandeById);

router.get('/produits', commandeController.getProduitsParPeriode);

// Mettre à jour une commande
router.put('/:id',auth, commandeController.updateCommande);

router.post('/add',  commandeController.addToCommande);
// Supprimer une commande
router.delete('/:id',auth, commandeController.deleteCommande);

module.exports = router;
