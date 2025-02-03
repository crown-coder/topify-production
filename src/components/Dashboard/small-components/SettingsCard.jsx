import React from 'react';

const SettingsCard = ({ className, title, imageUrl, onClick }) => {
    return (
        <button
            className="text-left cursor-pointer w-full"
            onClick={onClick}
        >
            <div className={`p-2 lg:p-4 relative h-[100px] lg:h-[150px] rounded-xl overflow-hidden ${className}`}>
                <p className="text-xl lg:text-2xl">{title}</p>
                <img src={imageUrl} alt={title} className="absolute right-0 bottom-0 max-lg:w-[100px]" />
            </div>
        </button>
    );
};

export default SettingsCard;
