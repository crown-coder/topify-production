import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';
import { FiCopy } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import { useModal } from '../../ModalContext.jsx';
import CardLayout from './Cards/CardLayout.jsx';
import { PiWarningCircleThin } from "react-icons/pi";
import CardFundingForm from './Forms/CardFundingForm.jsx';
import CardWithdrawalForm from './Forms/CardWithdrawalForm.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';

const CardDetails = () => {
    const { cardId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const [card, setCard] = useState(location.state || null);
    const [copiedField, setCopiedField] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentCardId, setCurrentCardId] = useState(null)

    const fetchCard = async () => {
        try {
            setLoading(true);
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const config = {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken
                },
                withCredentials: true
            };

            const allCardsResponse = await axios.get(`/api/Allvirtual-cards`, config);
            const allCards = allCardsResponse.data.data;

            const matchingCard = allCards.find(card => card.card_id === cardId);

            setCurrentCardId(matchingCard.id) // going to use it for funding and withdrawal

            if (!matchingCard) {
                setError('Card not found');
                return;
            }

            const cardDetailsResponse = await axios.get(`/api/virtual-cards/${matchingCard.id}/details`, config);
            const cardDetails = cardDetailsResponse.data;

            const updatedCard = {
                ...cardDetails,
                expiry: `${cardDetails.expiry_month}/${cardDetails.expiry_year.toString().slice(-2)}`
            };

            setCard(updatedCard);
        } catch (err) {
            setError('Failed to load card');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCard();
    }, [cardId]);

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        });
    };

    const handleFunding = () => {
        if (!card) return;
        openModal(
            <CardLayout cardTitle="Funding Card" closeModal={closeModal}>
                <CardFundingForm
                    cardId={card.card_id}
                    currency={card.card_currency}
                    onSuccess={() => {
                        // First close the modal
                        // Then refresh the card data
                        fetchCard();
                    }}
                />
            </CardLayout>
        );
    };

    const handleWithdraw = () => {
        if (!card) return;
        openModal(
            <CardLayout cardTitle="Withdraw Funds" closeModal={closeModal}>
                <CardWithdrawalForm
                    currentCardId={currentCardId}
                    cardId={card.card_id}
                    cardCurrency={card.card_currency}
                    onSuccess={() => {
                        fetchCard();
                    }}
                />
            </CardLayout>
        );
    };

    const handleDeleteCard = () => {
        openModal(
            <CardLayout cardTitle="Delete Card" closeModal={closeModal}>
                <div className="flex flex-col items-center">
                    <PiWarningCircleThin className="text-9xl text-[#E2B93B]" />
                    <p className="text-gray-600">Are you sure you want to delete this card?</p>
                    <p className="text-gray-600 font-light italic mb-4">You can't undo this action later.</p>
                    <div className="flex justify-between w-full">
                        <button onClick={closeModal} className="text-red-500">Cancel</button>
                        <button
                            onClick={() => {
                                closeModal();
                                navigate('/cards');
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Permanently Delete
                        </button>
                    </div>
                </div>
            </CardLayout>
        );
    };

    const goBack = () => navigate(-1);

    if (loading) return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative my-2 p-5 rounded-xl w-full bg-white"
        >
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </motion.div>
    );
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!card) return <div className="text-center py-10 text-gray-400">No card data available</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-2"
        >
            <div className="flex items-center gap-2 mb-3">
                <button
                    onClick={goBack}
                    className="bg-white text-sm flex items-center gap-1 border border-blue-100 text-blue-900 font-medium px-4 py-2.5 rounded-lg active:bg-blue-100 transition-all duration-200 shadow-sm"
                >
                    <TbArrowLeft size={18} /> Back to Cards
                </button>
            </div>
            <div className="w-full grid grid-cols-2 gap-3 bg-white rounded-lg p-3">
                <div className={`w-full h-fit rounded-xl ${card.card_currency === 'NGN' ? 'bg-blue-500' : 'bg-blue-950'} p-4 text-white`}>
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-xl font-light">
                            Smart<span className="font-semibold">Card</span>
                        </h1>
                        <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center">
                            <img src={Logo} alt="logo" className="w-10 h-10" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-normal">{card.card_name}</h2>
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-base tracking-wider">{card.card_number}</p>
                        <FiCopy
                            className="w-4 h-4 opacity-70 cursor-pointer"
                            onClick={() => copyToClipboard(card.card_number, 'number')}
                        />
                        {copiedField === 'number' && <span className="text-xs">Copied!</span>}
                    </div>

                    <div className="flex justify-between mt-3">
                        <div>
                            <p className="text-sm font-light text-gray-300">Card Type</p>
                            <p className="font-medium">{card.card_currency}</p>
                        </div>
                        <div>
                            <p className="text-sm font-light text-gray-300">Expiry</p>
                            <div className="flex items-center">
                                <p className="font-medium mr-1">{card.expiry}</p>
                                <FiCopy
                                    className="w-3 h-3 opacity-70 cursor-pointer"
                                    onClick={() => copyToClipboard(card.expiry, 'expiry')}
                                />
                                {copiedField === 'expiry' && <span className="text-xs ml-1">Copied!</span>}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-light text-gray-300">CVV</p>
                            <p className="font-medium">{card.cvv}</p>
                        </div>
                        <div>
                            <p className="text-sm font-light text-gray-300">Balance</p>
                            <p className="font-medium">{card.balance}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={handleFunding} className="bg-blue-700 text-white px-4 py-2 rounded-lg">Fund</button>
                        <button onClick={handleWithdraw} className="bg-yellow-700 text-white px-4 py-2 rounded-lg">Withdraw</button>
                        <button onClick={handleDeleteCard} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Card Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Creation Date</p>
                                <p className="font-medium">{card.createdAt}</p>
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
        </motion.div>
    );
};

export default CardDetails;