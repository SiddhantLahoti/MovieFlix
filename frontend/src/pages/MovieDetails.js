import React, { useState, useEffect, useContext } from 'react'; // Added useContext
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext); // Access auth status
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/movies/${id}`);
                setMovie(data);
            } catch (err) {
                toast.error("Could not load movie details");
            }
        };
        fetchMovie();
    }, [id]);

    const addToCart = () => {
        // --- SECURITY CHECK ---
        if (!isAuthenticated) {
            toast.error("Please login to rent movies!");
            return navigate('/login');
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const exists = cart.find((item) => item._id === movie._id);

        if (exists) return toast.error("Already in your cart!");

        cart.push(movie);
        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success(`${movie.title} added to cart!`);
        navigate('/cart');
    };

    if (!movie) return <div className="container py-5 text-center"><h5>Loading...</h5></div>;

    return (
        <div className="container py-5">
            <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none mb-4 p-0">
                ← Back to Movies
            </button>

            <div className="row g-4 p-4 bg-white rounded shadow-sm border">
                <div className="col-md-5">
                    <img
                        src={movie.posterImage}
                        alt={movie.title}
                        className="img-fluid rounded shadow-sm"
                        style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
                    />
                </div>

                <div className="col-md-7 d-flex flex-column">
                    <span className="badge bg-primary w-fit mb-2 text-uppercase" style={{ width: 'fit-content' }}>
                        {movie.genre}
                    </span>
                    <h1 className="display-4 fw-bold">{movie.title}</h1>
                    <p className="text-muted lead mb-4">{movie.description}</p>

                    <div className="mt-auto border-top pt-4">
                        <div className="d-flex align-items-baseline gap-2 mb-4">
                            <h2 className="text-primary fw-bold">${movie.rentalPrice}</h2>
                            <span className="text-muted">/ 7-day rental</span>
                        </div>

                        <button
                            onClick={addToCart}
                            disabled={movie.stock <= 0}
                            className={`btn btn-lg w-100 fw-bold py-3 ${movie.stock > 0 ? 'btn-primary' : 'btn-secondary disabled'}`}
                        >
                            {movie.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                        </button>
                        <p className="text-center text-muted small mt-2">
                            {movie.stock} copies currently available
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;