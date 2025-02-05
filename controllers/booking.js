const Booking = require('../models/booking');
const Room = require('../models/room');

// 1. Créer une nouvelle réservation
exports.createBooking = async (req, res) => {
    try {
        const { user, room, checkInDate, checkOutDate, occupants } = req.body;

        // Vérifiez si la chambre existe
        const existingRoom = await Room.findById(room);
        if (!existingRoom) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }

        // Vérifiez si la chambre est disponible
        if (!existingRoom.isAvailable) {
            return res.status(400).json({ message: 'La chambre n\'est pas disponible' });
        }

        // Vérifiez si les dates sont valides
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        if (checkIn >= checkOut) {
            return res.status(400).json({ message: 'Les dates de check-in et check-out sont invalides' });
        }

        // Vérifiez si des occupants sont fournis
        if (!occupants || occupants.length === 0) {
            return res.status(400).json({ message: 'Au moins un occupant doit être fourni' });
        }

        // Créer une nouvelle réservation
        const newBooking = new Booking({
            user,
            room,
            checkInDate,
            checkOutDate,
            occupants
        });

        await newBooking.save();

        // Marquer la chambre comme indisponible
        existingRoom.isAvailable = false;
        await existingRoom.save();

        res.status(201).json({ message: 'Réservation créée avec succès', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la réservation', error: error.message });
    }
};

// 2. Récupérer toutes les réservations
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user') // Remplir les informations de l'utilisateur
            .populate('room'); // Remplir les informations de la chambre
        res.status(200).json({ message: 'Liste des réservations récupérée avec succès', bookings });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
};

// 3. Récupérer une réservation par ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user')
            .populate('room');
        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation récupérée avec succès', booking });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error });
    }
};

// 4. Mettre à jour une réservation
exports.updateBooking = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, status, occupants } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        // Mettez à jour les champs de la réservation
        booking.checkInDate = checkInDate || booking.checkInDate;
        booking.checkOutDate = checkOutDate || booking.checkOutDate;
        booking.status = status || booking.status;
        booking.occupants = occupants || booking.occupants;

        // Sauvegardez les modifications
        await booking.save();

        res.status(200).json({ message: 'Réservation mise à jour avec succès', booking });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la réservation', error });
    }
};

// 5. Supprimer une réservation
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        // Marquer la chambre comme disponible
        const room = await Room.findById(booking.room);
        if (room) {
            room.isAvailable = true;
            await room.save();
        }

        await booking.remove();
        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error });
    }
};