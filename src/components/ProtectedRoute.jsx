import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path

const ProtectedRoute = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        // Show a loading indicator while Firebase is checking auth state
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
                <p>Checking authentication...</p>
            </div>
        );
    }

    // If not loading and no current user, redirect to login page
    if (!currentUser) {
        return <Navigate to="/" replace />; // 'replace' prevents going back to dashboard via browser back button
    }

    // If authenticated, render the nested route content
    return <Outlet />;
};

export default ProtectedRoute;