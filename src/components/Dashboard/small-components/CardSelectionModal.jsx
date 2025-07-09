import { useState, useRef, useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const CardSelectionModal = ({ cards, onSelect, onClose }) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    // Parse the features and terms for each card
    const processedCards = cards.map(card => ({
        ...card,
        features: card.features ? JSON.parse(card.features) : [],
        terms: card.terms ? JSON.parse(card.terms) : []
    }));

    const activeCards = processedCards.filter(card => card.status === 'active');

    useEffect(() => {
        if (activeCards.length > 0 && !selectedCard) {
            setSelectedCard(activeCards[0]);
        }
    }, [activeCards]);

    const handleContinue = async () => {
        if (!selectedCard) return;

        setIsLoading(true);
        try {
            await onSelect(selectedCard);
            onClose;
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        if (sliderRef.current) {
            const scrollPosition = sliderRef.current.scrollLeft;
            const cardWidth = sliderRef.current.scrollWidth / activeCards.length;
            const newIndex = Math.round(scrollPosition / cardWidth);

            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
                setSelectedCard(activeCards[newIndex]);
            }
        }
    };

    const scrollToCard = (index) => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.clientWidth;
            sliderRef.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-white border border-white/50 shadow-lg rounded-xl p-6 max-lg:p-3 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 max-lg:mb-2">Select Card Type</h2>
            <p className="text-gray-600 mb-6 max-lg:mb-2">Choose the type of virtual card you want to create</p>
            <div className=' h-[500px] overflow-y-scroll'>
                {/* Horizontal Card Slider */}
                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 p-4 scrollbar-hide"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {activeCards.map((card, index) => (
                        <div
                            key={card.id}
                            className={`flex-shrink-0 w-full h-48 rounded-2xl cursor-pointer transition-all shadow-lg ${selectedCard?.id === card.id ? 'ring-2 ring-gray-200 scale-105' : 'ring-1 ring-gray-200'}`}
                            onClick={() => {
                                setSelectedCard(card);
                                scrollToCard(index);
                            }}
                            style={{
                                scrollSnapAlign: 'start',
                                background: card.color || '#3b82f6',
                                transform: selectedCard?.id === card.id ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                        >
                            <div className="h-full p-5 max-lg:p-3 flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs opacity-80">Virtual Card</p>
                                        <h3 className="font-bold text-lg">{card.name}</h3>
                                        <p className="text-xs mt-1">{card.cardtype}</p>
                                    </div>
                                    {selectedCard?.id === card.id && (
                                        <FaCircleCheck className="h-5 w-5 text-white" />
                                    )}
                                </div>

                                <div className="mt-4 max-lg:mt-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-sm font-medium">**** **** **** 1234</p>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <div>
                                            <p className="opacity-70">Card Holder</p>
                                            <p className="font-medium">YOUR NAME</p>
                                        </div>
                                        <div>
                                            <p className="opacity-70">Expires</p>
                                            <p className="font-medium">MM/YY</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4 max-lg:mt-2 text-xs">
                                    <p className="opacity-80">Currency: {card.currency}</p>
                                    <p className="font-medium">Limit: {card.limit}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-4 max-lg:mt-2">
                    {activeCards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-blue-500 w-6' : 'bg-gray-300'}`}
                            aria-label={`Go to card ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Card Details */}
                {selectedCard && (
                    <div className="mt-4 max-lg:mt-3 space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium mb-3 text-gray-800">Card Features:</h3>
                            <ul className="space-y-2 max-h-[150px] overflow-y-auto">
                                {selectedCard.features.length > 0 ? (
                                    selectedCard.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            {feature.supported === 1 ? (
                                                <FaCircleCheck className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            ) : (
                                                <IoClose className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                                            )}
                                            <span className="text-gray-700 text-sm">
                                                {feature.name || feature}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No features listed</p>
                                )}
                            </ul>
                        </div>

                        {selectedCard.terms.length > 0 && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium mb-3 text-gray-800">Terms & Conditions:</h3>
                                <ul className="space-y-2 max-h-[150px] overflow-y-auto">
                                    {selectedCard.terms.map((term, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-gray-700 text-sm">• {term}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                                Card Creation Fee: <span className="font-medium">{selectedCard.fee} {selectedCard.currency}</span>
                            </p>
                            {selectedCard.currency === "USD" && selectedCard.provider === "graph" && (
                                <p className="mt-2 text-sm text-red-500">Note: Bank Statement is Required for this card type</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-70 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleContinue}
                    disabled={!selectedCard || isLoading}
                    className={`px-4 py-2 rounded-lg text-white ${selectedCard && !isLoading
                        ? 'bg-[#4CACF0] hover:bg-[#3a8bc8]'
                        : 'bg-gray-400 cursor-not-allowed'
                        } transition-colors ${isLoading ? 'opacity-70' : ''}`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        'Continue'
                    )}
                </button>
            </div>
        </div>
    );
};

export default CardSelectionModal;