const express = require('express');
const router = express.Router();
const {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');
const { protect, adminOnly } = require('../middleware/auth');

// Public Routes
// @route   GET /api/movies
router.get('/', getMovies);

// @route   GET /api/movies/:id
router.get('/:id', getMovieById);

// Admin Protected Routes
// @route   POST /api/movies (Add a movie)
router.post('/', protect, adminOnly, addMovie);

// @route   PUT /api/movies/:id (Update a movie)
router.put('/:id', protect, adminOnly, updateMovie);

// @route   DELETE /api/movies/:id (Remove a movie)
router.delete('/:id', protect, adminOnly, deleteMovie);

module.exports = router;