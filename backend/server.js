const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// 1. Load Environment Variables
dotenv.config();

// 2. Initialize Express
const app = express();

// 3. Middlewares
app.use(express.json()); // Allows the server to accept JSON in req.body
app.use(cors());         // Allows your Frontend (localhost:3000) to talk to Backend (localhost:5000)

// 4. Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// 5. API Routes
// These map the URL prefix to the specific route files we created earlier
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));

// 6. Base Route (Health Check)
app.get('/', (req, res) => {
    res.send('Movie Rental API is running...');
});

// 7. Error Handling Middlewares
// These MUST be placed after all routes
app.use(notFound);
app.use(errorHandler);

// 8. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});