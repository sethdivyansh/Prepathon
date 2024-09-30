import { Button } from '@/components/ui/button';
import CustomLink from '@/components/ui/custom-link';
import UserButton from '@/components/ui/user-button';

export default function Navbar() {
    return (
        <header className="sticky flex justify-center border-b">
            <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
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
                    <CustomLink href="/api/protected">
                        Protected Api Route
                    </CustomLink>
                </div>
                <UserButton />
            </div>
        </header>
    );
}
