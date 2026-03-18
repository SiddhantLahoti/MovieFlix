import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <div className="card h-100 shadow-sm border-0">
            <img src={movie.posterImage} className="card-img-top" alt={movie.title} style={{ height: '350px', objectFit: 'cover' }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{movie.title}</h5>
                <p className="text-muted small mb-1">{movie.genre}</p>
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 mb-0 text-primary">${movie.rentalPrice}</span>
                        <span className={`badge ${movie.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                            {movie.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    <Link to={`/movie/${movie._id}`} className="btn btn-dark w-100">View Details</Link>
                </div>
            </div>
        </div>
    );
};
export default MovieCard;