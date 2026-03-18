import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
            login(data);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow-sm border-0 rounded-4 p-4">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Welcome Back</h2>
                                <p className="text-muted">Login to manage your rentals</p>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg bg-light border-0"
                                        placeholder="name@example.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold small">Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg bg-light border-0"
                                        placeholder="••••••••"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mb-3">
                                    Sign In
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <span className="text-muted small">New to MovieRent? </span>
                                <Link to="/register" className="text-primary small fw-bold text-decoration-none">Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;