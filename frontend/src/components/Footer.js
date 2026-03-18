import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
            <div className="container text-center text-md-start">
                <div className="row text-center text-md-start">

                    {/* Brand Info */}
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold text-primary">🎬 MovieRent</h5>
                        <p className="small text-muted">
                            The world's premier digital movie rental platform. Rent the latest blockbusters and timeless classics instantly from any device.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 fw-bold">Browse</h6>
                        <p><Link to="/" className="text-white text-decoration-none small">Home</Link></p>
                        <p><Link to="/cart" className="text-white text-decoration-none small">My Cart</Link></p>
                        <p><Link to="/rentals" className="text-white text-decoration-none small">Rental History</Link></p>
                    </div>

                    {/* Help/Contact */}
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 fw-bold">Help Center</h6>
                        <p className="small text-muted mb-1">Support: help@movierent.com</p>
                        <p className="small text-muted mb-1">Phone: +1 800-MOVIES</p>
                        <p className="small text-muted">24/7 Rental Support</p>
                    </div>

                    {/* Location */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 fw-bold">Connect</h6>
                        <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-2">
                            <span className="badge bg-secondary">FB</span>
                            <span className="badge bg-secondary">IG</span>
                            <span className="badge bg-secondary">X</span>
                        </div>
                    </div>
                </div>

                <hr className="mb-4 mt-5 bg-secondary" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8 text-center text-md-start">
                        <p className="small text-muted">
                            © 2026 Copyright: <strong className="text-primary">MovieRent Inc.</strong> All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <div className="text-center text-md-end">
                            <ul className="list-unstyled list-inline mb-0">
                                <li className="list-inline-item small text-muted">Privacy Policy</li>
                                <li className="list-inline-item small text-muted mx-3">Terms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;