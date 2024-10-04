import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function ForgotPasswordPage() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="shadow-box_shadow w-full max-w-md rounded-lg bg-white p-8 dark:bg-[#181818a3]">
                <h1 className="mb-6 text-center text-3xl font-bold text-primary">
                    Forgot Password
                </h1>
                <div className="space-y-4">
                    <p className="text-center text-secondary">
                        Enter your email address to receive an OTP.
                    </p>
                    <Input
                        type="text"
                        placeholder="Enter your Email"
                        className="h-10 w-full text-secondary dark:bg-[#1F1F1F]"
                    />
                    <Button className="bg-button_primary h-10 w-full text-white hover:bg-[#ff6b3d] dark:hover:bg-[#FF5126]">
                        Send OTP
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
