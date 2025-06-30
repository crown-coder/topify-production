import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const OtpModal = ({ onVerify, onResend, onClose }) => {
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) return;

        setIsSubmitting(true);
        setError('');
        await localStorage.setItem('otp_code', otp);

        try {
            const response = await axios.post(
                `/api/verify-otp`,
                { otp },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                localStorage.setItem('otp_code', otp);
                setError('OTP verified successfully!');

                onVerify(otp);

                // Then close the modal after state updates
                setTimeout(() => {
                    if (onClose) onClose();
                }, 300);
            } else {
                setError(response.data.message || 'OTP verification failed');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            setError(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        setResendDisabled(true);
        setError('');

        try {
            await onResend();

            // Start countdown
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
            setError('Failed to resend OTP');
            setResendDisabled(false);
        }
    };

    useEffect(() => {
        const successKeywords = ['successfully', 'verified'];
        const shouldClose = successKeywords.some(word =>
            error.toLowerCase().includes(word)
        );

        if (shouldClose && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [error, onClose]);

    return (
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Verify OTP</h3>
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className={`text-gray-500 hover:text-gray-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    ✕
                </button>
            </div>

            <p className="text-gray-600 mb-4">
                We've sent a 6-digit OTP to your email. Please enter it below.
            </p>

            {error && (
                <div className={`mb-4 p-2 rounded ${error.toLowerCase().includes('success') || error.toLowerCase().includes('verified')
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-700'
                    }`}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setOtp(value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 text-center text-xl border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="000000"
                        autoFocus
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendDisabled || isSubmitting}
                        className={`text-blue-600 hover:text-blue-800 ${resendDisabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {resendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}
                    </button>

                    <button
                        type="submit"
                        disabled={otp.length !== 6 || isSubmitting}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${otp.length !== 6 || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OtpModal;