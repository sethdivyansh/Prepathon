import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function EmailVerificationPage() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-box_shadow dark:bg-[#181818a3]">
                <h1 className="mb-6 text-center text-3xl font-bold text-primary">
                    Email Verification
                </h1>
                <div className="space-y-4">
                    <p className="text-center text-secondary">
                        Enter the OTP that has been sent to your email address.
                    </p>
                    <Input
                        type="text"
                        placeholder="Enter your OTP"
                        className="h-10 w-full text-secondary dark:bg-[#1F1F1F]"
                    />
                    <Button className="bg-button_primary h-10 w-full text-white hover:bg-orange-500 dark:hover:bg-[#FF5126]">
                        Verify OTP
                    </Button>
                    <div className="mt-4 flex flex-row gap-1">
                        <p className="text-sm text-secondary">
                            {' '}
                            Didn't receive an OTP?
                        </p>
                        <a
                            href="#resend-otp"
                            className="text-button_primary text-sm hover:underline"
                        >
                            Resend
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
