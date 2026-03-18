const express = require('express');
const router = express.Router();
const {
    createRental,
    getMyRentals, // Match exactly with controller
    getAllRentals  // Match exactly with controller
} = require('../controllers/rentalController');
const { protect, adminOnly } = require('../middleware/auth');

// --- User Routes ---
// POST /api/rentals -> Checkout
router.post('/', protect, createRental);

// GET /api/rentals/my-rentals -> User History
router.get('/my-rentals', protect, getMyRentals);

// --- Admin Routes ---
// GET /api/rentals -> View all rentals in system
router.get('/', protect, adminOnly, getAllRentals);

module.exports = router;