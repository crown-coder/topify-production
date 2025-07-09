import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
    EmailVerificationPage,
    OtpPage,
    CreateVirtualCard,
    VirtualCardList,
    CardDetails,
    GeneralLoader,
    KycPage,
} from "./VirtualCard/index.js";

const VirtualCardRouter = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [otpVerified, setOtpVerified] = useState(false);
    const [hasCard, setHasCard] = useState(false);
    const [showIdleModal, setShowIdleModal] = useState(false);
    const [countdown, setCountdown] = useState(60);

    const navigate = useNavigate();
    const location = useLocation();
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    const lastActivityRef = useRef(Date.now());
    const idleTimeoutRef = useRef(null);
    const extendOtpIntervalRef = useRef(null);

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/api2/user`);
            setUser(res.data);
            const hasCards = Object.values(res.data?.cardholder_ids || {}).some(val => val !== null);
            setHasCard(hasCards);
        } catch (err) {
            console.error("Error fetching user:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const otpToken = Cookies.get("otp_verified_token");
        if (otpToken) setOtpVerified(true);
    }, []);

    const extendOtp = async () => {
        const otp_code = parseInt(localStorage.getItem('otp_code'), 10);
        if (!otp_code || !otpVerified) return;

        try {
            await axios.post(`/api/extend-otp`, { otp: otp_code }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken
                },
                withCredentials: true
            });
            console.log("✅ OTP extended");
            setShowIdleModal(false);
            setCountdown(60);
        } catch (err) {
            console.error("❌ Extend OTP failed:", err);
        }
    };

    // ✅ Setup user activity listener
    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll'];

        const handleActivity = () => {
            lastActivityRef.current = Date.now();

            if (showIdleModal) return;

            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = setTimeout(() => {
                const idleTime = Date.now() - lastActivityRef.current;
                if (idleTime >= 1 * 60 * 1000) {
                    setShowIdleModal(true);
                }
            }, 1 * 60 * 1000);
        };

        events.forEach(e => window.addEventListener(e, handleActivity));
        handleActivity(); // start timer initially

        return () => {
            events.forEach(e => window.removeEventListener(e, handleActivity));
            clearTimeout(idleTimeoutRef.current);
        };
    }, [showIdleModal]);

    // ✅ Setup OTP auto-extension every 5 minutes
    useEffect(() => {
        if (!otpVerified) return;

        extendOtpIntervalRef.current = setInterval(() => {
            const idleTime = Date.now() - lastActivityRef.current;
            if (idleTime < 4 * 60 * 1000) {
                extendOtp();
            } else {
                console.log('[Auto Extend OTP] Skipped due to inactivity.');
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(extendOtpIntervalRef.current);
    }, [otpVerified]);

    // ⏳ Countdown for idle modal
    useEffect(() => {
        if (!showIdleModal) return;

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [showIdleModal]);

    // 💾 Track last visited route
    useEffect(() => {
        if (location.pathname.startsWith("/dashboard/virtual-card")) {
            localStorage.setItem("last_virtual_card_route", location.pathname);
        }
    }, [location.pathname]);

    const handleOtpVerification = useCallback(async (status) => {
        if (status) {
            const otpCode = localStorage.getItem("otp_code");
            if (!otpCode) return;
            await fetchUser();
            setOtpVerified(true);
        }
    }, []);

    const isEmailVerified = !!user?.email_verified || !!user?.email_verified_at;

    if (isLoading) return <GeneralLoader />;
    if (!user) return <div className="text-center p-10">Error loading user.</div>;

    return (
        <>
            <Routes>
                <Route
                    path="email-verify"
                    element={
                        isEmailVerified
                            ? <Navigate to="/dashboard/virtual-card/otp" replace />
                            : <EmailVerificationPage user={user} onRefresh={fetchUser} />
                    }
                />
                <Route
                    path="otp"
                    element={
                        Cookies.get("otp_verified_token")
                            ? <Navigate to={hasCard ? "/dashboard/virtual-card/list" : "/dashboard/virtual-card/create"} replace />
                            : <OtpPage onVerified={handleOtpVerification} />
                    }
                />
                <Route path="create" element={<CreateVirtualCard onCardCreated={fetchUser} />} />
                <Route path="list" element={<VirtualCardList user={user} onRefresh={fetchUser} />} />
                <Route path="/kycPage/:cardId" element={<KycPage />} />
                <Route path="details/:cardId/:currency" element={<CardDetails />} />
                <Route
                    path="*"
                    element={
                        !isEmailVerified
                            ? <Navigate to="/dashboard/virtual-card/email-verify" replace />
                            : !otpVerified
                                ? <Navigate to="/dashboard/virtual-card/otp" replace />
                                : (() => {
                                    const last = localStorage.getItem("last_virtual_card_route");
                                    if (last && last !== "/dashboard/virtual-card") {
                                        return <Navigate to={last} replace />;
                                    }
                                    return hasCard
                                        ? <Navigate to="/dashboard/virtual-card/list" replace />
                                        : <Navigate to="/dashboard/virtual-card/create" replace />;
                                })()
                    }
                />
            </Routes>

            {showIdleModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 text-center shadow-xl w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold mb-2">Are you still there?</h2>
                        {countdown > 0 ? (
                            <>
                                <p className="text-gray-600 mb-4">
                                    We'll log you out in <strong>{countdown}s</strong> due to inactivity.
                                </p>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        extendOtp();
                                        setShowIdleModal(false);
                                        setCountdown(60);
                                        lastActivityRef.current = Date.now();
                                    }}
                                >
                                    I'm here
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-red-600 mb-4">Session expired due to inactivity.</p>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        setShowIdleModal(false);
                                        setCountdown(60);
                                        setOtpVerified(false);
                                        localStorage.removeItem("otp_code");
                                        navigate("/dashboard/virtual-card/otp");
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

export default VirtualCardRouter;
