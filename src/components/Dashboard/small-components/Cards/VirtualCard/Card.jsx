import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../../assets/logo.png';
import MasterLogo from '../../../../../assets/master.png';

const Card = ({ className, cardData, onClick }) => {
    const navigate = useNavigate();

    const handleViewDetails = (e) => {
        e.stopPropagation(); // Prevent event bubbling to parent
        if (onClick) {
            onClick(cardData);
        } else {
            // Default navigation if no onClick handler provided
            navigate(`/card-details/${cardData?.id || 'default'}`);
        }
    };

    return (
        <div
            className={`min-w-[220px] p-3 min-h-[180px] rounded-xl relative shadow-md overflow-hidden cursor-pointer ${className}`}
            onClick={() => onClick && onClick(cardData)}
        >
            {/* Watermark Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <img
                    src={Logo}
                    alt="Smart Logo"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col gap-1 h-full">
                <div className='mb-5 flex justify-between items-center'>
                    <h1 className='text-white text-xl font-light'>Smart <span className='font-bold'>Card</span></h1>
                    <div className='w-[45px] h-[45px] flex justify-center items-center bg-white rounded-full'>
                        <img src={Logo} alt="Smart Logo" className="w-8 h-8" />
                    </div>
                </div>

                <h2 className='text-white'>{cardData?.name || 'Abubakar Sadiq Muhammad'}</h2>
                <p className='text-white text-lg'>{cardData?.maskedNumber || '1234 **** **** **** 3456'}</p>

                <div className='mt-auto flex justify-between items-center'>
                    <button
                        className='text-white cursor-pointer hover:underline'
                        onClick={handleViewDetails}
                    >
                        View Details
                    </button>
                    <img src={MasterLogo} alt="Master Logo" className='w-[75px] h-[35px]' />
                </div>
            </div>
        </div>
    );
};

export default Card;