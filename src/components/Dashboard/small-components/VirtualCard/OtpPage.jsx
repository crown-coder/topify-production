import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const OtpPage = ({ onVerified }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isSendingInitialOtp, setIsSendingInitialOtp] = useState(true);

    const hasSentOtpRef = useRef(false);
    const navigate = useNavigate();
    const xsrfToken = Cookies.get("XSRF-TOKEN");

    useEffect(() => {
        console.log("Sending initial OTP...");
        const sendInitialOtp = async () => {
            if (hasSentOtpRef.current) return;
            hasSentOtpRef.current = true;

            try {
                const response = await axios.post(
                    `/api/send-otp`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-XSRF-TOKEN": xsrfToken,
                        },
                        withCredentials: true,
                    }
                );
                console.log("OTP sent successfully", response.data);
            } catch (error) {
                console.error("Failed to send OTP on mount", error);
                setError("Failed to send OTP to your email.");
            } finally {
                setIsSendingInitialOtp(false);
            }
        };

        sendInitialOtp();
    }, [xsrfToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting OTP:", otp);
        if (otp.length !== 6) {
            setError("OTP must be 6 digits");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            console.log("Verifying OTP...");
            const response = await axios.post(
                `/api/verify-otp`,
                { otp },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": xsrfToken,
                    },
                    withCredentials: true,
                }
            );

            console.log("Full verification response:", response); // Add this line

            // Changed this condition to check response status and data
            if (response.status === 200 && response.data && !response.data.error) {
                console.log("Storing OTP in localStorage:", otp);
                localStorage.setItem("otp_code", otp);

                console.log("Calling onVerified...");
                await onVerified?.(true);
            } else {
                console.log("OTP verification failed with response:", response.data);
                setError(response.data.message || "OTP verification failed");
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            setError(
                error.response?.data?.message || "An error occurred during verification"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        console.log("Resending OTP...");
        setResendDisabled(true);
        setError("");

        try {
            const response = await axios.post(
                `/api/send-otp`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": xsrfToken,
                    },
                    withCredentials: true,
                }
            );
            console.log("OTP resent successfully", response.data);

            let timer = 60;
            setCountdown(timer);
            const interval = setInterval(() => {
                timer--;
                setCountdown(timer);
                if (timer <= 0) {
                    clearInterval(interval);
                    setResendDisabled(false);
                }
            }, 1000);
        } catch (error) {
            console.error("Failed to resend OTP", error);
            setError("Failed to resend OTP");
            setResendDisabled(false);
        }
    };

    return (
        <div className="w-full mt-2 bg-white rounded-xl overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Benefits section */}
                <div className="md:w-2/5 bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-4 text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h3 className="text-lg font-semibold">Secure Your Account</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Protect your account with two-factor authentication</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Prevent unauthorized access to your account</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Complete sensitive transactions securely</span>
                        </li>
                    </ul>
                </div>

                {/* OTP Verification form */}
                <div className="md:w-3/6 flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-6 text-center">
                            <h2 className="text-xl text-gray-800 mb-1">
                                {isSendingInitialOtp ? "Sending Verification Code" : "Enter Verification Code"}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                We've sent a 6-digit code to your registered device
                            </p>
                        </div>

                        {!isSendingInitialOtp && (
                            <>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                        }
                                        placeholder="Enter 6-digit code"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-lg tracking-widest text-center"
                                        data-testid="otp-input"
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center" data-testid="error-message">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isSubmitting
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-[#4CACF0] hover:bg-blue-400 text-white"
                                        }`}
                                    data-testid="verify-button"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </span>
                                    ) : "Verify Code"}
                                </button>

                                <div className="mt-4 text-center">
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={resendDisabled}
                                        className={`text-sm font-medium ${resendDisabled
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-[#4CACF0] hover:text-blue-500 hover:underline"
                                            }`}
                                        data-testid="resend-button"
                                    >
                                        {resendDisabled ? `Request new code in ${countdown}s` : "Didn't receive code? Resend"}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtpPage;