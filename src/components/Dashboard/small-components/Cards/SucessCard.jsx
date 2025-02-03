import React from 'react'
import Success from "../../../../assets/success.png";
import { MdCancel } from "react-icons/md";
const SucessCard = ({ closeModal }) => {
    return (
        <div className="p-3 flex flex-col items-center gap-4 text-center">
            <div className="w-full flex justify-end">
                <button
                    onClick={closeModal}
                    className="text-xl"
                >
                    <MdCancel />
                </button>
            </div>
            <img src={Success} alt="Success" />
            <p className="text-center text-lg text-[#434343] font-light mb-3">
                Your payment of <span className="font-bold italic">N2000</span> for electricity was successful
            </p>
            <p className="text-center text-lg text-[#434343] font-light">
                Token no: <span className="font-bold italic">1234-6492-0930-8272-7810</span><br /> Tax ID: <span>12344538281910</span>
            </p>
        </div>
    )
}

export default SucessCard
