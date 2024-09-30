import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-3xl font-bold text-neutral-800">
                    Forgot Password
                </h1>
                <div className="space-y-4">
                    <p className="text-center text-gray-600">
                        Enter your email address and we'll send you an OTP to
                        verify your account.
                    </p>
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full"
                    />
                    <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                        Send Verification Email
                    </Button>
                    <div className="mt-4 text-center">
                        <a
                            href="/auth"
                            className="text-sm text-orange-500 hover:underline"
                        >
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
