import React, { useState, useEffect } from 'react';
import { FiInfo, FiDollarSign, FiAlertCircle, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import { BsBank2 } from "react-icons/bs";
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const CardWithdrawalForm = ({ cardId, onSuccess, cardCurrency, currentCardId }) => {
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', isSuccess: false });
    const [cardBalance, setCardBalance] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(1693);
    const MINIMUM_AMOUNT = 500;

    console.log(cardId)

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const xsrfToken = Cookies.get('XSRF-TOKEN');
                if (!xsrfToken) {
                    throw new Error('Authentication token missing');
                }

                const config = {
                    headers: {
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true
                };

                const [cardsResponse, rateResponse] = await Promise.all([
                    axios.get('/api/Allvirtual-cards', config),
                    axios.post('/api/getExchangeRates')
                ]);

                const matchingCard = cardsResponse.data.data.find(card => card.id === currentCardId);
                if (!matchingCard) throw new Error('Card not found');

                setCardBalance(matchingCard.balance);
                setExchangeRate(rateResponse.data?.data?.NGN ?? 1693);
            } catch (err) {
                console.error('Error fetching initial data:', err);
                setMessage({
                    text: err.response?.data?.message || 'Failed to load card details',
                    isSuccess: false
                });
            }
        };

        if (cardId) {
            fetchInitialData();
        } else {
            setMessage({ text: 'Card not specified', isSuccess: false });
        }
    }, [cardId, cardCurrency, currentCardId]);

    // Auto-dismiss success messages after 5 seconds
    useEffect(() => {
        if (message.isSuccess) {
            const timer = setTimeout(() => {
                setMessage({ text: '', isSuccess: false });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message.isSuccess]);

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, '');
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const formatCurrency = (value) => {
        return parseFloat(value || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const validateForm = () => {
        const amountValue = parseFloat(amount);

        if (!amount || isNaN(amountValue) || amountValue < MINIMUM_AMOUNT) {
            setMessage({
                text: `Minimum withdrawal amount is ₦${MINIMUM_AMOUNT.toLocaleString()}`,
                isSuccess: false
            });
            return false;
        }

        if (amountValue > cardBalance) {
            setMessage({
                text: `Insufficient card balance (Available: ₦${formatCurrency(cardBalance)})`,
                isSuccess: false
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', isSuccess: false });

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            if (!xsrfToken) throw new Error('Authentication token missing');

            const config = {
                headers: { 'X-XSRF-TOKEN': xsrfToken },
                withCredentials: true
            };

            const response = await axios.post(
                '/api/virtual-cards/payout',
                {
                    type: 'wallet',
                    amount: amount.toString(),
                    card_id: cardId
                },
                config
            );

            // Enhanced success detection
            const isSuccess = response.data?.success ||
                response.data?.status?.toLowerCase() === 'success' ||
                response.status === 200;

            if (!isSuccess) {
                throw new Error(response.data?.message || 'Withdrawal failed');
            }

            const successMessage = response.data?.message || 'Withdrawal successful';
            const newBalance = cardBalance - parseFloat(amount);

            setCardBalance(newBalance);
            setMessage({ text: successMessage, isSuccess: true });
            setAmount('');

            if (onSuccess) {
                onSuccess({
                    amount: parseFloat(amount),
                    cardId,
                    newBalance
                });
            }
        } catch (err) {
            console.error('Error processing withdrawal:', err);
            let errorMsg = err.response?.data?.message ||
                err.message ||
                'Failed to process withdrawal';

            if (err.response?.data?.error?.includes('card not found')) {
                errorMsg = 'Card not found. Please check the card details.';
            }

            setMessage({ text: errorMsg, isSuccess: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateDollarAmount = () => {
        return amount ? (parseFloat(amount) / exchangeRate).toFixed(2) : '0.00';
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Card Balance:</p>
                    <p className="text-lg font-bold text-gray-800">
                        ₦{formatCurrency(cardBalance)}
                    </p>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <FiInfo className="mr-1" />
                    Minimum withdrawal amount: ₦{MINIMUM_AMOUNT.toLocaleString()}
                </div>
            </div>

            {message.text && (
                <div className={`mb-4 p-3 ${message.isSuccess ?
                    'bg-green-50 text-green-700' :
                    'bg-red-50 text-red-700'} rounded-md flex items-start animate-fadeIn`}>
                    {message.isSuccess ? (
                        <FiCheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                    ) : (
                        <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0 text-red-500" />
                    )}
                    <span className="flex-grow">{message.text}</span>
                    <button
                        onClick={() => setMessage({ text: '', isSuccess: false })}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        aria-label="Dismiss message"
                    >
                        &times;
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">
                        Amount to Withdraw (₦)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">₦</span>
                        </div>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={amount ? formatCurrency(amount) : ''}
                            onChange={handleAmountChange}
                            className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                            inputMode="decimal"
                            required
                        />
                    </div>
                </div>

                {cardCurrency !== "NGN" && (
                    <div className="mb-6 space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div className="flex items-center text-sm text-gray-600">
                                <FiDollarSign className="mr-2" />
                                <span>NGN/USD Rate</span>
                            </div>
                            <span className="text-sm font-medium">₦{formatCurrency(exchangeRate)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
                            <div className="text-sm font-medium text-gray-700">
                                <span>You'll receive</span>
                            </div>
                            <span className="text-sm font-bold">
                                ${calculateDollarAmount()}
                            </span>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) < MINIMUM_AMOUNT}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) < MINIMUM_AMOUNT
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-[#4CACF0] hover:bg-[#3A9BDE]'
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        'Withdraw Funds'
                    )}
                </button>
            </form>

            <div className="mt-4 text-xs text-gray-500">
                <p>Transactions are secured with bank-level encryption. Your card details are safe.</p>
            </div>
        </div>
    );
};

CardWithdrawalForm.propTypes = {
    cardId: PropTypes.string.isRequired,
    currentCardId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    cardCurrency: PropTypes.string.isRequired
};

export default CardWithdrawalForm;