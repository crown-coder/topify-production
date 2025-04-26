import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConfirmCard from './ConfimCard';
import TvSubForm from '../Forms/TvSubForm';
import AirtimeForm from '../Forms/AirtimeForm';
import DataForm from '../Forms/DataForm';

const TvSubCard = ({ provider, plan, closeModal, activeNetwork }) => {
    const [isConfirm, setIsConfirm] = useState(true);
    const [formData, setFormData] = useState(null);
    const location = useLocation();

    const handleFormSubmit = (data) => {
        // Validate data before proceeding
        if (!data) {
            console.error('No form data provided');
            return;
        }

        // Combine the form data with the selected plan and provider
        const submissionData = {
            ...data,
            provider: provider || 'default', // Ensure provider has a fallback
            planDetails: {
                ...plan,
                amount: plan?.amount || data?.amount // Use plan amount or fallback to form amount
            }
        };

        // Additional validation for airtime specific fields
        if (location.pathname === '/dashboard/buy-airtime') {
            if (!submissionData.phoneNumber || !submissionData.planDetails.amount) {
                console.error('Missing required airtime fields');
                return;
            }
        }

        setFormData(submissionData);
        setIsConfirm(false);
    };

    const renderForm = () => {
        switch (location.pathname) {
            case '/dashboard/buy-airtime':
                return (
                    <AirtimeForm
                        onSubmit={handleFormSubmit}
                        selectedPlan={plan}
                        provider={provider}
                        closeModal={closeModal}
                    />
                );
            case '/dashboard/pay-tv-bill':
                return (
                    <TvSubForm
                        onSubmit={handleFormSubmit}
                        provider={provider}
                        selectedPlan={plan}
                    />
                );
            case '/dashboard/buy-data':
                return <DataForm onSubmit={handleFormSubmit} selectedPlan={plan} activeNetwork={activeNetwork} />;
            default:
                return null;
        }
    };

    const handleFinalConfirmation = () => {
        if (!formData) {
            console.error('No data to submit');
            return;
        }

        // Here you would typically make an API call
        console.log('Submitting:', formData);

        // Close modal after submission
        closeModal();
    };

    return (
        <div className='rounded-lg p-4 bg-white w-[40%] max-lg:w-[95%]'>
            {isConfirm ? (
                renderForm()
            ) : (
                <ConfirmCard
                    data={formData}
                    onBack={() => setIsConfirm(true)}
                    onConfirm={handleFinalConfirmation}
                    transactionType={location.pathname.split('/').pop()} // Extract transaction type
                />
            )}
        </div>
    );
};

export default TvSubCard;