const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientUser',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0 // Calculé automatiquement
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    occupants: [{
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        identity: {
            type: String
        },
        depot: {
            type: Number,
            default: 0
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            default: "male",
            required: true
        },
        nationalId: {
            type: String,
            default: "haitienne",
            required: false // Optionnel, selon les exigences légales
        }
    }]
}, { timestamps: true });

// Middleware pour calculer le totalPrice avec discount
bookingSchema.pre('save', async function (next) {
    try {
        const room = await mongoose.model('Room').findById(this.room);
        if (!room) {
            throw new Error('La chambre n\'existe pas');
        }

        const user = await mongoose.model('ClientUser').findById(this.user);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const checkIn = new Date(this.checkInDate);
        const checkOut = new Date(this.checkOutDate);
        const timeDifference = checkOut - checkIn;
        const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (numberOfNights <= 0) {
            throw new Error('Les dates de check-in et check-out sont invalides');
        }

        // Prix brut sans réduction
        const rawTotalPrice = numberOfNights * room.price;

        // Application du discount
        const discount = user.discount || 0; // En pourcentage
        const discountedAmount = (rawTotalPrice * discount) / 100;
        this.totalPrice = rawTotalPrice - discountedAmount;

        next();
    } catch (error) {
        next(error);
    }
});


// ✅ Méthode pour effectuer un dépôt
bookingSchema.statics.makeDeposit = async function (bookingId, depositAmount) {
    const booking = await this.findById(bookingId);
    if (!booking) {
        throw new Error("Réservation introuvable");
    }

    if (depositAmount <= 0) {
        throw new Error("Le montant du dépôt doit être positif");
    }

    const requiredDeposit = 0.6 * booking.totalPrice;
    const totalDepot = booking.occupants.reduce((sum, occupant) => sum + (occupant.depot || 0), 0) + depositAmount;

    if (totalDepot >= requiredDeposit) {
        booking.status = 'confirmed';
    }

    // Ajout du dépôt au premier occupant
    if (booking.occupants.length > 0) {
        booking.occupants[0].depot += depositAmount;
    } else {
        throw new Error("Aucun occupant enregistré");
    }

    await booking.save();
    return booking;
};

module.exports = mongoose.model('Booking', bookingSchema);
