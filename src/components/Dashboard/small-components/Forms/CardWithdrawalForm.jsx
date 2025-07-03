import React, { useState, useEffect, useCallback } from 'react';
import { FiInfo, FiDollarSign, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { BsBank2 } from "react-icons/bs";
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CardWithdrawalForm = ({ cardId, onSuccess, cardCurrency, currentCardId, closeModal, cardProvider }) => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [withdrawalType, setWithdrawalType] = useState('wallet');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', isSuccess: false });
    const [cardBalance, setCardBalance] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(1550);
    const [userBanks, setUserBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');
    const [isLoadingBanks, setIsLoadingBanks] = useState(false);
    const MINIMUM_AMOUNT = cardCurrency === 'USD' ? 1 : 1000;

    const fetchExchangeRate = useCallback(async () => {
        try {
            const response = await axios.post('/api/getExchangeRates');
            if (response.data.status === 'success') {
                const providerRates = response.data[cardProvider.toLowerCase()];
                if (providerRates) {
                    setExchangeRate(providerRates.buy_rate);
                } else {
                    setExchangeRate(response.data.graph.buy_rate);
                }
            }
        } catch (err) {
            console.error('Error fetching exchange rates:', err);
            setExchangeRate(1550);
        }
    }, [cardProvider]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const xsrfToken = Cookies.get('XSRF-TOKEN');
                if (!xsrfToken) throw new Error('Authentication token missing');

                const config = {
                    headers: { 'X-XSRF-TOKEN': xsrfToken },
                    withCredentials: true
                };

                await fetchExchangeRate();

                const cardsResponse = await axios.get(`/api/Allvirtual-cards`, config);
                const matchingCard = cardsResponse.data.data.find(card => card.id === currentCardId);
                if (!matchingCard) throw new Error('Card not found');

                setCardBalance(matchingCard.balance);
            } catch (err) {
                console.error('Error fetching initial data:', err);
                setMessage({
                    text: err.response?.data?.message || 'Failed to load card details',
                    isSuccess: false
                });
            }
        };

        if (cardId) fetchInitialData();
        else setMessage({ text: 'Card not specified', isSuccess: false });
    }, [cardId, currentCardId, fetchExchangeRate]);

    useEffect(() => {
        const fetchUserBanks = async () => {
            if (withdrawalType !== 'bank') return;

            setIsLoadingBanks(true);
            try {
                const xsrfToken = Cookies.get('XSRF-TOKEN');
                if (!xsrfToken) throw new Error('Authentication token missing');

                const config = {
                    headers: { 'X-XSRF-TOKEN': xsrfToken },
                    withCredentials: true
                };

                const response = await axios.get(`/api/bank-accounts`, config);
                if (response.data?.data?.length > 0) {
                    setUserBanks(response.data.data);
                    setSelectedBank(response.data.data[0].id);
                } else {
                    setMessage({ text: 'No bank accounts found. Please add a bank account first.', isSuccess: false });
                }
            } catch (err) {
                console.error('Error fetching bank accounts:', err);
                setMessage({
                    text: err.response?.data?.message || 'Failed to load bank accounts',
                    isSuccess: false
                });
            } finally {
                setIsLoadingBanks(false);
            }
        };

        fetchUserBanks();
    }, [withdrawalType]);

    useEffect(() => {
        if (message.isSuccess) {
            const timer = setTimeout(() => setMessage({ text: '', isSuccess: false }), 5000);
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
        const numericValue = parseFloat(value || 0);
        if (isNaN(numericValue)) return '0.00';
        return numericValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const validateForm = () => {
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue)) {
            setMessage({ text: 'Please enter a valid amount', isSuccess: false });
            return false;
        }

        if (amountValue < MINIMUM_AMOUNT) {
            setMessage({
                text: `Minimum withdrawal amount is ${cardCurrency === 'NGN' ? '₦' : '$'}${MINIMUM_AMOUNT.toLocaleString()}`,
                isSuccess: false
            });
            return false;
        }

        if (amountValue > cardBalance) {
            setMessage({
                text: `Insufficient card balance (Available: ${cardCurrency === 'NGN' ? '₦' : '$'}${formatCurrency(cardBalance)})`,
                isSuccess: false
            });
            return false;
        }

        if (withdrawalType === 'bank' && !selectedBank) {
            setMessage({ text: 'Please select a bank account', isSuccess: false });
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

            const payload = {
                type: withdrawalType,
                amount: amount.toString(),
                card_id: cardId,
                currency: cardCurrency
            };

            if (withdrawalType === 'bank') {
                const selectedBankDetails = userBanks.find(bank => bank.id === selectedBank);
                if (!selectedBankDetails) throw new Error('Selected bank not found');
                payload.bankCode = selectedBankDetails.bank_code;
                payload.bankAccNo = selectedBankDetails.account_number;
            }

            const response = await axios.post(`/api/virtual-cards/payout`, payload, config);
            const isSuccess = response.data?.success || response.data?.status?.toLowerCase() === 'success';

            if (!isSuccess) throw new Error(response.data?.message || 'Withdrawal failed');

            const newBalance = cardBalance - parseFloat(amount);
            setCardBalance(newBalance);
            setMessage({
                text: response.data?.message || 'Withdrawal successful',
                isSuccess: true
            });
            setAmount('');

            if (onSuccess) onSuccess({
                amount: parseFloat(amount),
                cardId,
                newBalance,
                currency: cardCurrency
            });
        } catch (err) {
            console.error('Error processing withdrawal:', err);
            let errorMsg = err.response?.data?.message || err.message || 'Failed to process withdrawal';
            if (err.response?.data?.error?.includes('card not found')) {
                errorMsg = 'Card not found. Please check the card details.';
            } else if (err.response?.data?.error?.includes('insufficient funds')) {
                errorMsg = 'Insufficient funds for this transaction.';
            }
            setMessage({ text: errorMsg, isSuccess: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateNairaAmount = () => {
        if (!amount || isNaN(parseFloat(amount))) return '0.00';
        return formatCurrency(parseFloat(amount) * exchangeRate);
    };

    const getSelectedBankDetails = () => {
        const bank = userBanks.find(b => b.id === selectedBank);
        return bank ? (
            <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{bank.bank_name}</span>
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">{bank.account_number}</span>
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">{bank.account_name}</span>
                </div>
            </div>
        ) : null;
    };

    const handleAddAccount = () => {
        navigate('/dashboard/settings');
        closeModal();
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">Card Balance:</p>
                    <p className="text-lg font-bold text-gray-800">
                        {cardCurrency === "NGN" ? '₦' : '$'}{formatCurrency(cardBalance)}
                    </p>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <FiInfo className="mr-1" />
                    Minimum withdrawal amount: {cardCurrency === 'NGN' ? '₦' : '$'}{MINIMUM_AMOUNT.toLocaleString()}
                </div>
            </div>

            {message.text && (
                <div className={`mb-4 p-3 ${message.isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} rounded-md flex items-start animate-fadeIn`}>
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
                <div className='h-[320px] overflow-y-scroll'>
                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">
                            Amount to Withdraw ({cardCurrency === "NGN" ? '₦' : '$'})
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">{cardCurrency === "NGN" ? '₦' : '$'}</span>
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

                    <div className="mb-6">
                        <label htmlFor="withdrawalType" className="block text-gray-700 text-sm font-medium mb-2">
                            Withdrawal Method
                        </label>
                        <div className="relative">
                            <select
                                id="withdrawalType"
                                value={withdrawalType}
                                onChange={(e) => setWithdrawalType(e.target.value)}
                                className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="wallet">Wallet</option>
                                <option value="bank">Bank Account</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <BsBank2 className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {withdrawalType === 'bank' && (
                        <div className="mb-4">
                            <label htmlFor="bankAccount" className="block text-gray-700 text-sm font-medium mb-2">
                                Select Bank Account
                            </label>
                            {isLoadingBanks ? (
                                <div className="p-4 text-center text-gray-500">
                                    Loading bank accounts...
                                </div>
                            ) : userBanks.length > 0 ? (
                                <>
                                    <select
                                        id="bankAccount"
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {userBanks.map(bank => (
                                            <option key={bank.id} value={bank.id}>
                                                {bank.bank_name} - {bank.account_number}
                                            </option>
                                        ))}
                                    </select>
                                    {getSelectedBankDetails()}
                                </>
                            ) : (
                                <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                                    No bank accounts found. Please add a bank account first.
                                    <button
                                        onClick={handleAddAccount}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                        aria-label="Add Bank Account"
                                    >
                                        Add Account
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {cardCurrency === "USD" && (
                        <div className="mb-6 space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div className="flex items-center text-sm text-gray-600">
                                    <FiDollarSign className="mr-2" />
                                    <span>USD/NGN Rate (We Buy Rate)</span>
                                </div>
                                <span className="text-sm font-medium">₦{formatCurrency(exchangeRate)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
                                <div className="text-sm font-medium text-gray-700">
                                    <span>You'll receive</span>
                                </div>
                                <span className="text-sm font-bold">
                                    ₦{calculateNairaAmount()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !amount || parseFloat(amount) < MINIMUM_AMOUNT ||
                        (withdrawalType === 'bank' && (!selectedBank || userBanks.length === 0))}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors 
                        ${isSubmitting || !amount || parseFloat(amount) < MINIMUM_AMOUNT ||
                            (withdrawalType === 'bank' && (!selectedBank || userBanks.length === 0))
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
    cardCurrency: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    cardProvider: PropTypes.string.isRequired
};

export default CardWithdrawalForm;