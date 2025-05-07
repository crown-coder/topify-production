import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from './Cards/VirtualCard/Card';
import NewCard from './Cards/VirtualCard/NewCard';
import { useModal } from '../../ModalContext';
import CardLayout from './Cards/CardLayout';
import NewVirtualCardForm from './Forms/NewVirtualCardForm';
import Cookies from 'js-cookie';

const VirtualCards = () => {
    const [cardType, setCardType] = useState('Naira');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState([]);

    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();


    const fetchCards = async () => {
        try {
            setLoading(true);
            setError(null);
            setCards([]);

            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const otpToken = Cookies.get('otp_verified_token');
            console.log(otpToken)

            if (!xsrfToken) {
                throw new Error('Authentication token missing');
            }

            if (otpToken == null) {
                throw new Error('OTP verification required');
            }

            const config = {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                },
                withCredentials: true
            };

            const idResponse = await axios.get('/api/Allvirtual-cards', config);
            const cardList = idResponse.data?.data;

            if (!Array.isArray(cardList) || cardList.length === 0) {
                return; // No cards available
            }

            // Fetch all card details concurrently
            const detailPromises = cardList.map(card =>
                axios.get(`/api/virtual-cards/${card.id}/details`, config)
            );

            const detailResponses = await Promise.all(detailPromises);

            const formattedCards = detailResponses.map(res => ({
                ...res.data,
                expiry: `${res.data.expiry_month}/${res.data.expiry_year.toString().slice(-2)}`
            }));

            setCards(formattedCards);
        } catch (err) {
            console.error('Error fetching virtual cards:', err);
            setError(err.message || 'Failed to load cards. Please try again.');
            setCards([]);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchCards();
    }, []);

    const handleCardPress = (card) => {
        openModal(
            <CardPasscodeModal
                card={card}
                onSuccess={() => {
                    closeModal();
                    navigate(`/dashboard/virtual-card/card-details/${card.card_id}`, {
                        state: card
                    });
                }}
                onClose={closeModal}
            />
        );
    };

    const handleCreateCard = (newCard) => {
        setCards(prev => [...prev, {
            ...newCard,
            expiry: `${newCard.expiry_month}/${newCard.expiry_year.toString().slice(-2)}`
        }]);
    };

    const handleNewCard = () => {
        openModal(
            <CardModalContent
                initialCardType={cardType}
                onCardTypeChange={setCardType}
                closeModal={closeModal}
                onCreateCard={handleCreateCard}
            />
        );
    };

    if (loading) {
        return (
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
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative my-2 p-5 rounded-xl w-full bg-white"
            >
                <div className="text-center py-10">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={fetchCards}
                        className="px-4 py-2 bg-[#4CACF0] text-white rounded-md hover:bg-[#3a8bc8]"
                    >
                        Retry
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="relative my-2 p-5 rounded-xl w-full bg-white"
        >
            <h1 className="text-lg mb-6 text-gray-600">My Virtual Cards</h1>

            {cards.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">You don't have any virtual cards yet</p>
                    <button
                        onClick={handleNewCard}
                        className="px-4 py-2 bg-[#4CACF0] text-white rounded-md hover:bg-[#3a8bc8]"
                    >
                        Create Your First Card
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-3">
                    {cards.map(card => (
                        <Card
                            key={card.card_id}
                            cardId={card.card_id}
                            className={card.card_currency === 'NGN' ? 'bg-blue-500' : 'bg-blue-950'}
                            onClick={() => handleCardPress(card)}
                            cardNumber={`**** **** **** ${card.last_4}`}
                            lastFour={card.last_4}
                            name={card.card_name}
                            expiry={card.expiry}
                            cvv={card.cvv}
                            balance={parseFloat(card.balance)}
                            currency={card.card_currency}
                        />
                    ))}
                    <NewCard onClick={handleNewCard} />

                </div>
            )}
        </motion.div>
    );
};

const CardPasscodeModal = ({ card, onSuccess, onClose }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            if (!xsrfToken) {
                throw new Error('Authentication token missing');
            }

            const config = {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            };

            const idResponse = await axios.get('/api/Allvirtual-cards', config);
            if (!idResponse.data?.data || !Array.isArray(idResponse.data.data)) {
                throw new Error('Invalid cards data received');
            }

            // Get first card ID
            const cardId = idResponse.data.data[0]?.id;

            const response = await axios.post(
                `/api/virtual-cards/verify-pin/${cardId}`,
                { pin },
                config
            );
            console.log(cardId)

            if (response.data.status === 'success') {
                onSuccess();
            } else {
                setError(response.data.message || 'Incorrect PIN. Please try again.');
            }
        } catch (err) {
            console.error('Error verifying PIN:', err);
            setError(err.response?.data?.message || 'Failed to verify PIN. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CardLayout cardTitle="Enter Card PIN" closeModal={onClose}>
            <div className="my-4">
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Please enter the 4-digit PIN for card ending with {card.last_4}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-2 mb-6">
                        <div className="flex gap-3 justify-center">
                            {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={`
                                        w-10 h-10 border-2 rounded-lg flex items-center justify-center
                                        ${pin.length === index ? 'border-[#4CACF0]' : 'border-gray-300'}
                                        ${error ? 'border-red-500' : ''}
                                        bg-white
                                    `}
                                >
                                    <input
                                        type="password"
                                        className="w-full h-full text-center text-xl font-medium outline-none bg-transparent"
                                        maxLength={1}
                                        pattern="\d"
                                        value={pin[index] || ''}
                                        onChange={(e) => {
                                            const newPin = [...pin];
                                            newPin[index] = e.target.value.replace(/\D/g, '');
                                            setPin(newPin.join('').slice(0, 4));

                                            // Auto-focus next input
                                            if (e.target.value && index < 3) {
                                                document.getElementById(`pin-${index + 1}`)?.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            // Handle backspace to move to previous input
                                            if (e.key === 'Backspace' && !pin[index] && index > 0) {
                                                document.getElementById(`pin-${index - 1}`)?.focus();
                                            }
                                        }}
                                        id={`pin-${index}`}
                                        autoFocus={index === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || pin.length !== 4}
                        className={`
                            w-full p-3 mt-2 bg-[#4CACF0] rounded-md text-white 
                            hover:bg-[#3a8bc8] transition-colors
                            ${(isLoading || pin.length !== 4) ? 'opacity-70 cursor-not-allowed' : ''}
                        `}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            'Verify PIN'
                        )}
                    </button>
                </form>
            </div>
        </CardLayout>
    );
};

const CardModalContent = ({ initialCardType, onCardTypeChange, closeModal, onCreateCard }) => {

    return (
        <CardLayout cardTitle="New Virtual Card" closeModal={closeModal}>
            <NewVirtualCardForm initialCardType={initialCardType} onCardTypeChange={onCardTypeChange} onCreateCard={onCreateCard} />
        </CardLayout>
    );
};

export default VirtualCards;