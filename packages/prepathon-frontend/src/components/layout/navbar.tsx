import { Button } from '@/components/ui/button';
import CustomLink from '@/components/ui/custom-link';
import UserButton from '@/components/ui/user-button';
import { useSession } from '@hono/auth-js/react';
import { format } from 'date-fns';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
    const { data: session } = useSession();
    const today = new Date();
    const formattedDate = format(today, 'EEEE, MMMM dd, yyyy');
    const location = useLocation();
    const isResponsePage = location.pathname.includes('response');

    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        if (isResponsePage) {
            const params = new URLSearchParams(location.search);
            setCompanyName(params.get('company') || '');
        }
    }, [isResponsePage, location.search]);

    return (
        <header className={`relative left-0 top-0 w-full bg-background`}>
            <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
                <div className="flex h-12 w-1/6 items-center justify-between">
                    <CustomLink href="/">
                        <Button variant="ghost" className="p-0">
                            <img
                                src="/vite.svg"
                                alt="Home"
                                width="32"
                                height="32"
                            />
                        </Button>
                    </CustomLink>
                    {/* <CustomLink href="/api/protected">
                        Protected Api Route
                    </CustomLink> */}

                    {/* User Profile Pic */}
                    {session?.user && <UserButton />}
                </div>
                <div className="flex h-12 w-4/5 items-center justify-between">
                    {session?.user && (
                        <div className="flex flex-col">
                            <p className="font-semibold text-primary">
                                Hey, {session.user.name?.split(' ')[0]}
                            </p>
                            <p className="text-[0.6rem] font-semibold text-secondary">
                                {formattedDate}
                            </p>
                        </div>
                    )}
                    {isResponsePage ? (
                        <p className="text-3xl font-bold text-primary">
                            {companyName} Company Overview
                        </p>
                    ) : (
                        <p></p>
                    )}
                    <Button
                        className="shadow-box_shadow flex h-12 w-48 justify-around rounded-lg bg-white text-primary hover:bg-[#F8F8F8] dark:bg-[#55555566] dark:hover:bg-[#303030]"
                        onClick={toggleDarkMode}
                    >
                        <p>Enable Dark Mode</p>
                        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
