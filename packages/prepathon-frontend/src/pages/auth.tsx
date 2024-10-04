import { signIn, useSession } from '@hono/auth-js/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function AuthPage() {
    const { data: session } = useSession();
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (session?.user) return navigate('/computation');
    });

    return (
        <div
            className={`flex min-h-screen items-center justify-center ${darkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`}
        >
            <div className="absolute right-4 top-4">
                <Button
                    onClick={() => setDarkMode(!darkMode)}
                    className="rounded-lg bg-neutral-700 px-4 py-2 text-white"
                >
                    {darkMode ? 'Enable Light Mode' : 'Enable Dark Mode'}
                </Button>
            </div>

            <div
                className={`w-full max-w-md rounded-lg p-8 ${darkMode ? 'bg-neutral-800' : 'bg-white'} ${!darkMode ? 'shadow-lg' : ''} transition-shadow duration-300 ease-in-out`}
            >
                <h1
                    className={`mb-6 text-center text-3xl font-bold ${darkMode ? 'text-white' : 'text-neutral-800'}`}
                >
                    Create New Account
                </h1>

                <p
                    className={`mb-4 text-center ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}
                >
                    Already have an account?{' '}
                    <span
                        className="cursor-pointer text-orange-500 hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>

                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        className={`w-full ${darkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-black'}`}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className={`w-full ${darkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-black'}`}
                    />
                    <Button
                        className="w-full rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                        onClick={() => navigate('/computation')}
                    >
                        Sign up
                    </Button>

                    <div className="mt-4 text-center text-sm">
                        <p
                            className={`${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}
                        >
                            OR
                        </p>
                    </div>

                    <Button
                        className="w-full rounded-lg bg-white text-gray-900 hover:bg-gray-200"
                        onClick={() => signIn('google')}
                    >
                        <img
                            src="https://img.icons8.com/color/24/google-logo.png"
                            alt="Google Logo"
                            className="mr-2 inline"
                        />
                        Sign Up with Google
                    </Button>

                    <Button
                        className="w-full rounded-lg bg-white text-gray-900 hover:bg-gray-200"
                        onClick={() => signIn('google')}
                    >
                        <img
                            src="https://img.icons8.com/ios-glyphs/24/github.png"
                            alt="GitHub Logo"
                            className="mr-2 inline"
                        />
                        Sign Up with GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
}
