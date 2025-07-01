import { useState, useEffect } from 'react';

const StillThereModal = ({ onConfirm, onTimeout, countdown }) => {
    const [timeLeft, setTimeLeft] = useState(countdown);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeout();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, onTimeout]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Are you still there?</h2>
                <p className="mb-4">
                    Your session is about to expire. Please confirm to continue.
                </p>
                <div className="mb-4">
                    <p>Time remaining: {timeLeft} seconds</p>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={onConfirm}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Yes, I'm here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StillThereModal;