import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        adminCode: '' // New secret field
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // We send the adminCode to the backend
            await axios.post('http://localhost:5000/api/users/register', formData);
            toast.success('Registration successful!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 rounded-4 p-4">
                        <div className="card-body">
                            <h2 className="fw-bold mb-2 text-center">Create Account</h2>
                            <p className="text-muted mb-4 text-center">Join MovieRent to start your collection.</p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg bg-light border-0"
                                        placeholder="John Doe"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg bg-light border-0"
                                        placeholder="john@example.com"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small">Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg bg-light border-0"
                                        placeholder="••••••••"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Secret Admin Section */}
                                <div className="mt-4 pt-3 border-top">
                                    <label className="form-label fw-semibold small text-muted">Admin Invitation Code (Optional)</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        placeholder="Enter code for staff access"
                                        onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mt-4 mb-3 shadow-sm">
                                    Register
                                </button>
                            </form>

                            <div className="text-center">
                                <span className="text-muted small">Already have an account? </span>
                                <Link to="/login" className="text-primary small fw-bold text-decoration-none">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;