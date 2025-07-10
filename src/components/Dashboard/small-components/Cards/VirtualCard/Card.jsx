import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetalPhoto from '../../../../../assets/metal.png';
import { useModal } from '../../../../ModalContext';
import CardLayout from '../CardLayout';
import CardFundingForm from '../../Forms/CardFundingForm';
import MasterLogo from "../../../../../assets/Master.png"
import VisaLogo from "../../../../../assets/Visa.png"
import VerveLogo from "../../../../../assets/Verve.png"

const Card = ({ className, cardData, onClick, cardNumber, cardId, name, expiry, cvv, balance, currency, lastFour, cardName, cardProvider, brand }) => {
    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    // console.log(currency)
    // Log card ID when component mounts (for debugging)
    React.useEffect(() => {
        // console.log(`Card component mounted with ID: ${cardId || 'unknown'}`);
    }, [cardId]);

    const handleOpenModal = (e) => {
        e.stopPropagation();
        console.log(`Funding card with ID: ${cardId || 'unknown'}`);
        openModal(
            <CardLayout cardTitle={`Fund Card (${lastFour || '****'})`} closeModal={closeModal}>
                <CardFundingForm cardId={cardId} currency={currency} cardProvider={cardProvider} />
            </CardLayout>
        );
    }

    const handleViewDetails = (e) => {
        e.stopPropagation();
        // console.log(`Viewing details for card ID: ${cardId || 'unknown'}`);

        if (onClick) {
            onClick(cardData);
        } else {
            navigate(`/card-details/${cardId || 'default'}`);
        }
    };

    const handleCardClick = (e) => {
        // Only log if there's no specific click handler
        if (!onClick) {
            console.log(`Card clicked (ID: ${cardId || 'unknown'})`);
        }
    };

    let renderLogo = null;

    const normalizedBrand = brand?.toLowerCase();

    if (normalizedBrand === "mastercard" || normalizedBrand === "master card") {
        renderLogo = <img src={MasterLogo} alt="MasterCard Logo" />;
    } else if (normalizedBrand === "visa") {
        renderLogo = <img src={VisaLogo} alt="Visa Logo" />;
    } else {
        renderLogo = <img src={VerveLogo} alt="Verve Logo" />;
    }

    return (
        <div
            className={`min-w-[220px] p-3 min-h-[180px] rounded-xl relative shadow-md overflow-hidden cursor-pointer ${className}`}
            onClick={handleCardClick}
            data-card-id={cardId} // Add data attribute for easy DOM inspection
        >
            {/* Watermark Image */}

            {/* Card Content */}
            <div className="relative z-10 flex flex-col gap-1 h-full">
                <div className='flex justify-between items-center'>
                    <h1 className='text-white text-xl font-light'>Virtual <span className='font-bold'>Card</span></h1>
                    <div className='w-[45px] h-[45px] flex justify-center items-center'>
                        {renderLogo}
                    </div>
                </div>

                <div className='flex items-center justify-between my-5'>
                    <div>
                        <h2 className='text-white text-lg'>{name || 'Card Holder Name'}</h2>
                        <p className='text-white text-lg'>{cardNumber || '1234 **** **** **** 3456'}</p>
                    </div>
                    <img src={MetalPhoto} className='w-[65px]' alt="Chip Contact Plate" />
                </div>

                <div className='mt-auto flex justify-between items-center'>
                    <button
                        className='text-white cursor-pointer hover:underline'
                        onClick={handleViewDetails}
                        aria-label={`View details for card ${lastFour}`}
                    >
                        View Details
                    </button>
                    <button
                        onClick={handleOpenModal}
                        className='bg-blue-800 text-white border border-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-900 transition-colors'
                        aria-label={`Fund card ${lastFour}` || '****'}
                    >
                        Fund Card
                    </button>
                    {/* <p className='text-white font-bold italic'>{brand}</p> */}
                </div>
            </div>
        </div>
    );
};

export default Card;