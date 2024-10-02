// import UserButton from '@/components/ui/user-button';
import { Button } from '@/components/ui/button';
import CustomLink from '@/components/ui/custom-link';
import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
    return (
        <header className="fixed left-0 top-0 w-full bg-background">
            <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-8 space-x-2 lg:space-x-6">
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
                </div>
                <Button
                    className="flex h-12 w-48 justify-around rounded-lg bg-white text-primary shadow-box_shadow hover:bg-[#F8F8F8] dark:bg-[#55555566] dark:hover:bg-[#303030]"
                    onClick={toggleDarkMode}
                >
                    <p>Enable Dark Mode</p>
                    {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </Button>
            </div>
        </header>
    );
};

export default Navbar;
