// import UserButton from '@/components/ui/user-button';
import { Button } from '@/components/ui/button';
import CustomLink from '@/components/ui/custom-link';
import { useSession } from '@hono/auth-js/react';
import { format } from 'date-fns';
import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
    const { data: session } = useSession();
    const comapanyName = 'Zooxo';
    const today = new Date();
    const formattedDate = format(today, 'EEEE, MMMM dd, yyyy');
    const currentPath = window.location.pathname;

    const isResponsePage = currentPath.includes('response');
    return (
        <header
            className={`${isResponsePage ? 'sticky' : 'fixed'} left-0 top-0 w-full bg-background`}
        >
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
                    {!session?.user && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xl text-primary">
                            D
                        </div>
                    )}
                </div>
                <div className="flex h-12 w-4/5 items-center justify-between">
                    {!session?.user && (
                        <div className="flex flex-col">
                            <p className="font-semibold text-primary">
                                Hey, Divyansh
                            </p>
                            <p className="text-[0.6rem] font-semibold text-secondary">
                                {formattedDate}
                            </p>
                        </div>
                    )}
                    <p className="text-3xl font-bold text-primary">
                        {comapanyName} Company Overview
                    </p>
                    <Button
                        className="flex h-12 w-48 justify-around rounded-lg bg-white text-primary shadow-box_shadow hover:bg-[#F8F8F8] dark:bg-[#55555566] dark:hover:bg-[#303030]"
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
