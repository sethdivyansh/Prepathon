import { signIn, useSession } from '@hono/auth-js/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function LoginPage() {
    const { data: session } = useSession();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const theme = localStorage.getItem('theme') || 'light';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email: ', email);
        console.log('Password: ', password);
        try {
            signIn('credentials', { email, password });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    useEffect(() => {
        if (session?.user) return navigate('/computation');
    });

    return (
        <>
            <div className="h-full w-full p-2">
                <div className="flex h-full items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="shadow-box_shadow m-auto flex w-auto flex-col justify-items-start gap-5 rounded-xl p-8 dark:bg-[#181818a3] md:w-[26rem]"
                    >
                        <h1 className="text-4xl font-semibold text-primary md:text-[2.5rem]">
                            Login
                        </h1>
                        <p className="text-sm font-medium text-secondary">
                            Don't have an Account?{' '}
                            <span
                                className="text-sm text-[#FF5126] hover:cursor-pointer hover:text-[#ff6b3d] dark:text-[#ff6b3d] dark:hover:text-[#FF5126]"
                                onClick={() => navigate('/register')}
                            >
                                Create one
                            </span>
                        </p>
                        <Input
                            className="text-bold h-12 rounded-lg border-none leading-[13px] text-primary shadow-[0px_0px_10px_rgba(0,0,0,0.25)] dark:bg-[#1F1F1F] md:h-12"
                            placeholder="Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            className="h-12 rounded-lg border-none bg-[#F8F8F8] leading-[13px] text-primary shadow-[0px_0px_10px_rgba(0,0,0,0.25)] dark:bg-[#1F1F1F] md:h-12"
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            onClick={() => handleSubmit}
                            className="text-md bg-button_primary h-10 w-full rounded-lg font-semibold text-[#ffffff] hover:bg-[#ff6b3d] dark:hover:bg-[#FF5126] md:h-12"
                            type="submit"
                        >
                            Sign in
                        </Button>
                        <a
                            href="/forgotpassword"
                            className="text-button_primary -my-3 mr-4 text-right text-sm hover:underline"
                        >
                            Forgot Password?
                        </a>
                        <div className="inset-0 flex flex-row items-center justify-between gap-x-2">
                            <span className="w-full border-t border-gray-300 dark:border-[#505050]" />
                            <span className="dark:text-[#505050]">OR</span>
                            <span className="w-full border-t border-gray-300 dark:border-[#505050]" />
                        </div>
                        <div className="flex justify-between space-x-6">
                            <Button
                                className="shadow-box_shadow h-8 w-full rounded-lg bg-white text-black hover:bg-gray-100 dark:bg-[#1F1F1F] dark:text-[#828282] md:h-10"
                                onClick={() => signIn('google')}
                            >
                                <img
                                    src="https://img.icons8.com/color/24/google-logo.png"
                                    alt="GitHub Logo"
                                    className="mr-2 inline"
                                />
                                Sign in
                            </Button>
                            <Button
                                className="shadow-box_shadow h-8 w-full rounded-lg bg-white text-black hover:bg-gray-100 dark:bg-[#1F1F1F] dark:text-[#828282] md:h-10"
                                onClick={() => signIn('github')}
                            >
                                <img
                                    src={
                                        theme === 'dark'
                                            ? '/public/WhiteGithub.svg'
                                            : 'https://img.icons8.com/ios-glyphs/24/github.png'
                                    }
                                    alt="GitHub Logo"
                                    className="mr-2 inline"
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                    }}
                                />
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
