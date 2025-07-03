import React, { useState, useEffect, useCallback } from 'react';
import { FiInfo, FiCreditCard, FiDollarSign, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import Cookies from 'js-cookie';

const CardFundingForm = ({ cardId, onSuccess, currency, cardProvider }) => {
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', isSuccess: false });
    const [walletBalance, setWalletBalance] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(1693);
    let MINIMUM_AMOUNT = 1000;

    if (currency === 'USD') {
        MINIMUM_AMOUNT = 1; // Minimum funding amount in USD
    } else if (currency === 'NGN') {
        MINIMUM_AMOUNT = 1000; // Minimum funding amount in NGN
    }

    const formatBalance = useCallback((balance) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(balance).replace('NGN', '₦');
    }, []);

    const fetchExchangeRate = useCallback(async () => {
        try {
            const response = await axios.post('/api/getExchangeRates');
            if (response.data.status === 'success') {
                const providerRates = response.data[cardProvider.toLowerCase()];
                if (providerRates) {
                    // Use sell_rate for funding
                    setExchangeRate(providerRates.sell_rate);
                    console.log(providerRates.sell_rate)

                } else {
                    // Fallback to graph rates if provider not found
                    setExchangeRate(response.data.graph.sell_rate);
                }
            }
        } catch (err) {
            console.error('Error fetching exchange rates:', err);
            // Fallback to default rate if API fails
            setExchangeRate(1693);
        }
    }, [cardProvider]);

    const fetchWalletData = useCallback(async () => {
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

            const [walletResponse, rateResponse] = await Promise.all([
                axios.get(`/api/api2/user`, config),
                axios.post(`/api/getExchangeRates`)
            ]);

            setWalletBalance(walletResponse.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setMessage({ text: 'Failed to fetch wallet data', isSuccess: false });
        }
    }, [fetchExchangeRate]);

    useEffect(() => {
        fetchWalletData();
    }, [fetchWalletData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', isSuccess: false });

        const amountValue = parseFloat(amount);
        if (isNaN(amountValue) || amountValue < MINIMUM_AMOUNT) {
            setMessage({
                text: `Minimum funding amount is ${currency === 'NGN' ? '₦' : '$'}${MINIMUM_AMOUNT.toLocaleString()}`,
                isSuccess: false
            });
            return;
        }

        const currentBalance = parseFloat(walletBalance?.wallet?.balance || 0);

        if (amountValue > currentBalance) {
            setMessage({ text: 'Insufficient wallet balance', isSuccess: false });
            return;
        }

        setIsSubmitting(true);

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

            const requestBody = {
                amount: amountValue.toString(),
                card_id: cardId,
                currency: currency === 'NGN' ? 'NGN' : 'USD'
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/virtual-cards/fund`,
                requestBody,
                config
            );

            const isSuccess = response.data.status === "success";
            setMessage({
                text: response.data.message || `Card funded successfully with ${currency === 'NGN' ? '₦' : '$'}${amountValue.toLocaleString()}`,
                isSuccess
            });

            if (isSuccess) {
                const newBalance = currentBalance - amountValue;
                setWalletBalance(prev => ({ ...prev, wallet: { ...prev.wallet, balance: newBalance } }));

                if (onSuccess) {
                    onSuccess({
                        amount: amountValue,
                        cardId,
                        newBalance
                    });
                }

                setAmount('');
            }
        } catch (err) {
            console.error('Error funding card:', err);
            setMessage({
                text: err.response?.data?.message || err.message || 'Failed to fund card. Please try again.',
                isSuccess: false
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };

    let fundingAmount = 0;

    if (currency === 'USD') {
        fundingAmount = amount
            ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                .format(parseFloat(amount) * exchangeRate)
            : '0.00';
    } else if (currency === 'NGN') {
        fundingAmount = amount
            ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                .format(parseFloat(amount) / exchangeRate)
            : '0.00';
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                        Wallet Balance:
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                        {formatBalance(parseFloat(walletBalance?.wallet?.balance || 0))}
                    </p>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <FiInfo className="mr-1" />
                    Minimum funding amount: {currency === 'NGN' ? '₦' : '$'}{MINIMUM_AMOUNT.toLocaleString()}
                </div>
            </div>

            {message.text && (
                <div className={`mb-4 p-3 ${message.isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} rounded-md flex items-center`}>
                    {message.isSuccess ? (
                        <FiCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                        <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{message.text}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">
                        Amount to Fund ({currency === 'NGN' ? '₦' : '$'})
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">{currency === 'NGN' ? '₦' : '$'}</span>
                        </div>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                            inputMode="decimal"
                            required
                        />
                    </div>
                </div>

                {currency === "NGN" ? null : (
                    <div className="mb-6 space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div className="flex items-center text-sm text-gray-600">
                                <FiDollarSign className="mr-2" />
                                <span>NGN/USD Rate</span>
                            </div>
                            <span className="text-sm font-medium">₦{exchangeRate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div className="text-sm text-gray-600">
                                <span>Funding Charge</span>
                            </div>
                            <span className="text-sm font-medium text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
                            <div className="text-sm font-medium text-gray-700">
                                <span>Amount in {currency === 'NGN' ? '$' : '₦'}</span>
                            </div>
                            <span className="text-sm font-bold">
                                {currency === 'NGN' ? '$' : '₦'}{fundingAmount}
                            </span>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || !amount || parseFloat(amount) < MINIMUM_AMOUNT}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting || !amount || parseFloat(amount) < MINIMUM_AMOUNT
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
                        'Fund Card'
                    )}
                </button>
            </form>

            <div className="mt-4 text-xs text-gray-500">
                <p>Transactions are secured with bank-level encryption. Your card details are safe.</p>
            </div>
        </div>
    );
};

export default CardFundingForm;