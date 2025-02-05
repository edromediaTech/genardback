const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['single', 'double', 'suite'],
        required: true
    },
    etage: {
        type: String,
        enum: ['1', '2', '3'],
        required: true,
        default: '1'
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);