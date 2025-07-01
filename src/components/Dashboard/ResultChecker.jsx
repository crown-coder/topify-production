import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TailSpin } from 'react-loader-spinner';
import Confetti from "react-confetti";
import { useModal } from "../ModalContext";
import ResultCard from './small-components/ResultCard';
import CardLayout from './small-components/Cards/CardLayout';
import FinishCard from './small-components/Cards/FinishCard';
import Neco from '../../assets/neco.png';
import Waec from '../../assets/waec.png';
import Nabtab from '../../assets/nabtap.png';

const EXAM_CONFIG = {
    WAEC: {
        price: 3500,
        id: 1,
        image: Waec,
        bgColor: 'bg-[#61AE42]'
    },
    NECO: {
        price: 1400,
        id: 2,
        image: Neco,
        bgColor: 'bg-[#4CACF0]'
    },
    NABTEB: {
        price: 950,
        id: 3,
        image: Nabtab,
        bgColor: 'bg-[#006CBB]'
    }
};

const ResultForm = ({
    examType,
    closeModal
}) => {
    const [quantity, setQuantity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { openModal } = useModal();
    const navigate = useNavigate();

    const amount = (parseInt(quantity) || 0) * EXAM_CONFIG[examType].price;

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Allow empty value or numeric values
        if (value === '' || /^[1-9]\d*$/.test(value)) {
            setQuantity(value);
        }
    };

    const [walletBalance, setWalletBalance] = useState(0);

    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api2/user`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const balance = parseFloat(response.data?.wallet?.balance || 0);
                setWalletBalance(balance);
            } catch (err) {
                console.error('Error fetching wallet balance:', err);
            }
        }

        fetchWalletBalance();
    }, [])

    const handleFundWallet = () => {
        closeModal();
        navigate('/dashboard/fund-wallet');
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const qty = parseInt(quantity);
        if (!qty || qty < 1) {
            setError('Please enter a valid quantity (minimum 1)');
            return;
        }

        if (amount > walletBalance) {
            setError('Insufficient wallet balance. Please fund your wallet.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/result_checker`,
                {
                    quantity: qty,
                    exam_type_id: EXAM_CONFIG[examType].id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                closeModal();
                openModal(
                    <CardLayout cardTitle={`${examType} Pin Purchase`} closeModal={closeModal}>
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            recycle={false}
                            numberOfPieces={500}
                        />
                        <FinishCard
                            message={`Transaction Successful! You have purchased ${qty} ${examType} pins.`}
                        />
                    </CardLayout>
                );
            } else {
                setError(response.data.message || 'Transaction failed. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please check your balance and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [examType, quantity, closeModal, openModal, amount, walletBalance]);

    return (
        <div>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                    Wallet Balance: <span className="font-bold">₦{walletBalance.toFixed(2)}</span>
                </p>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2 mb-4'>
                    <label htmlFor='exam-name' className='text-sm font-light'>Exam Name</label>
                    <input
                        id="exam-name"
                        className='p-2 rounded-lg border text-[#989898] text-sm font-light'
                        type="text"
                        value={examType}
                        readOnly
                    />
                    <p className="text-xs text-gray-500">
                        Price per card: ₦{EXAM_CONFIG[examType].price.toLocaleString()}
                    </p>
                </div>

                <div className='flex flex-col gap-2 mb-4'>
                    <label htmlFor='quantity' className='text-sm font-light'>Quantity</label>
                    <input
                        id="quantity"
                        className='p-2 rounded-lg border text-[#333] text-sm font-light'
                        name="quantity"
                        value={quantity}
                        onChange={handleInputChange}
                        type="number"
                        min="1"
                        placeholder="Enter quantity"
                        required
                    />
                </div>

                <div className='flex flex-col gap-2 mb-4'>
                    <label htmlFor='amount' className='text-sm font-light'>Amount (₦)</label>
                    <input
                        id="amount"
                        className='p-2 rounded-lg border text-[#333] text-sm font-light'
                        type="number"
                        value={amount || ''}
                        readOnly
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
                    className="w-full p-3 mt-2 bg-[#4CACF0] rounded-md text-white font-bold flex justify-center items-center gap-2 hover:bg-[#3a9ad8] transition-colors disabled:opacity-70"
                    disabled={isLoading || !quantity || parseInt(quantity) < 1}
                >
                    {isLoading ? (
                        <>
                            <TailSpin color="#FFF" height={20} width={20} />
                            Processing...
                        </>
                    ) : (
                        'Generate Pin'
                    )}
                </button>
            </form>
        </div>
    );
};

const ResultChecker = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();

    const handleSubModal = (examType) => {
        openModal(
            <CardLayout cardTitle={`${examType} Results Checker`} closeModal={closeModal}>
                <ResultForm examType={examType} closeModal={closeModal} />
            </CardLayout>
        );
    };

    const handleNavigateToTransactionHistory = () => {
        navigate("/dashboard/result-checker/result-checker-table");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className='w-full flex flex-col items-center rounded-xl bg-white mt-2 py-8 px-5 relative'
        >
            <div className="w-full mb-8 flex justify-end">
                <button
                    className="cursor-pointer text-gray-600 text-sm flex gap-1 items-center transition-all duration-100 hover:text-[#4CACF0]"
                    onClick={handleNavigateToTransactionHistory}
                >
                    <span>View Purchase Cards</span>
                    <MdKeyboardArrowRight className="text-xl" />
                </button>
            </div>

            <div className="w-[55%] max-lg:w-[80%] grid grid-cols-2 gap-4 max-lg:grid-cols-1">
                {Object.entries(EXAM_CONFIG).map(([examType, config]) => (
                    <ResultCard
                        key={examType}
                        className={`${config.bgColor} ${examType === 'WAEC' ? 'row-span-2' : ''}`}
                        imageUrl={config.image}
                        onClick={() => handleSubModal(examType)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default ResultChecker;