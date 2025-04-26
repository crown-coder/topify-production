import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from './Cards/VirtualCard/Card';
import NewCard from './Cards/VirtualCard/NewCard';
import { useModal } from '../../ModalContext';
import CardLayout from './Cards/CardLayout';
import { TbCurrencyNaira } from 'react-icons/tb';
import { FaDollarSign } from 'react-icons/fa';

const VirtualCards = () => {
    const [cardType, setCardType] = useState('Naira');
    const [cards, setCards] = useState([
        {
            id: '1',
            type: 'Naira',
            balance: 5000,
            lastFour: '1234',
            color: 'bg-blue-500',
            name: 'Abubakar Sadiq Muhammad',
            expiry: '12/25',
            Cvv: '234',
            pin: '1234' // Added default PIN for demo purposes
        },
        {
            id: '2',
            type: 'Dollar',
            balance: 100,
            lastFour: '5678',
            color: 'bg-blue-950',
            name: 'Abubakar Sadiq Muhammad',
            expiry: '10/26',
            Cvv: '234',
            pin: '5678' // Added default PIN for demo purposes
        }
    ]);

    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const handleCardPress = (card) => {
        openModal(
            <CardPasscodeModal
                card={card}
                onSuccess={() => {
                    closeModal();
                    navigate(`/dashboard/virtual-card/card-details/${card.id}`, { state: card });
                }}
                onClose={closeModal}
            />
        );
    };

    const handleCreateCard = (newCard) => {
        setCards([...cards, newCard]);
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="relative my-2 p-5 rounded-xl w-full bg-white"
        >
            <h1 className="text-lg mb-6 text-gray-600">My Virtual Cards</h1>
            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-3">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        className={card.color}
                        onClick={() => handleCardPress(card)}
                        cardNumber={`**** **** **** ${card.lastFour}`}
                        name={card.name}
                        expiry={card.expiry}
                        cvv={card.Cvv}
                        balance={card.balance}
                        currency={card.type === 'Naira' ? '₦' : '$'}
                    />
                ))}
                <NewCard onClick={handleNewCard} />
            </div>
        </motion.div>
    );
};

const CardPasscodeModal = ({ card, onSuccess, onClose }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Password verification 
        setTimeout(() => {
            if (pin === card.pin) {
                onSuccess();
            } else {
                setError('Incorrect PIN. Please try again.');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <CardLayout cardTitle="Enter Card PIN" closeModal={onClose}>
            <div className="my-4">
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Please enter the 4-digit PIN for card ending with {card.lastFour}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-2 mb-6">
                        {/* <label htmlFor="pin" className="text-sm font-light">
                            Card PIN
                        </label> */}

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
    const [cardType, setCardType] = useState(initialCardType);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        fundingAmount: '',
        pin: '',
        billingAddress: ''
    });

    const handleCardTypeChange = (type) => {
        setCardType(type);
        onCardTypeChange(type);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newCard = {
                id: Date.now().toString(),
                type: cardType,
                balance: parseFloat(formData.fundingAmount),
                lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
                color: cardType === 'Naira' ? 'bg-blue-500' : 'bg-blue-950',
                name: 'Abubakar Sadiq Muhammad', // Default name
                expiry: `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}/${Math.floor(Math.random() * 5 + 24)}`,
                pin: formData.pin // Store the PIN with the card
            };

            onCreateCard(newCard);
            closeModal();
        } catch (error) {
            console.error('Error creating card:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <CardLayout cardTitle="New Virtual Card" closeModal={closeModal}>
            <div className="grid grid-cols-2 gap-2 my-5">
                <button
                    onClick={() => handleCardTypeChange('Naira')}
                    className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-colors ${cardType === 'Naira'
                        ? 'bg-blue-300/10 text-[#4CACF0] border-b-2 border-[#4CACF0]'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                >
                    <TbCurrencyNaira className="text-3xl" />
                    <span>Naira Card</span>
                </button>
                <button
                    onClick={() => handleCardTypeChange('Dollar')}
                    className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-colors ${cardType === 'Dollar'
                        ? 'bg-blue-300/10 text-[#4CACF0] border-b-2 border-[#4CACF0]'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                >
                    <FaDollarSign className="text-3xl" />
                    <span>Dollar Card</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="fundingAmount" className="text-sm font-light">
                        Funding Amount ({cardType === 'Naira' ? '₦' : '$'})
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            {cardType === 'Naira' ? '₦' : '$'}
                        </span>
                        <input
                            className="w-full pl-8 p-2 rounded-lg border text-[#989898] text-sm font-light"
                            type="number"
                            name="fundingAmount"
                            value={formData.fundingAmount}
                            onChange={handleChange}
                            min={cardType === 'Naira' ? 100 : 10}
                            step="any"
                            placeholder={`Minimum ${cardType === 'Naira' ? '₦100' : '$10'}`}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="pin" className="text-sm font-light">
                        New PIN (4 digits)
                    </label>
                    <input
                        className="p-2 rounded-lg border text-[#989898] text-sm font-light"
                        name="pin"
                        type="password"
                        value={formData.pin}
                        onChange={handleChange}
                        placeholder="Enter 4-digit PIN"
                        maxLength={4}
                        pattern="\d{4}"
                        title="Please enter exactly 4 digits"
                        required
                    />
                </div>

                {cardType === 'Dollar' && (
                    <div className="flex flex-col gap-2">
                        <label htmlFor="billingAddress" className="text-sm font-light">
                            Billing Address
                        </label>
                        <input
                            className="p-2 rounded-lg border text-[#989898] text-sm font-light"
                            name="billingAddress"
                            type="text"
                            value={formData.billingAddress}
                            onChange={handleChange}
                            placeholder="Enter billing address"
                            required
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isCreating}
                    className={`w-full p-3 mt-2 bg-[#4CACF0] rounded-md text-white hover:bg-[#3a8bc8] transition-colors ${isCreating ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isCreating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        `Create ${cardType} Card`
                    )}
                </button>
            </form>
        </CardLayout>
    );
};

export default VirtualCards;