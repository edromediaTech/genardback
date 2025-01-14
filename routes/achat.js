const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const achatController = require('../controllers/achat');

// Routes pour les achats
router.post('/',auth, achatController.createAchat); // Créer un achat
router.get('/', achatController.getAllAchats); // Lire tous les achats
router.get('/:id', achatController.getAchatById); // Lire un achat par son ID
router.put('/:id',auth,  achatController.updateAchat); // Mettre à jour un achat
router.delete('/:id',auth,  achatController.deleteAchat); // Supprimer un achat

module.exports = router;