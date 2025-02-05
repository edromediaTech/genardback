const express = require('express');
const roomController = require('../controllers/room'); // Importez le contrôleur
const router = express.Router();

// 1. Créer une chambre
router.post('/', roomController.createRoom);

// 2. Récupérer toutes les chambres
router.get('/', roomController.getAllRooms);

// 3. Récupérer une chambre par ID
router.get('/:id', roomController.getRoomById);

// 4. Mettre à jour une chambre
router.put('/:id', roomController.updateRoom);

// 5. Supprimer une chambre
router.delete('/:id', roomController.deleteRoom);

module.exports = router;