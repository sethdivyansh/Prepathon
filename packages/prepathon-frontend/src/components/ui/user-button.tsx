import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signIn, signOut, useSession } from '@hono/auth-js/react';
import { LogInIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserButton() {
    const { data: session } = useSession();
    const navigate = useNavigate();

    return (
        <>
            {!session ? (
                <div className="flex space-x-2">
                    <Button onClick={() => signIn('github')}>
                        <LogInIcon /> GitHub
                    </Button>
                    <Button onClick={() => signIn('google')}>
                        <LogInIcon /> Google
                    </Button>
                </div>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'ghost'}
                            className="relative h-10 w-10 rounded-full"
                        >
                            <Avatar className="h-10 w-10">
                                {session.user?.image && (
                                    <AvatarImage
                                        src={session.user.image}
                                        alt={session.user.name ?? ''}
                                    />
                                )}
                                <AvatarFallback className="h-10 w-10 bg-[#7b20a1] text-xl text-white">
                                    {session?.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() ?? 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {session.user?.name}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {session?.user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Button
                                variant="ghost"
                                className="w-full p-0"
                                onClick={() => {
                                    navigate('/resetPassword');
                                }}
                            >
                                Reset Password
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button
                                variant="ghost"
                                className="w-full p-0 text-red-500 hover:bg-red-500 hover:text-white"
                                onClick={() => {
                                    signOut();
                                    navigate('/');
                                }}
                            >
                                Sign Out
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
}
