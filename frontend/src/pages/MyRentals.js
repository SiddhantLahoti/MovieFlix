import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyRentals = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('http://localhost:5000/api/rentals/my-rentals', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRentals(data);
            } catch (err) {
                toast.error("Failed to load rental history");
            } finally {
                setLoading(false);
            }
        };
        fetchRentals();
    }, []);

    if (loading) return <div className="container py-5 text-center"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4">My Rental Library</h2>

            {rentals.length === 0 ? (
                <div className="text-center py-5 border rounded bg-light">
                    <p className="text-muted">No movies found in your library.</p>
                    <a href="/" className="btn btn-primary">Browse Movies</a>
                </div>
            ) : (
                <div className="row g-4">
                    {rentals.map((rental) => (
                        <div key={rental._id} className="col-12">
                            <div className={`card shadow-sm border-0 border-start border-4 ${rental.status === 'Expired' ? 'border-danger' : 'border-success'}`}>
                                <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                                    <div>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className={`badge ${rental.status === 'Expired' ? 'bg-danger' : 'bg-success'}`}>
                                                {rental.status}
                                            </span>
                                            <small className="text-muted">Order ID: #{rental._id.slice(-6)}</small>
                                        </div>
                                        <div className="d-flex flex-wrap gap-2">
                                            {rental.rentedMovies.map((m, i) => (
                                                <h5 key={i} className="mb-0 fw-bold">🎬 {m.title}</h5>
                                            ))}
                                        </div>
                                        <p className="small text-muted mt-2 mb-0">
                                            Expires on: {new Date(rental.expiryDate).toLocaleDateString()} at {new Date(rental.expiryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>

                                    <div className="text-md-end mt-3 mt-md-0">
                                        <h4 className="fw-bold text-dark mb-2">${rental.totalAmount.toFixed(2)}</h4>
                                        {rental.status === 'Rented' ? (
                                            <button className="btn btn-primary px-4 shadow-sm">▶ Play Movie</button>
                                        ) : (
                                            <button className="btn btn-outline-secondary disabled px-4">Access Expired</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRentals;