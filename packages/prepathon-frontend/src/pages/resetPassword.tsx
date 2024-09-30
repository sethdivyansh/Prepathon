import { useSession } from '@hono/auth-js/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function ResetPassword() {
    const { data: session } = useSession();
    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const navigate = useNavigate();
    const [isMatch, setIsMatch] = React.useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (oldPass === newPass) {
            console.log('Old Password: ', oldPass);
            console.log('New Password   : ', newPass);

            setIsMatch(true);
        } else if (oldPass === '' || newPass === '') {
            setIsMatch(true);
        } else {
            setIsMatch(false);
        }
    };

    if (!session?.user)
        return (
            <>
                <div className="h-full w-full p-2">
                    <div className="flex h-full items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="m-auto flex w-96 flex-col justify-items-start gap-5 rounded-xl p-8 shadow-box_shadow dark:bg-[#181818a3]"
                        >
                            <h1 className="text-4xl font-semibold text-primary md:text-4xl">
                                Reset Password
                            </h1>
                            <Input
                                className={`text-bold h-12 rounded-lg leading-[13px] text-secondary shadow-[0px_0px_10px_rgba(0,0,0,0.25)] dark:bg-[#1F1F1F] md:h-12 ${!isMatch ? 'border-red-500 dark:border-red-300' : 'border-none'}`}
                                placeholder="Old Password"
                                type="password"
                                onChange={(e) => setOldPass(e.target.value)}
                            />
                            <Input
                                className={`h-12 rounded-lg border-none bg-[#F8F8F8] leading-[13px] text-secondary shadow-[0px_0px_10px_rgba(0,0,0,0.25)] dark:bg-[#1F1F1F] md:h-12 ${!isMatch ? 'border-red-500' : ''}`}
                                placeholder="New Password"
                                type="password"
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                            <Button
                                onClick={() => handleSubmit}
                                className="text-md bg-button_primary h-10 w-full rounded-lg font-semibold text-[#ffffff] hover:bg-[#ff6b3d] dark:hover:bg-[#FF5126] md:h-12"
                                type="submit"
                            >
                                Reset
                            </Button>
                        </form>
                    </div>
                </div>
            </>
        );
    else return navigate('/chat');
}
