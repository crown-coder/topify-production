import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';
import CreateVirtualCard from './small-components/CreateVirtualCard';
import VirtualCards from './small-components/VirtualCards';
import KycModal from './small-components/KycModal';
import OtpModal from './small-components/OtpModal';
import { useModal } from '../ModalContext';
import Cookies from 'js-cookie';
import GeneralLoader from './small-components/GeneralLoader';

const VirtualCard = () => {
    console.log('VirtualCard component rendered');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [availableCards, setAvailableCards] = useState([]);
    const [componentKey, setComponentKey] = useState(0);
    const [otpVerified, setOtpVerified] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const { openModal, closeModal } = useModal();
    const otpSentRef = useRef(false);
    const mountedRef = useRef(true);

    const lastActivityRef = useRef(Date.now());
    const extendOtpIntervalRef = useRef(null);
    const idleTimeoutRef = useRef(null);
    const [showIdleModal, setShowIdleModal] = useState(false);
    const [countdown, setCountdown] = useState(60);

    const fetchAvailableCards = async () => {
        try {
            const response = await axios.get(`/api/getCardType`);
            const cards = response.data.data || [];
            setAvailableCards(cards);
        } catch (error) {
            console.error("Error fetching available cards:", error);
        }
    };

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api2/user`);
            const userData = {
                ...response.data,
                kyc_verified: true // Assuming KYC is verified for this example
            };

            if (mountedRef.current) {
                setUser(userData);
                // Check OTP verification status from cookie when user data loads
                setOtpVerified(Cookies.get('otp_verified_token') !== undefined);
            }

            if (userData.kyc_verified === false) {
                openModal(<KycModal onSuccess={fetchUserData} />);
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            if (mountedRef.current) {
                setIsLoading(false);
            }
        }
    };

    const refreshData = () => {
        fetchUserData().then(fetchAvailableCards);
    };

    const onVerifyOtp = useCallback((otpValue) => {
        setOtpVerified(true);
        setShowOtpModal(false);
    }, []);




    const sendOtpToEmail = useCallback(async () => {
        if (isSendingOtp || otpSentRef.current || !user?.email) return;

        setIsSendingOtp(true);
        otpSentRef.current = true;
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/send-otp`, { email: user.email });
            setShowOtpModal(true);
            openModal(
                <OtpModal
                    onVerify={onVerifyOtp}
                    onResend={sendOtpToEmail}
                    onClose={() => {
                        setShowOtpModal(false);
                        closeModal();
                        // Refresh data after modal closes
                        refreshData();
                    }}
                />
            );
        } catch (error) {
            console.error('Error sending OTP:', error);
            otpSentRef.current = false;
        } finally {
            if (mountedRef.current) {
                setIsSendingOtp(false);
            }
        }
    }, [user?.email, isSendingOtp, openModal, onVerifyOtp, closeModal, refreshData]);

    useEffect(() => {
        mountedRef.current = true;
        fetchUserData().then(fetchAvailableCards);

        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (user && !otpVerified && !showOtpModal && !otpSentRef.current) {
            sendOtpToEmail();
        }
    }, [user, otpVerified, showOtpModal]);

    // Are you still there
    const resetActivityTimer = useCallback(() => {
        lastActivityRef.current = Date.now();

        // If idle modal is showing, dismiss it and reset countdown
        if (showIdleModal) {
            setShowIdleModal(false);
            setCountdown(60);

            // Call extend-otp API when "I'm here" is clicked
            extendOtp();
        }

        // Restart idle timeout
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = setTimeout(() => {
            setShowIdleModal(true);
        }, 9 * 60 * 1000); // 9 minutes
    }, [showIdleModal]);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll'];

        events.forEach(event =>
            window.addEventListener(event, resetActivityTimer)
        );

        resetActivityTimer(); // Initialize immediately

        return () => {
            events.forEach(event =>
                window.removeEventListener(event, resetActivityTimer)
            );
            clearTimeout(idleTimeoutRef.current);
        };
    }, []);

    const xsrfToken = Cookies.get('XSRF-TOKEN');

    const extendOtp = useCallback(async () => {
        const otp_code = parseInt(localStorage.getItem('otp_code'), 10);
        if (!otp_code || !otpVerified) return;

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/extend-otp`, { otp: otp_code }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
                withCredentials: true,
            });

            console.log('Session extended');
        } catch (err) {
            console.error('Error extending OTP session', err);
        }
    }, [otpVerified]);

    useEffect(() => {
        if (otpVerified) {
            extendOtpIntervalRef.current = setInterval(() => {
                const timeSinceLastActivity = Date.now() - lastActivityRef.current;
                if (timeSinceLastActivity < 5 * 60 * 1000) { // less than 5 min
                    extendOtp();
                }
            }, 5 * 60 * 1000); // every 5 min
        }

        return () => clearInterval(extendOtpIntervalRef.current);
    }, [otpVerified]);

    useEffect(() => {
        if (showIdleModal) {
            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 0) {
                        clearInterval(interval);
                        return 0; // Just stop at 0, don't trigger anything else
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [showIdleModal]);

    // useEffect(() => {
    //     if (countdown === 0 && showIdleModal) {
    //         setShowIdleModal(false);
    //         setCountdown(60);
    //         setOtpVerified(false);
    //         sendOtpToEmail();
    //     }
    // }, [countdown, showIdleModal]);

    const renderContent = useMemo(() => {
        if (!otpVerified || !user) return null;

        const hasCardholder = Object.values(user.cardholder_ids).some(
            id => id !== null
        );

        if (!hasCardholder) {
            return <CreateVirtualCard onCardCreated={refreshData} />;
        }

        const provider = Object.keys(user.cardholder_ids).find(
            key => user.cardholder_ids[key] !== null
        );

        return provider ? (
            <VirtualCards
                provider={provider}
                key={provider}
                onRefresh={refreshData}
            />
        ) : null;
    }, [user, otpVerified]);

    if (isSendingOtp) {
        return <GeneralLoader />;
    }

    if (isLoading) {
        return <GeneralLoader />;
    }

    if (!user) {
        return <div className="text-center py-10">Error loading user data</div>;
    }

    if (!user.kyc_verified) {
        return null;
    }

    return (
        <>
            <div key={componentKey}>
                {renderContent}
            </div>

            {showIdleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center space-y-4">
                        <h2 className="text-xl font-semibold">Are you still there?</h2>
                        {countdown > 0 ? (
                            <>
                                <p>We'll log you out in <span className="font-bold">{countdown}s</span> due to inactivity.</p>
                                <button
                                    className="bg-[#4CACF0] text-white px-4 py-2 rounded"
                                    onClick={resetActivityTimer}
                                >
                                    I'm here
                                </button>
                            </>
                        ) : (
                            <>
                                <p>Your session has expired due to inactivity.</p>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        setShowIdleModal(false);
                                        setCountdown(60);
                                        setOtpVerified(false);
                                        sendOtpToEmail();
                                    }}
                                >
                                    Verify Again
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );

};

export default VirtualCard;