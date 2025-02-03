import React from 'react'
import CloseIcon from "../../../../assets/close-circle.png";
import { MdCancel } from "react-icons/md";

const FailedCard = ({ closeModal }) => {
    return (
        <div>
            <div className="p-3 flex flex-col items-center gap-3">
                <div className="w-full flex justify-end">
                    <button
                        onClick={closeModal}
                        className="text-xl"
                    >
                        <MdCancel />
                    </button>
                </div>
                <img src={CloseIcon} alt="Failed" />
                <p className="text-center text-[#434343] font-light text-lg mb-5">
                    Your Wallet balance is insufficient, please recharge
                </p>
            </div>
        </div>
    )
}

export default FailedCard
