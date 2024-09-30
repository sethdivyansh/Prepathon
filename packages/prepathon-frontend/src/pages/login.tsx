import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function LoginPage() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div
            className={`flex min-h-screen items-center justify-center ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'}`}
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
                    Login
                </h1>

                <p
                    className={`mb-4 text-center ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}
                >
                    Don’t have an account?{' '}
                    <span className="cursor-pointer text-orange-500 hover:underline">
                        Sign up
                    </span>
                </p>

                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        className={`w-full ${darkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-black'} rounded-lg`}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className={`w-full ${darkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-black'} rounded-lg`}
                    />

                    <div className="text-right">
                        <button className="text-sm text-orange-500 hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    <Button className="w-full rounded-lg bg-orange-500 text-white hover:bg-orange-600">
                        Sign in
                    </Button>

                    <div className="mt-4 text-center text-sm">
                        <p
                            className={`${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}
                        >
                            OR
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        <Button className="w-full rounded-lg bg-white text-gray-900 hover:bg-gray-200">
                            <img
                                src="https://img.icons8.com/color/24/google-logo.png"
                                alt="Google Logo"
                                className="mr-2 inline"
                            />
                            Sign in with Google
                        </Button>

                        <Button className="w-full rounded-lg bg-white text-gray-900 hover:bg-gray-200">
                            <img
                                src="https://img.icons8.com/ios-glyphs/24/github.png"
                                alt="GitHub Logo"
                                className="mr-2 inline"
                            />
                            Sign in with GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
