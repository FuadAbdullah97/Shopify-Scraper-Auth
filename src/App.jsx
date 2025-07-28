import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page and context components
import AuthPage from './components/User/SignUp.jsx'; // Your login/signup page
import Dashboard from './Pages/Dashboard.jsx'; // Your main dashboard component
import {ThemeProvider} from "@/components/theme-provider.jsx";

// New imports for authentication
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// For Sonner Toasts (as per our previous conversation)
import { Toaster } from "@/components/ui/sonner";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" attribute="class">
        <BrowserRouter>
            {/* AuthProvider makes currentUser and loading available throughout the app */}
            <AuthProvider>
                <Routes>
                    {/* Public Route: Your authentication page */}
                    <Route path="/" element={<AuthPage />} />

                    {/* Protected Dashboard Route */}
                    {/* This route is now protected by the ProtectedRoute component */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Add any other routes that should be protected here */}
                        {/* <Route path="/settings" element={<SettingsPage />} /> */}
                    </Route>

                    {/* Optional: Catch-all for 404 Not Found */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </AuthProvider>
            <Toaster /> {/* Ensure Toaster is rendered here for global toasts */}
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;