import React, { useState, useEffect } from 'react';
import CreateVirtualCard from './small-components/CreateVirtualCard';
import VirtualCards from './small-components/VirtualCards';
import KycModal from './small-components/KycModal';
import { useModal } from '../ModalContext';

const VirtualCard = () => {
    const [kycCompleted, setKycCompleted] = useState(false);
    const [hasVirtualCard, setHasVirtualCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const { openModal } = useModal();

    // Check user's KYC and card status 
    useEffect(() => {
        const checkUserStatus = async () => {
            setIsLoading(true);

            const userKycStatus = localStorage.getItem('kycCompleted') === 'true';
            setKycCompleted(userKycStatus);

            const userHasCards = localStorage.getItem('hasVirtualCard') === 'true';
            setHasVirtualCard(userHasCards);

            // If KYC isn't completed, show the modal
            if (!userKycStatus) {
                openModal(
                    <KycModal
                        onSuccess={() => {
                            localStorage.setItem('kycCompleted', 'true');
                            setKycCompleted(true);
                        }}
                    />
                );
            }

            setIsLoading(false);
        };

        checkUserStatus();
    }, [openModal]);

    if (isLoading) {
        // Show loading state while checking user status
        return <div>Loading...</div>;
    }

    if (!kycCompleted) {
        // While checking status or if KYC isn't done, show loading or nothing
        // The KYC modal will be shown by the useEffect
        return null;
    }

    // This is the key change - we now properly check for hasVirtualCard after kycCompleted
    return hasVirtualCard ? <VirtualCards /> : (
        <CreateVirtualCard
            onCardCreated={() => {
                localStorage.setItem('hasVirtualCard', 'true');
                setHasVirtualCard(true);
            }}
        />
    );
};

export default VirtualCard;