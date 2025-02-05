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
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true
        },
        nationalId: {
            type: String,
            required: false // Optionnel, selon les exigences légales
        }
    }]
}, { timestamps: true });

// Middleware pour calculer le totalPrice
bookingSchema.pre('save', async function (next) {
    try {
        const room = await mongoose.model('Room').findById(this.room);

        if (!room) {
            throw new Error('La chambre n\'existe pas');
        }

        const checkIn = new Date(this.checkInDate);
        const checkOut = new Date(this.checkOutDate);
        const timeDifference = checkOut - checkIn;
        const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (numberOfNights <= 0) {
            throw new Error('Les dates de check-in et check-out sont invalides');
        }

        this.totalPrice = numberOfNights * room.price;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Booking', bookingSchema);