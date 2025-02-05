const express = require('express');
const bookingController = require('../controllers/booking'); // Importez le contrôleur
const Booking = require('../models/booking'); // Importez le contrôleur
const router = express.Router();

// 1. Créer une réservation
router.post('/', bookingController.createBooking);

// 2. Récupérer toutes les réservations
router.get('/', bookingController.getAllBookings);

// Route pour récupérer les réservations pour une période donnée
router.get('/', async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Les dates de début et de fin sont requises' });
      }
  
      // Convertir les dates en objets Date
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Rechercher les réservations dont les dates chevauchent la période spécifiée
      const bookings = await Booking.find({
        $or: [
          { checkInDate: { $lte: end }, checkOutDate: { $gte: start } }, // Réservations qui se chevauchent
          { checkInDate: { $gte: start, $lte: end } }, // Réservations incluses dans la période
          { checkOutDate: { $gte: start, $lte: end } } // Réservations incluses dans la période
        ]
      })
        .populate('user') // Remplir les informations de l'utilisateur
        .populate('room'); // Remplir les informations de la chambre
  
      res.status(200).json({ message: 'Réservations récupérées avec succès', bookings });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
  });
  

// 3. Récupérer une réservation par ID
router.get('/:id', bookingController.getBookingById);

// 4. Mettre à jour une réservation
router.put('/:id', bookingController.updateBooking);

// 5. Supprimer une réservation
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;