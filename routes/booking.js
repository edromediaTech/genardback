const express = require('express');
const bookingController = require('../controllers/booking'); // Importez le contrôleur
const router = express.Router();

// 1. Créer une réservation
router.post('/', bookingController.createBooking);

// 2. Récupérer toutes les réservations
router.get('/', bookingController.getAllBookings);

// 3. Récupérer une réservation par ID
router.get('/:id', bookingController.getBookingById);

// 4. Mettre à jour une réservation
router.put('/:id', bookingController.updateBooking);

// 5. Supprimer une réservation
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;