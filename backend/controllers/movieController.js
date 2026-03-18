const Movie = require('../models/Movie');
const { movieSchema } = require('../utils/validation');

exports.getMovies = async (req, res) => {
    try {
        const { genre, maxPrice, page = 1, limit = 8 } = req.query;
        const query = {};

        if (genre) query.genre = genre;
        if (maxPrice) query.rentalPrice = { $lte: Number(maxPrice) };

        const skip = (page - 1) * limit;

        const movies = await Movie.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(skip);

        const total = await Movie.countDocuments(query);

        res.json({ movies, total, pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addMovie = async (req, res) => {
    const { error } = movieSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};



// @desc    Get single movie
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



// @desc    Delete movie (Admin)
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        await movie.deleteOne();
        res.json({ message: 'Movie removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


// @desc    Update a movie (Admin)
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};