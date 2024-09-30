import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function EmailVerificationPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-3xl font-bold text-neutral-800">
                    Email Verification
                </h1>
                <div className="space-y-4">
                    <p className="text-center text-gray-600">
                        Enter the OTP that has been sent to your email address.
                    </p>
                    <Input
                        type="text"
                        placeholder="Enter your OTP"
                        className="w-full"
                    />
                    <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-600">
                        Verify OTP
                    </Button>
                    <div className="mt-4 text-center">
                        <a
                            href="#resend-otp"
                            className="text-sm text-indigo-500 hover:underline"
                        >
                            Didn't receive an OTP? Resend
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
