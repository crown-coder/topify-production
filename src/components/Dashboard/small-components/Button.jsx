import React from "react";

const Button = ({ title, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-1 rounded-sm font-light text-[12px] transition ${isActive
                ? "text-blue-500 bg-white"
                : "text-[#B5B5B5]"
                }`}
        >
            {title}
        </button>
    );
};

export default Button;
