import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';
import { PiEmptyLight } from "react-icons/pi";

import Card from '../Cards/VirtualCard/Card';
import NewCard from '../Cards/VirtualCard/NewCard';
import CardLayout from '../Cards/CardLayout';
import NewVirtualCardForm from '../Forms/NewVirtualCardForm';
import CardSelectionModal from '../CardSelectionModal';
import { useModal } from '../../../ModalContext';

const fetchUser = async () => {
    const xsrf = Cookies.get('XSRF-TOKEN');
    const res = await axios.get('/api/api2/user', {
        headers: { 'X-XSRF-TOKEN': xsrf },
        withCredentials: true
    });
    return res.data;
};

const fetchAvailableCardTypes = async () => {
    const xsrf = Cookies.get('XSRF-TOKEN');
    const res = await axios.post('/api/getCardType', null, {
        headers: { 'X-XSRF-TOKEN': xsrf },
        withCredentials: true
    });
    return res.data.data?.filter(c => c.status === 'active') || [];
};

const fetchCardsByProvider = async (provider) => {
    const xsrf = Cookies.get('XSRF-TOKEN');
    const config = {
        headers: { 'X-XSRF-TOKEN': xsrf },
        withCredentials: true
    };
    const listRes = await axios.get(`/api/Allvirtual-cards?provider=${provider}`, config);
    const cardList = listRes.data.data || [];
    if (cardList.length === 0) return [];

    const detailRes = await Promise.all(
        cardList.map(card => axios.get(`/api/virtual-cards/${card.id}/details`, config))
    );

    return detailRes.map(r => ({
        ...r.data,
        expiry: `${r.data.expiry_month}/${r.data.expiry_year.toString().slice(-2)}`,
        provider
    }));
};

const VirtualCardList = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardType, setCardType] = useState('Naira');
    const [cardProvider, setCardProvider] = useState(null);
    const [cardholderId, setCardholderId] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError,
        refetch: refetchUser
    } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 10,
    });

    const {
        data: cardTypes = [],
        isLoading: isCardTypesLoading,
        refetch: refetchCardTypes
    } = useQuery({
        queryKey: ['availableCardTypes'],
        queryFn: fetchAvailableCardTypes,
        staleTime: 1000 * 60 * 10,
    });


    const {
        data: cards = [],
        isLoading: isCardsLoading,
        isError: isCardsError,
        refetch: refetchCards
    } = useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const ids = user?.cardholder_ids || {};
            const providers = Object.keys(ids);
            for (const provider of providers) {
                const result = await fetchCardsByProvider(provider);
                if (result.length > 0) {
                    setCardProvider(provider);
                    return result;
                }
            }
            return [];
        },
        enabled: !!user,
        staleTime: 1000 * 60 * 10
    });


    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refetchUser();
            await refetchCardTypes();
            await refetchCards();
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleCardClick = (card) => {
        openModal(
            <CardPasscodeModal
                card={card}
                onSuccess={() => {
                    closeModal();
                    navigate(`/dashboard/virtual-card/details/${card.card_id}/${card.card_currency}`, {
                        state: card
                    });
                }}
                onClose={closeModal}
            />
        );
    };

    const handleNewCard = () => {
        openModal(
            <CardSelectionModal
                cards={cardTypes}
                onSelect={handleCardSelection}
                onClose={closeModal}
            />
        );
    };

    const handleCardSelection = async (selectedCard) => {
        setSelectedCard(selectedCard);
        const user = await fetchUser();
        const id = user.cardholder_ids?.[selectedCard.provider];

        if (!id) {
            navigate(`/dashboard/virtual-card/kycPage/${selectedCard.id}`);
        } else {
            const newCards = await fetchCardsByProvider(selectedCard.provider);
            setCardProvider(selectedCard.provider);
            setCardholderId(id);
            openModal(
                <CardLayout cardTitle="New Virtual Card" closeModal={closeModal}>
                    <NewVirtualCardForm
                        initialCardType={cardType}
                        onCardTypeChange={setCardType}
                        onCreateCard={handleCreateCard}
                        provider={selectedCard.provider}
                        cardholderId={id}
                        selectedCard={selectedCard}
                    />
                </CardLayout>
            );
        }
    };

    const handleCreateCard = (newCard) => {
        queryClient.setQueryData(['cards'], old => [
            ...(old || []),
            {
                ...newCard,
                expiry: `${newCard.expiry_month}/${newCard.expiry_year.toString().slice(-2)}`,
                provider: selectedCard.provider
            }
        ]);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 p-5 bg-white rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-semibold text-gray-700">My Virtual Cards</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className={`bg-gray-100 text-sm px-4 py-2 rounded hover:bg-gray-200 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>

                    <button onClick={handleNewCard} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 text-sm">
                        + New Card
                    </button>
                </div>
            </div>

            {isUserLoading || isCardTypesLoading || isCardsLoading ? (
                <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={150} borderRadius={12} />
                    ))}
                </div>
            ) : isUserError || isCardsError ? (
                <div className="text-center py-10">
                    <p className="text-red-500 mb-4">Error loading cards</p>
                    <button onClick={handleRefresh} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                        Retry
                    </button>
                </div>
            ) : cards.length === 0 ? (
                <div className="text-center py-10">
                    <PiEmptyLight className="text-4xl mx-auto text-orange-400 mb-4" />
                    <p className="text-gray-500 mb-2">You don't have any virtual cards yet</p>
                    <button onClick={handleNewCard} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                        Create Your First Card
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
                    {cards.map(card => (
                        <Card
                            key={card.card_id}
                            cardId={card.card_id}
                            cardName={card.card_type_info}
                            className={card.card_currency === 'NGN' ? 'bg-blue-500' : 'bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950'}
                            onClick={() => handleCardClick(card)}
                            cardNumber={`**** **** **** ${card.last_4}`}
                            lastFour={card.last_4}
                            name={card.card_name}
                            expiry={card.expiry}
                            cvv={card.cvv}
                            balance={parseFloat(card.balance)}
                            currency={card.card_currency}
                            cardProvider={cardProvider}
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

export default VirtualCardList;
