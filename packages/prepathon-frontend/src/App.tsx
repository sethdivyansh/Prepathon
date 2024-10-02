import Navbar from '@/components/layout/navbar';
import { SessionProvider } from '@hono/auth-js/react';
import ClientExample from './client-example';

export default function App() {
    return (
        <SessionProvider>
            <div className="flex h-full min-h-screen w-full flex-col justify-between">
                <Navbar />
                <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
                    <ClientExample />
                </main>
            </div>
        </SessionProvider>
    );
}
