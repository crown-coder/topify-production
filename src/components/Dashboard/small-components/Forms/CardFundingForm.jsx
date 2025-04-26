import React, { useState } from 'react';
import { FiInfo, FiCreditCard, FiDollarSign } from 'react-icons/fi';

const CardFundingForm = () => {
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Card funded successfully with ₦${amount}`);
            setAmount('');
        }, 1500);
    };

    return (
        <div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                        Available Balance:
                    </p>
                    <p className="text-lg font-bold text-gray-500">₦2,000.00</p>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <FiInfo className="mr-1" />
                    Minimum funding amount: ₦500.00
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">
                        Amount to Fund (₦)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">₦</span>
                        </div>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                            min="500"
                            step="100"
                            required
                        />
                    </div>
                </div>

                <div className="mb-6 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div className="flex items-center text-sm text-gray-600">
                            <FiDollarSign className="mr-2" />
                            <span>NGN/USD Rate</span>
                        </div>
                        <span className="text-sm font-medium">₦1,693.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600">
                            <span>Funding Charge</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
                        <div className="text-sm font-medium text-gray-700">
                            <span>You'll receive</span>
                        </div>
                        <span className="text-sm font-bold">
                            {amount ? `$${(amount / 1693).toFixed(2)}` : '$0.00'}
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !amount}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting || !amount ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#4CACF0] hover:bg-[#3A9BDE]'}`}
                >
                    {isSubmitting ? 'Processing...' : 'Fund Card'}
                </button>
            </form>

            <div className="mt-4 text-xs text-gray-500">
                <p>Transactions are secured with bank-level encryption. Your card details are safe.</p>
            </div>
        </div>
    );
};

export default CardFundingForm;