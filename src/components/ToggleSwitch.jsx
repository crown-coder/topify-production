import { useState } from "react";

const ToggleSwitch = ({ text }) => {
    const [enabled, setEnabled] = useState(false);

    const handleToggle = (event) => {
        event.preventDefault(); // Prevent form submission
        setEnabled(!enabled);
    }

    return (
        <div className="flex items-center space-x-2 text-gray-600">
            <span className='text-sm text-gray-800 font-light'>{text}:</span>
            <button
                onClick={handleToggle}
                aria-pressed={enabled}
                className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${enabled ? "bg-blue-500" : "bg-gray-500"}`}
            >
                <div
                    className={`w-3 h-3 bg-white rounded-full shadow-md transform transition ${enabled ? "translate-x-6" : "translate-x-0"}`}
                ></div>
            </button>
            <span className='text-sm text-gray-400 font-light'>{enabled ? "Enabled" : "Disabled"}</span>
        </div>
    );
};

export default ToggleSwitch;