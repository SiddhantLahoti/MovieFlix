const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a movie title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    genre: {
        type: String,
        required: [true, 'Please specify the genre'],
    },
    releaseYear: {
        type: Number,
    },
    rentalPrice: {
        type: Number,
        required: [true, 'Please add a rental price'],
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        min: 0,
    },
    posterImage: {
        type: String, // URL to the image (Cloudinary or local)
        default: 'no-photo.jpg',
    },
    isAdminFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);