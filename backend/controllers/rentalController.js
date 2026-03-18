const Rental = require('../models/Rental');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');

exports.createRental = async (req, res) => {
    const { movies, totalAmount } = req.body;

    // Start a MongoDB Session for Transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const rental = await Rental.create([{
            user: req.user.id,
            rentedMovies: movies.map(m => ({
                title: m.title,
                rentalPrice: m.rentalPrice,
                movieId: m._id
            })),
            totalAmount
        }], { session });

        // Atomic stock update
        for (let item of movies) {
            const updatedMovie = await Movie.findOneAndUpdate(
                { _id: item._id, stock: { $gt: 0 } }, // Ensure stock > 0
                { $inc: { stock: -1 } },
                { session, new: true }
            );

            if (!updatedMovie) {
                throw new Error(`Movie ${item.title} is out of stock!`);
            }
        }

        await session.commitTransaction();
        res.status(201).json(rental[0]);
    } catch (err) {
        await session.abortTransaction();
        res.status(400).json({ message: err.message || 'Rental failed' });
    } finally {
        session.endSession();
    }
};

// @desc    Get logged in user rentals with Expiry Check
exports.getMyRentals = async (req, res) => {
    try {
        const rentals = await Rental.find({ user: req.user.id }).sort({ createdAt: -1 });

        const now = new Date();
        // Check each rental to see if it has expired
        for (let rental of rentals) {
            if (rental.expiryDate < now && rental.status === 'Rented') {
                rental.status = 'Expired';
                await rental.save();
            }
        }

        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all rentals (Admin Only)
exports.getAllRentals = async (req, res) => {
    try {
        // Populating user details so admin can see who rented what
        const rentals = await Rental.find({})
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};