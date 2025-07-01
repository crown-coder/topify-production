import { GoAlertFill } from "react-icons/go";

const AlertBox = ({
    message,
    isVisible,
    onDismiss,
}) => {
    if (!isVisible) return null;

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 w-80 max-w-[90vw] z-50 animate-fade-in`}>
            <div className="flex items-start gap-3">
                <div className={`mt-1 flex-shrink-0 text-green-700`}>
                    <GoAlertFill size={30} />
                </div>
                <div className="flex-1 text-center">
                    <p className={`text-sm font-medium text-gray-400`}>{message}</p>
                    <button
                        onClick={onDismiss}
                        className={`mt-2 text-[#4CACF0] hover:opacity-80 transition-opacity text-sm font-medium `}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertBox;