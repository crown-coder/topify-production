import React, { useState } from 'react'
import { TbCurrencyNaira } from 'react-icons/tb';
import { FaDollarSign } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const NewVirtualCardForm = ({ initialCardType, onCardTypeChange, onCreateCard, closeModal }) => {
    const [cardType, setCardType] = useState(initialCardType);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);

    const userWalletBalanceNGN = 50000;  // ₦50,000

    // Mock exchange rate (1 USD = 1500 NGN)
    const exchangeRate = 1500;

    const [formData, setFormData] = useState({
        fundingAmount: '',
        pin: '',
    });

    const handleCardTypeChange = (type) => {
        setCardType(type);
        onCardTypeChange(type);
        setError(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    // Calculate USD equivalent for Naira funding amount
    const calculateDollarEquivalent = (nairaAmount) => {
        if (!nairaAmount) return 0;
        const amount = parseFloat(nairaAmount);
        return (amount / exchangeRate).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        setError(null);

        try {
            // Validate funding amount for USD cards
            if (cardType === 'Dollar' && formData.fundingAmount) {
                const fundingAmount = parseFloat(formData.fundingAmount);
                if (fundingAmount > userWalletBalanceNGN) {
                    throw new Error('Insufficient Naira balance');
                }
            }

            // Validate PIN
            if (!formData.pin || formData.pin.length !== 4) {
                throw new Error('PIN must be 4 digits');
            }

            // Prepare request data
            const requestData = {
                card_currency: cardType === 'Naira' ? 'NGN' : 'USD',
                pin: formData.pin
            };

            // Add funding amount for USD cards (send the dollar equivalent)
            if (cardType === 'Dollar' && formData.fundingAmount) {
                requestData.funding_amount = calculateDollarEquivalent(formData.fundingAmount);
            }

            // Get XSRF token from cookies
            const xsrfToken = Cookies.get('XSRF-TOKEN');

            // Make API call
            const response = await axios.post(
                '/api/virtual-cards/card/create',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true,
                }
            );

            // Call success callback with the new card data
            onCreateCard(response.data);
            closeModal();

        } catch (error) {
            console.error('Error creating card:', error);
            setError(error.response?.data?.message || error.message || 'Failed to create card');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 my-5">
                <button
                    onClick={() => handleCardTypeChange('Naira')}
                    className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-colors ${cardType === 'Naira'
                        ? 'bg-blue-300/10 text-[#4CACF0] border-b-2 border-[#4CACF0]'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                >
                    <TbCurrencyNaira className="text-3xl" />
                    <span>Naira Card</span>
                </button>
                <button
                    onClick={() => handleCardTypeChange('Dollar')}
                    className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-colors ${cardType === 'Dollar'
                        ? 'bg-blue-300/10 text-[#4CACF0] border-b-2 border-[#4CACF0]'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                >
                    <FaDollarSign className="text-3xl" />
                    <span>Dollar Card</span>
                </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Wallet Balance:</p>
                <p className="text-lg font-semibold">₦{userWalletBalanceNGN.toLocaleString()}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {cardType === 'Dollar' && (
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fundingAmount" className="text-sm font-light">
                            Amount to Fund (₦)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₦</span>
                            <input
                                className="w-full pl-8 p-2 rounded-lg border text-[#989898] text-sm font-light"
                                type="number"
                                name="fundingAmount"
                                value={formData.fundingAmount}
                                onChange={handleChange}
                                min="1500" // Minimum ₦1500 (equivalent to $1)
                                step="any"
                                placeholder={`Minimum ₦${exchangeRate} ($1)`}
                                required
                            />
                        </div>
                        {formData.fundingAmount && (
                            <p className='text-sm font-normal text-gray-400'>
                                Will be converted to: <span className='text-green-600'>
                                    ${calculateDollarEquivalent(formData.fundingAmount)} USD
                                </span>
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label htmlFor="pin" className="text-sm font-light">
                        New PIN (4 digits)
                    </label>
                    <input
                        className="p-2 rounded-lg border text-[#989898] text-sm font-light"
                        name="pin"
                        type="password"
                        value={formData.pin}
                        onChange={handleChange}
                        placeholder="Enter 4-digit PIN"
                        maxLength={4}
                        pattern="\d{4}"
                        title="Please enter exactly 4 digits"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isCreating}
                    className={`w-full p-3 mt-2 bg-[#4CACF0] rounded-md text-white hover:bg-[#3a8bc8] transition-colors ${isCreating ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isCreating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        `Create ${cardType} Card`
                    )}
                </button>
            </form>
        </div>
    )
}

export default NewVirtualCardForm