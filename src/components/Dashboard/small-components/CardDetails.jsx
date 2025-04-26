import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';
import MasterLogo from '../../../assets/master.png';
import Logo from '../../../assets/logo.png';
import { useModal } from '../../ModalContext.jsx';
import CardLayout from './Cards/CardLayout.jsx';
import { PiWarningCircleThin } from "react-icons/pi";
import CardFundingForm from './Forms/CardFundingForm.jsx';

const CardDetails = () => {
    const { cardId } = useParams();
    const location = useLocation();
    const card = location.state;
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const [showTransactions, setShowTransactions] = useState(false);

    const goBack = () => navigate(-1);

    if (!card) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">No card data found</p>
            </div>
        );
    }

    const handleFreezeCard = () => {
        openModal(
            <CardLayout cardTitle="Freeze Card" closeModal={closeModal} >
                <div className="flex flex-col items-center">
                    <PiWarningCircleThin className="text-9xl text-[#E2B93B]" />
                    <p className="text-gray-600">Are you sure you want to freeze this card?</p>
                    <p className="text-gray-600 font-light italic mb-4">You can unfreeze it later.</p>
                    <div className="flex justify-between w-full">
                        <button
                            onClick={closeModal}
                            className="text-red-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                closeModal();
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Freeze
                        </button>
                    </div>
                </div>
            </CardLayout>
        );
    }

    const handleDeleteCard = () => {
        openModal(
            <CardLayout cardTitle="Delete Card" closeModal={closeModal} >
                <div className="flex flex-col items-center">
                    <PiWarningCircleThin className="text-9xl text-[#E2B93B]" />
                    <p className="text-gray-600">Are you sure you want to delete this card?</p>
                    <p className="text-gray-600 font-light italic mb-4">You can't undo this action later.</p>
                    <div className="flex justify-between w-full">
                        <button
                            onClick={closeModal}
                            className="text-red-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                closeModal();
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Permanently Delete
                        </button>
                    </div>
                </div>
            </CardLayout>
        );
    }

    const handleFunding = () => {
        openModal(
            <CardLayout cardTitle="Funding Card" closeModal={closeModal} >
                <CardFundingForm />
            </CardLayout>
        );
    }

    const toggleTransactions = () => {
        setShowTransactions(!showTransactions);
    }

    // Sample transaction data
    const transactions = [
        { id: 1, date: '2023-05-15', description: 'Amazon Purchase', amount: -45.99, currency: card.type === 'Dollar' ? '$' : '₦' },
        { id: 2, date: '2023-05-10', description: 'Deposit', amount: 1200.00, currency: card.type === 'Dollar' ? '$' : '₦' },
        { id: 3, date: '2023-05-05', description: 'Netflix Subscription', amount: -14.99, currency: card.type === 'Dollar' ? '$' : '₦' },
        { id: 4, date: '2023-05-01', description: 'Grocery Store', amount: -78.50, currency: card.type === 'Dollar' ? '$' : '₦' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='my-2 bg-white rounded-lg p-4'
        >
            <div className="flex items-center mb-6">
                <button
                    onClick={goBack}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-blue-100 text-blue-900 active:bg-blue-100 transition-all duration-200 shadow-sm"
                >
                    <TbArrowLeft className="flex-shrink-0" size={18} />
                    <span className="font-medium text-sm">Back to Cards</span>
                </button>
            </div>

            <div className="rounded-lg bg-white grid grid-cols-2 items-center gap-3">
                <div className={`p-4 h-fit rounded-xl shadow-lg ${card.color || 'bg-blue-500'} text-white relative`}>
                    {/* Card Header */}
                    {/* Watermark Image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <img
                            src={Logo}
                            alt="Smart Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-2xl font-light">
                            Smart <span className="font-bold">Card</span>
                        </h1>
                        <div className="w-12 h-12 flex justify-center items-center bg-white rounded-full">
                            <img src={Logo} alt="Smart Logo" className="w-10 h-10" />
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="mb-3">
                        <h2 className="text-xl font-medium mb-2">{card.name || 'Card Holder Name'}</h2>
                        <p className="text-lg tracking-wider mb-6">
                            {card.maskedNumber || '1234 4567 6758 9876'}
                        </p>

                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm opacity-80">Card Type</p>
                                <p className="font-medium">{card.type || 'Virtual Card'}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-80">Expiry Date</p>
                                <p className="font-medium">{card.expiry || 'MM/YY'}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-80">CVV</p>
                                <p className="font-medium">{card.Cvv || '---'}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-80">Balance</p>
                                <p className="font-medium">
                                    {card.type === 'Dollar' ? '$' : '₦'}
                                    {card.balance?.toLocaleString() || '0.00'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex justify-between items-center">
                        <img src={MasterLogo} alt="Mastercard" className="h-8" />
                        {/* <span className="text-sm opacity-80">
                            {card.id ? `Card ID: ${card.id}` : 'Virtual Card'}
                        </span> */}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    {/* Card Actions */}
                    <div className="grid grid-cols-4 gap-4">
                        <button onClick={handleFunding} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Fund Card
                        </button>
                        <button onClick={handleFreezeCard} className="bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition-colors">
                            Freeze Card
                        </button>
                        <button
                            onClick={toggleTransactions}
                            className={`p-2 rounded-lg transition-colors ${showTransactions ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                            Transactions
                        </button>
                        <button onClick={handleDeleteCard} className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors">
                            Delete Card
                        </button>
                    </div>

                    {/* Card Stats */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Card Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Creation Date</p>
                                <p className="font-medium">{card.createdAt || 'Not available'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Currency</p>
                                <p className="font-medium">{card.type === 'Dollar' ? 'USD' : 'NGN'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-medium text-green-600">Active</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Daily Limit</p>
                                <p className="font-medium">
                                    {card.type === 'Dollar' ? '$1,000' : '₦500,000'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showTransactions && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                >
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {transaction.currency}{Math.abs(transaction.amount).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {transactions.length === 0 && (
                            <div className="p-4 text-center text-gray-500">
                                No transactions found
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default CardDetails;