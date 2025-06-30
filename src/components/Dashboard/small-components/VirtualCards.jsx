import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from './Cards/VirtualCard/Card';
import NewCard from './Cards/VirtualCard/NewCard';
import { useModal } from '../../ModalContext';
import CardLayout from './Cards/CardLayout';
import NewVirtualCardForm from './Forms/NewVirtualCardForm';
import CardSelectionModal from './CardSelectionModal';
import KycModal from './KycModal';
import Cookies from 'js-cookie';
import GeneralLoader from './GeneralLoader';

const VirtualCards = () => {
    const [cardType, setCardType] = useState('Naira');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState(null);
    const [availableCardTypes, setAvailableCardTypes] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardholderId, setCardholderId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [showKycModal, setShowKycModal] = useState(false);

    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const config = {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                },
                withCredentials: true
            };

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api2/user`, config);
            setUserData(response.data);
            return response.data;
        } catch (err) {
            console.error('Error fetching user data:', err);
            throw err;
        }
    };

    const fetchAvailableCardTypes = async () => {
        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/getCardType`, {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                },
                withCredentials: true,
            });

            const allCards = response.data.data || [];
            const activeCards = allCards.filter(card => card.status === 'active');
            setAvailableCardTypes(activeCards);
            return activeCards;
        } catch (error) {
            console.error("Error fetching available cards:", error);
            throw error;
        }
    };

    const fetchCardholderId = async (provider) => {
        try {
            const user = await fetchUserData();
            const ids = user.cardholder_ids || {};
            return ids[provider];
        } catch (err) {
            console.error('Error fetching cardholder ID:', err);
            return null;
        }
    };

    const fetchCards = async (provider) => {
        try {
            setLoading(true);
            setError(null);

            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const otpToken = Cookies.get('otp_verified_token');

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

            const idResponse = await axios.get(`${import.meta.env.VITE_API_URL}/Allvirtual-cards?provider=${provider}`, config);
            const cardList = idResponse.data?.data || [];

            // console.log('Fetched cards:', cardList.Array.isArray(cardList) ? cardList.length : 0);


            if (!Array.isArray(cardList) || cardList.length === 0) {
                return [];
            }

            const detailPromises = cardList.map(card =>
                axios.get(`${import.meta.env.VITE_API_URL}/virtual-cards/${card.id}/details`, config)
            );

            const detailResponses = await Promise.all(detailPromises);

            return detailResponses.map(res => ({
                ...res.data,
                expiry: `${res.data.expiry_month}/${res.data.expiry_year.toString().slice(-2)}`,
                provider: provider
            }));
        } catch (err) {
            console.error('Error fetching virtual cards:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [user, cardTypes] = await Promise.all([
                fetchUserData(),
                fetchAvailableCardTypes()
            ]);

            // Check all possible providers for cards
            if (user.cardholder_ids && Object.keys(user.cardholder_ids).length > 0) {
                for (const provider of Object.keys(user.cardholder_ids)) {
                    try {
                        const cards = await fetchCards(provider);
                        if (cards && cards.length > 0) {
                            setCards(cards);
                            return;
                        }
                    } catch (err) {
                        console.error(`Error fetching cards for provider ${provider}:`, err);
                    }
                }
            }

            // If we get here, no cards were found
            setCards([]);
        } catch (err) {
            console.error('Initial data fetch error:', err);
            setError(err.message || 'Failed to load cards');
            setCards([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCardSelection = async (selectedCard) => {
        setSelectedCard(selectedCard);
        const provider = selectedCard.provider;
        const cardholderId = await fetchCardholderId(provider);
        setCardholderId(cardholderId);

        if (cardholderId) {
            try {
                const cards = await fetchCards(provider);
                setCards(cards);

                openModal(
                    <CardModalContent
                        initialCardType={cardType}
                        onCardTypeChange={setCardType}
                        closeModal={closeModal}
                        onCreateCard={handleCreateCard}
                        provider={provider}
                        cardholderId={cardholderId}
                        selectedCard={selectedCard}
                    />
                );
            } catch (err) {
                setError(err.message || 'Failed to load cards. Please try again.');
            }
        } else {
            setShowKycModal(true);
        }
    };

    const handleKycSuccess = async (responseData) => {
        setShowKycModal(false);
        const newCardholderId = await fetchCardholderId(selectedCard.provider);
        setCardholderId(newCardholderId);

        if (newCardholderId) {
            const cards = await fetchCards(selectedCard.provider);
            setCards(cards);

            openModal(
                <CardModalContent
                    initialCardType={cardType}
                    onCardTypeChange={setCardType}
                    closeModal={closeModal}
                    onCreateCard={handleCreateCard}
                    provider={selectedCard.provider}
                    cardholderId={newCardholderId}
                    selectedCard={selectedCard}
                />
            );
        }
    };

    const handleCardPress = (card) => {
        openModal(
            <CardPasscodeModal
                card={card}
                onSuccess={() => {
                    closeModal();
                    navigate(`/dashboard/virtual-card/card-details/${card.card_id}/${card.card_currency}`, {
                        state: card
                    });
                }}
                onClose={closeModal}
            />
        );
    };

    const handleCreateCard = (newCard) => {
        setCards(prev => [...(prev || []), {
            ...newCard,
            expiry: `${newCard.expiry_month}/${newCard.expiry_year.toString().slice(-2)}`,
            provider: selectedCard.provider
        }]);
    };

    const handleNewCard = () => {
        openModal(
            <CardSelectionModal
                cards={availableCardTypes}
                onSelect={handleCardSelection}
                onClose={closeModal}
            />
        );
    };

    const handleRefresh = () => {
        setError(null);
        fetchInitialData();
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    if (showKycModal) {
        return (
            <KycModal
                provider={selectedCard.provider}
                cardTypeId={selectedCard.id}
                onSuccess={handleKycSuccess}
                onClose={() => setShowKycModal(false)}
            />
        );
    }

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative my-2 p-5 rounded-xl w-full bg-white"
            >
                <GeneralLoader />
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
                        onClick={handleRefresh}
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
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <h1 className="text-lg text-gray-600">My Virtual Cards</h1>
                    <button
                        onClick={handleRefresh}
                        className="ml-3 p-1 text-gray-500 hover:text-blue-500"
                        title="Refresh cards"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
                <button
                    onClick={handleNewCard}
                    className="px-4 py-2 bg-[#4CACF0] text-white rounded-md hover:bg-[#3a8bc8] text-sm"
                >
                    + New Card
                </button>
            </div>

            {cards === null ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : cards.length === 0 ? (
                <div className="text-center py-10">
                    <img src="/empty-cards.svg" className="w-40 mx-auto mb-4" alt="No cards" />
                    <p className="text-gray-500 mb-2">You don't have any virtual cards yet</p>
                    <p className="text-sm text-gray-400 mb-4">
                        Virtual cards help you shop online securely
                    </p>
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
                            cardName={card.card_type_info}
                            className={card.card_currency === 'NGN' ? 'bg-blue-500' : 'bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950'}
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

            const response = await axios.post(
                `/api/virtual-cards/verify-pin/${card.card_id}`,
                { pin },
                config
            );

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

                                            if (e.target.value && index < 3) {
                                                document.getElementById(`pin-${index + 1}`)?.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
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

const CardModalContent = ({ initialCardType, onCardTypeChange, closeModal, onCreateCard, provider, cardholderId, selectedCard }) => {
    return (
        <CardLayout cardTitle="New Virtual Card" closeModal={closeModal}>
            <NewVirtualCardForm
                initialCardType={initialCardType}
                onCardTypeChange={onCardTypeChange}
                onCreateCard={onCreateCard}
                provider={provider}
                cardholderId={cardholderId}
                selectedCard={selectedCard}
            />
        </CardLayout>
    );
};

export default VirtualCards;