import { supabase } from './supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function EmailVerification() {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            console.log('Starting email verification process...');
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            console.log('Access token:', token);

            if (token) {
                try {
                    const { user, error } = await supabase.auth.api.updateUser(token, {});
                    console.log('supabase.auth.api.updateUser result:', { user, error });

                    if (error) {
                        console.error('Error verifying email:', error.message);
                        setMessage(error.message);
                    } else {
                        setMessage('Email verified successfully!');
                        console.log('Email verified. Redirecting to login...');
                        setTimeout(() => {
                            navigate('/login');
                            console.log('Redirection to login page executed.');
                        }, 2000); // Redirect after 2 seconds
                    }
                } catch (err) {
                    console.error('Unexpected error:', err);
                    setMessage('An unexpected error occurred.');
                }
            } else {
                setMessage('Invalid verification link.');
                console.log('Invalid verification link. No access token found.');
            }
        };

        verifyEmail();
    }, [location, navigate]);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
}



