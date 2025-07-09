import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EmailVerificationPage = ({ user, onRefresh }) => {
    const navigate = useNavigate();
    const xsrfToken = Cookies.get("XSRF-TOKEN");

    const [verified, setVerified] = useState(!!user?.email_verified_at);
    const [cooldown, setCooldown] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleVerifyClick = async () => {
        if (cooldown > 0 || loading) return;

        try {
            setLoading(true);
            const response = await axios.post(
                `/api/custom-email/verification-notification`,
                {
                    email: user?.email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": xsrfToken,
                    },
                    withCredentials: true,
                }
            );
            console.log("Verification sent:", response.data);
            setCooldown(60); // 60 seconds
        } catch (err) {
            console.error("Error Sending Verification Email", err);
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        navigate("/dashboard/virtual-card/otp");
    };

    // Cooldown countdown
    useEffect(() => {
        if (cooldown <= 0) return;
        const interval = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) clearInterval(interval);
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [cooldown]);

    // Polling email verification status every 5s
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`/api/api2/user`);
                if (res.data?.email_verified_at) {
                    setVerified(true);
                    onRefresh?.();
                    clearInterval(interval);
                }
            } catch (err) {
                console.error("Polling email verification failed", err);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-8">
                {/* Benefits section */}
                <div className="md:w-1/3 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3 mb-4 text-[#4CACF0]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-semibold">Why Verify?</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Secure access to your account</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Receive important notifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Reset password if needed</span>
                        </li>
                    </ul>
                </div>

                {/* Verification section */}
                <div className="md:w-[550px] text-center">
                    <h2 className="text-2xl font-bold text-gray-600 mb-2">Verify Your Email</h2>
                    <p className="text-gray-500 mb-6">
                        We've sent a verification link to <strong className="text-[#4CACF0]">{user?.email}</strong>.
                        Please check your inbox and click the link to complete verification.
                    </p>

                    {!verified ? (
                        <div className="space-y-4">
                            <button
                                onClick={handleVerifyClick}
                                disabled={cooldown > 0 || loading}
                                className={`w-fit py-2.5 px-6 rounded-lg font-medium transition-colors ${cooldown > 0 || loading
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-[#4CACF0] hover:bg-blue-400 text-white shadow-sm"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : cooldown > 0 ? (
                                    `Resend in ${cooldown}s`
                                ) : (
                                    "Send Verification Email"
                                )}
                            </button>
                            {/* <p className="text-sm text-gray-500">
                                Can't find the email? Check your spam folder or try again in a moment.
                            </p> */}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-green-600 font-medium py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Email Verified Successfully!</span>
                            </div>
                            <button
                                onClick={handleContinue}
                                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm"
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
