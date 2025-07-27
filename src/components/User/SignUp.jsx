import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form"; // Assuming this component exists
// Firebase Imports
import { auth } from "@/config/config.js";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // <--- NEW: Import useNavigate

// Import sonner for toasts
import { toast } from "sonner"; // <--- NEW: Import toast directly from sonner

// If AlertCircleIcon is not used elsewhere for errors, you can remove it
// import { AlertCircleIcon } from "lucide-react"; // Only if you still use custom Alert for errors

// We are replacing these custom Alert components with sonner toasts for consistency
// import {
//     Alert,
//     AlertDescription,
//     AlertTitle,
// } from "@/components/ui/alert";


export default function SignUp() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false); // <--- REMOVE: No longer need 'success' state for the alert
    const navigate = useNavigate(); // <--- NEW: Initialize useNavigate hook

    const handleGoogleLogIn = async (e) => {
        e.preventDefault();
        // console.log(import.meta.env.VITE_API_KEY); // Consider removing this in production
        setError(null);
        setLoading(true);
        // setSuccess(false); // <--- REMOVE: No longer need 'success' state

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // const user = result.user; // User object if needed
            // const isNewUser = result.additionalUserInfo.isNewUser; // Check if it's a new user

            // setSuccess(true); // <--- REMOVE: Use toast instead

            // <--- NEW: Show success toast and redirect
            toast.success("Login Successful", {
                description: "Redirecting to your Dashboard...",
                duration: 1500, // Show for 1.5 seconds before redirect
            });

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);

        } catch (error) {
            // --- ERROR BLOCK ---
            console.error('Error during Google Sign-in:', error.code, error.message);
            let errorMessage = 'Google Sign-in failed. Please try again.';

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'Sign-in cancelled by the user.';
                    break;
                case 'auth/cancelled-popup-request':
                    errorMessage = 'The sign-in popup was closed before completion. Please try again.';
                    break;
                case 'auth/auth-domain-config-required':
                    errorMessage = 'Authentication domain not configured. Please check Firebase console.';
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = 'Your domain is not authorized for Google Sign-in. Add it in Firebase console.';
                    break;
                case 'auth/web-storage-unsupported':
                    errorMessage = 'Third-party cookies or data might be blocked in your browser settings.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = 'An account with this email already exists using a different sign-in method. Please use that method to sign in.';
                    break;
                default:
                    errorMessage = `Sign-in error: ${error.message}`;
            }
            setError(errorMessage); // Still set error state if you want to display it locally (e.g. below the form)

            // <--- NEW: Show error toast for the user
            toast.error("Sign-in Failed", {
                description: errorMessage,
            });

        } finally {
            setLoading(false); // Always turn off loading state
        }
    };

    return (
        <>
            {/* <--- REMOVED: Old success alert block, now handled by sonner toast */}
            {/* {success && success === true ? (
                <div>
                    <Alert className="flex flex-row justify-center w-md absolute top-0 left-1/3 mt-2">
                        <CheckCircle2Icon />
                        <AlertTitle>Success! Redirecting to your Dashboard</AlertTitle>
                    </Alert>
                </div>
            ) : null} */}

            {/* <--- NEW: Display general errors below the form if needed, or rely solely on toasts */}
            {error && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-4 z-50 w-full max-w-sm px-4">
                    <Alert variant="destructive">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertTitle>Login Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            )}


            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <a href="#" className="flex items-center gap-2 self-center font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Acme Inc.
                    </a>
                    <LoginForm
                        handleGoogleLogInProp={handleGoogleLogIn}
                        isLoading={loading} // Pass loading state to LoginForm if it has its own login button
                        // You might also pass 'error' prop to LoginForm for display
                    />
                </div>
            </div>
        </>
    );
}