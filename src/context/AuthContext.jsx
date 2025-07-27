import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/config'; // Adjust path to your Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // True initially while checking auth state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Set to false once Firebase checks the auth state
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Only render children once loading is false */}
            {loading && (
                <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
                    <p>Loading user session...</p> {/* Simple loading indicator */}
                </div>
            )}
        </AuthContext.Provider>
    );
};