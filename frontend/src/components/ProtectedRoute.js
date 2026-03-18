import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // 1. If user is not logged in at all
    if (!user) {
        // Redirect them to login, but save the page they were trying to go to (location)
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. If the page requires Admin role, but user is just a regular 'user'
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // 3. If everything is fine, show the page
    return children;
};

export default ProtectedRoute;