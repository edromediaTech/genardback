const Room = require('../models/room');

// 1. Créer une nouvelle chambre
exports.createRoom = async (req, res) => {
    try {
        const { roomNumber, type, etage, price } = req.body;

        // Vérifiez si la chambre existe déjà
        const existingRoom = await Room.findOne({ roomNumber });
        if (existingRoom) {
            return res.status(400).json({ message: 'Une chambre avec ce numéro existe déjà' });
        }

        // Créer une nouvelle chambre
        const newRoom = new Room({ roomNumber, type, price });
        await newRoom.save();

        res.status(201).json({ message: 'Chambre créée avec succès', room: newRoom });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la chambre', error });
    }
};

// 2. Récupérer toutes les chambres
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({ message: 'Liste des chambres récupérée avec succès', rooms });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des chambres', error });
    }
};

// 3. Récupérer une chambre par ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }
        res.status(200).json({ message: 'Chambre récupérée avec succès', room });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la chambre', error });
    }
};

// 4. Mettre à jour une chambre
exports.updateRoom = async (req, res) => {
    try {
        const { roomNumber, type, price, etage, isAvailable } = req.body;

        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }

        // Mettez à jour les champs de la chambre
        room.roomNumber = roomNumber || room.roomNumber;
        room.type = type || room.type;
        room.price = price || room.price;
        room.etage = etage || room.etage;
        room.isAvailable = isAvailable !== undefined ? isAvailable : room.isAvailable;

        // Sauvegardez les modifications
        await room.save();

        res.status(200).json({ message: 'Chambre mise à jour avec succès', room });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la chambre', error });
    }
};

// 5. Supprimer une chambre
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Chambre non trouvée' });
        }

        await room.remove();
        res.status(200).json({ message: 'Chambre supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la chambre', error });
    }
};