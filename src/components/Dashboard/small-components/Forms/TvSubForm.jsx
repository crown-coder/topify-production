import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DSTV from '../../../../assets/Dstv.png';
import STARTIMES from '../../../../assets/startimes.png';
import GOTV from '../../../../assets/gotv.png';
import { useModal } from '../../../ModalContext';
import { MdCancel } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { TailSpin } from 'react-loader-spinner';
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";


const TvSubForm = ({ onSubmit, provider, selectedPlan }) => {
    const [smartCardNumber, setSmartCardNumber] = useState('');
    const [amount, setAmount] = useState(selectedPlan?.amount || '');
    const [cablePlan, setCablePlan] = useState(selectedPlan?.package_name || '');
    const [validationMessage, setValidationMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const { closeModal, openModal } = useModal();
    const navigate = useNavigate();

    // Fetch wallet balance
    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const response = await axios.get(`/api/api2/user`);
                const balance = parseFloat(response.data?.wallet?.balance || 0);
                setWalletBalance(balance);
            } catch (err) {
                console.error('Failed to fetch wallet balance:', err);
            }
        };
        fetchWalletBalance();
    }, []);

    const providerLogo = {
        'DSTV': DSTV,
        'GOTV': GOTV,
        'Startime': STARTIMES
    }[provider];

    useEffect(() => {
        if (selectedPlan) {
            setAmount(selectedPlan.amount);
            setCablePlan(selectedPlan.package_name);
        }
    }, [selectedPlan]);

    const validateSmartCard = useCallback(async (cardNumber) => {
        if (!cardNumber || cardNumber.length < 8) {
            setValidationMessage('');
            setIsValid(false);
            setCustomerName('');
            return;
        }

        const cableName = provider.toUpperCase();
        const url = `/api/validate_icu?smart_card_number=${cardNumber}&cable_name=${cableName}`;

        try {
            setIsValidating(true);
            const res = await api.get(url);

            if (res.data && res.data.name) {
                setValidationMessage(`Name: ${res.data.name}`);
                setIsValid(true);
                setCustomerName(res.data.name);
            } else {
                setValidationMessage("Invalid Smart Card/UC Number");
                setIsValid(false);
                setCustomerName('');
            }
        } catch (error) {
            const message = error.response?.data?.message ||
                error.message ||
                "Failed to validate smart card";
            setValidationMessage(message);
            setIsValid(false);
            setCustomerName('');

            if (error.response?.status === 401) {
                console.error('Session expired, please login again');
                setError('Session expired, please login again');
            }
        } finally {
            setIsValidating(false);
        }
    }, [provider]);

    // Debounced smart card validation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (smartCardNumber) {
                validateSmartCard(smartCardNumber);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [smartCardNumber, validateSmartCard]);

    const handleFundWallet = () => {
        closeModal();
        navigate('/dashboard/fund-wallet');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const amountValue = parseFloat(amount);

        // Check wallet balance
        if (amountValue > walletBalance) {
            setError(`Insufficient funds. Your balance is ₦${walletBalance.toFixed(2)}. `);
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await api.post(`/api/cable_tv_payments`, {
                cable_name: provider.toUpperCase(),
                smart_card_number: smartCardNumber,
                package_name: cablePlan,
                amount: amountValue,
                customer_name: customerName
            });

            // Update wallet balance
            setWalletBalance(prev => prev - amountValue);

            // Show success modal
            openModal(
                <div className="relative">
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={500}
                    />
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                        <div className="text-left mb-4">
                            <p><strong>Provider:</strong> {provider}</p>
                            <p><strong>Plan:</strong> {cablePlan}</p>
                            <p><strong>Smart Card Number:</strong> {smartCardNumber}</p>
                            <p><strong>Amount:</strong> ₦{amountValue.toFixed(2)}</p>
                            <p><strong>Customer:</strong> {customerName}</p>
                            <p className="mt-2"><strong>Remaining balance:</strong> ₦{(walletBalance - amountValue).toFixed(2)}</p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-[#4CACF0] text-white rounded hover:bg-[#3A9BDE]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            );

            // Call the original onSubmit if needed
            if (onSubmit) {
                onSubmit({
                    provider,
                    smartCardNumber,
                    amount,
                    cablePlan,
                    planDetails: selectedPlan
                });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'An error occurred. Please try again.';
            setError(errorMessage);

            if (err.response?.status === 401) {
                console.error('Authentication failed:', errorMessage);
            }
            console.error('Payment error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-[#434343] font-normal text-lg'>
                    {provider} Subscription
                </h2>
                <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    <MdCancel size={20} />
                </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                    Wallet Balance: <span className="font-bold">₦{walletBalance.toFixed(2)}</span>
                </p>
            </div>

            {/* <div className="mb-4">
                <h4 className='text-xs text-[#232323D9] mb-2'>Recent transactions</h4>
                <div className='w-full flex gap-3'>
                    <button className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#4CACF0] p-1'>
                            <img
                                src={providerLogo}
                                alt={provider}
                                className='w-[30px] h-[30px] object-contain'
                            />
                        </div>
                        <p className='text-xs text-[#232323D9] mt-1'>12345678</p>
                    </button>
                </div>
            </div> */}

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Cable Provider</label>
                    <input
                        type="text"
                        value={provider}
                        readOnly
                        className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light bg-gray-100 cursor-not-allowed'
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Smart Card/UC Number</label>
                    <input
                        type='text'
                        value={smartCardNumber}
                        onChange={(e) => setSmartCardNumber(e.target.value)}
                        placeholder='Enter your smart card number'
                        className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light'
                        required
                    />
                    {validationMessage && (
                        <div className={`my-1 p-2 ${isValid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} text-sm rounded`}>
                            {validationMessage}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Cable Plan</label>
                    <input
                        type="text"
                        value={cablePlan}
                        readOnly
                        className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light bg-gray-100 cursor-not-allowed'
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Amount</label>
                    <input
                        type="text"
                        value={`₦${amount}`}
                        readOnly
                        className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light bg-gray-100 cursor-not-allowed'
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded flex items-center justify-between">
                        {error.includes('Insufficient') ? (
                            <>
                                {error}
                                <button
                                    onClick={handleFundWallet}
                                    className="text-white py-1 px-2 rounded-md bg-blue-600"
                                >
                                    Fund
                                </button>
                            </>
                        ) : (
                            error
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full p-3 rounded-lg text-white font-medium transition-colors flex items-center justify-center ${isValid && !isValidating && !isSubmitting
                        ? 'bg-[#4CACF0] hover:bg-[#3A9BDE]'
                        : validationMessage && !isValid && !isValidating
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    disabled={!isValid || isValidating || isSubmitting}
                >
                    {isValidating ? (
                        <>
                            <ImSpinner8 className="animate-spin mr-2" />
                            Validating...
                        </>
                    ) : isSubmitting ? (
                        <>
                            <TailSpin color="#FFF" height={20} width={20} className="mr-2" />
                            Processing Payment...
                        </>
                    ) : validationMessage && !isValid ? (
                        'Invalid Card No.'
                    ) : (
                        'Proceed to Payment'
                    )}
                </button>
            </form>
        </div>
    );
};

export default TvSubForm;
