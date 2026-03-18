import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Get cart count directly from localStorage to keep it reactive
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const handleLogout = () => {
        logout();
        toast.success("Logged out");
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/">🎬 MOVIERENT</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        {user ? (
                            <>
                                {/* Only show Cart to logged in users */}
                                <li className="nav-item">
                                    <Link className="nav-link position-relative" to="/cart">
                                        Cart 🛒
                                        {cart.length > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {cart.length}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/rentals">My Rentals</Link>
                                </li>
                                {user.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link text-warning fw-bold" to="/admin">Admin</Link>
                                    </li>
                                )}
                                <li className="nav-item ms-lg-3">
                                    <span className="text-light me-2 small">Hi, {user.name}</span>
                                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Logout</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item ms-lg-3">
                                <Link className="btn btn-primary btn-sm px-4" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;