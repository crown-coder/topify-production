import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateVirtualCard from './small-components/CreateVirtualCard';
import VirtualCards from './small-components/VirtualCards';
import KycModal from './small-components/KycModal';
import OtpModal from './small-components/OtpModal';
import { useModal } from '../ModalContext';
import Cookies from 'js-cookie';

const VirtualCard = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const { openModal, closeModal } = useModal();

    const isCookieExist = (cookieName) => {
        const value = Cookies.get(cookieName);
        return value !== undefined;
    };

    const sendOtpToEmail = async () => {
        if (isSendingOtp) return;

        setIsSendingOtp(true);
        try {
            await axios.post('/api/send-otp', {
                email: user?.email
            });
            setShowOtpModal(true);
            openModal(
                <OtpModal
                    onVerify={() => {
                        closeModal();
                        setShowOtpModal(false);
                    }}
                    onResend={sendOtpToEmail}
                    onClose={() => {
                        closeModal();
                        setShowOtpModal(false);
                    }}
                />
            );
        } catch (error) {
            console.error('Error sending OTP:', error);
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyClick = () => {
        if (!isCookieExist('otp_verified_token')) {
            sendOtpToEmail();
        }
    };

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/api2/user');
            const userData = {
                ...response.data,
                kyc_verified: true // Hardcoded for development
            };
            setUser(userData);

            if (userData.kyc_verified === false) {
                openModal(
                    <KycModal
                        onSuccess={() => {
                            fetchUserData();
                        }}
                    />
                );
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return <div className="text-center py-10">Error loading user data</div>;
    }

    if (!user.kyc_verified) {
        return null;
    }

    if (!user.cardholder_id) {
        return (
            <CreateVirtualCard
                onCardCreated={() => {
                    fetchUserData();
                }}
            />
        );
    }

    return (
        <>
            {isCookieExist('otp_verified_token') ? (
                <VirtualCards />
            ) : (
                <div className="text-center py-10">
                    <button
                        onClick={handleVerifyClick}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Verify Identity to View Cards
                    </button>
                </div>
            )}
        </>
    );
};

export default VirtualCard;