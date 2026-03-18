const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rentedMovies: [
        {
            title: String,
            rentalPrice: Number,
            movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    rentalDate: {
        type: Date,
        default: Date.now
    },
    // Automatically sets expiry to 7 days from the moment of rental
    expiryDate: {
        type: Date,
        default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000)
    },
    status: {
        type: String,
        enum: ['Rented', 'Expired'],
        default: 'Rented'
    }
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema, 'rentals');