import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Glo from '../../../../assets/glo.png';
import Airtel from '../../../../assets/airtel.png';
import { useModal } from '../../../ModalContext';
import { MdCancel } from "react-icons/md";
import { TailSpin } from 'react-loader-spinner';
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import CardLayout from '../Cards/CardLayout';

const AirtimeForm = ({ onSubmit, selectedPlan = {}, provider, closeModal }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [airtimeAmount, setAirtimeAmount] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const { openModal, closeModal: closeParentModal } = useModal();
    const navigate = useNavigate();

    // Network provider mapping to API expected values (using IDs)
    const providerMap = {
        'MTN': 1,
        'GLO': 2,
        'AIRTEL': 3,
        '9MOBILE': 4,
    };

    // Initialize amount from selectedPlan
    useEffect(() => {
        if (selectedPlan?.amount) {
            setAirtimeAmount(selectedPlan.amount.toString());
        }
    }, [selectedPlan]);

    // Fetch wallet balance on component mount
    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const response = await axios.get(
                    '/api/api2/user',
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                const balance = parseFloat(response.data?.wallet?.balance || 0);
                setWalletBalance(balance);
            } catch (err) {
                console.error('Failed to fetch wallet balance:', err);
            }
        };

        fetchWalletBalance();
    }, []);

    const formatPhoneNumber = (number) => {
        const digits = number.replace(/\D/g, '');
        if (digits.length === 11 && digits.startsWith('0')) {
            return digits.substring(1);
        }
        return digits;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
        const amountValue = parseFloat(airtimeAmount);
        const networkId = providerMap[provider?.toUpperCase()];

        // Validate inputs
        if (formattedPhoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            setIsLoading(false);
            return;
        }

        if (isNaN(amountValue)) {
            setError('Please enter a valid amount');
            setIsLoading(false);
            return;
        }

        if (amountValue <= 0) {
            setError('Amount must be greater than 0');
            setIsLoading(false);
            return;
        }

        if (!networkId) {
            setError('Network provider is required');
            setIsLoading(false);
            return;
        }

        // Check wallet balance
        if (amountValue > walletBalance) {
            setError(`Insufficient funds. Your balance is ₦${walletBalance.toFixed(2)}`);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                '/api/buy_airtime',
                {
                    phone_number: formattedPhoneNumber,
                    mobile_network: networkId,
                    amount: amountValue
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    validateStatus: function (status) {
                        // Consider 200-299 status codes as success
                        return status >= 200 && status < 300;
                    }
                }
            );

            // If we get here, the request was successful (status 200-299)
            // Update wallet balance after successful purchase
            setWalletBalance(prev => prev - amountValue);

            openModal(
                <div className="relative">
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={500}
                    />
                    <CardLayout>
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
                            <p className="mb-4">
                                You have successfully purchased ₦{amountValue.toFixed(2)} {provider} airtime for 0{formattedPhoneNumber}
                            </p>
                            <p className="mb-4 text-sm">
                                Remaining balance: ₦{(walletBalance - amountValue).toFixed(2)}
                            </p>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-[#4CACF0] text-white rounded hover:bg-[#3A9BDE]"
                            >
                                Close
                            </button>
                        </div>
                    </CardLayout>
                </div>
            );
        } catch (err) {
            // This will catch network errors or responses outside 200-299
            const errorMsg = err.response?.data?.message ||
                err.message ||
                'An error occurred. Please try again.';
            setError(errorMsg);
            console.error('Airtime purchase error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*\.?[0-9]*$/.test(value)) {
            setAirtimeAmount(value);
        }
    };

    const handleFundWallet = () => {
        closeModal();
        navigate('/dashboard/fund-wallet');
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-[#434343] font-normal text-lg'>
                    {provider} Airtime Purchase
                </h2>
                <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
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

            <div>
                <h4 className='text-xs text-[#232323D9] mb-2'>Recent transactions</h4>
                <div className='w-full flex gap-3 my-3'>
                    <button type="button" className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#4CACF0] p-1'>
                            <img src={Glo} alt="Glo" className='w-[30px] h-[30px] object-contain' />
                        </div>
                        <p className='text-xs text-[#232323D9] mt-1'>12345678</p>
                    </button>
                    <button type="button" className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#4CACF0] p-1'>
                            <img src={Airtel} alt="Airtel" className='w-[30px] h-[30px] object-contain' />
                        </div>
                        <p className='text-xs text-[#232323D9] mt-1'>12345678</p>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='mt-4 flex flex-col gap-4'>
                    <div>
                        <input
                            type='tel'
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            placeholder='Mobile Number (e.g., 08123456789)'
                            className='w-full p-3 rounded-lg border text-[#333] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#4CACF0]'
                            required
                            maxLength="11"
                            inputMode="numeric"
                        />
                        <small className="text-gray-500">Enter 11-digit phone number</small>
                    </div>

                    <div>
                        <input
                            type='text'
                            value={airtimeAmount}
                            onChange={handleAmountChange}
                            placeholder='Enter amount'
                            className='w-full p-3 rounded-lg border text-[#333] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#4CACF0]'
                            inputMode="decimal"
                            required
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
                        className='w-full p-3 rounded-lg text-white bg-[#4CACF0] hover:bg-[#3A9BDE] transition-colors font-medium disabled:opacity-50 flex justify-center items-center'
                        disabled={!phoneNumber || !airtimeAmount || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <TailSpin color="#FFF" height={20} width={20} className="mr-2" />
                                Processing...
                            </>
                        ) : (
                            'Proceed to Payment'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AirtimeForm;