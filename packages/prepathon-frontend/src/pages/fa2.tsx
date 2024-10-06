import { Button } from '@/components/ui/button';
import { signIn } from '@hono/auth-js/react';
import {
    startAuthentication,
    startRegistration,
} from '@simplewebauthn/browser';
import { useLocation, useNavigate } from 'react-router-dom';

const FA2 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, password } = location.state || {};

    const isCreate = location.pathname === '/2fa-createKey';

    const createKey = async () => {
        const response = await fetch('api/auth/create-passkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const result = await response.json();
        const { options, user } = result;

        const authenticationResult = await startRegistration(options);

        const res = await fetch('/api/auth/verify-creation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
                email: email,
                cred: authenticationResult,
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to verify creation');
        }
        signIn('credentials', { email, password });
        navigate('/');
    };

    const verifyKey = async () => {
        const response = await fetch('/api/auth/login-challenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const challengeResult = await response.json();
        const { options } = challengeResult;

        const authenticationResult = await startAuthentication(options);

        const res = await fetch('/api/auth/verify-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                challenge: options.challenge,
                email: email,
                cred: authenticationResult,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            if (res.ok && data.success) {
                signIn('credentials', { email, password });
                navigate('/');
            } else {
                throw new Error(data.error);
            }
        } else {
            alert('Failed to login with passkey');
            throw new Error('Incorrect Passkey');
        }
    };

    return (
        <div className="mt-4 flex h-full items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-box_shadow dark:bg-[#181818a3]">
                <h1 className="mb-6 text-center text-3xl font-bold text-primary">
                    Setup Two Factor Authentication
                </h1>
                <div className="space-y-4">
                    <p className="text-center text-secondary">
                        Choose your preferred method
                    </p>
                    {isCreate ? (
                        <Button
                            className="h-10 w-full bg-button_primary text-white hover:bg-[#ff6b3d] dark:hover:bg-[#FF5126]"
                            onClick={() => createKey()}
                        >
                            Create Passkey
                        </Button>
                    ) : (
                        <Button
                            className="h-10 w-full bg-button_primary text-white hover:bg-[#ff6b3d] dark:hover:bg-[#FF5126]"
                            onClick={() => verifyKey()}
                        >
                            Verify with Passkey
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FA2;
