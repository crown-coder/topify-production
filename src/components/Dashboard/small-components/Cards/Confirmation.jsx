import React from 'react'
import { useLocation } from "react-router-dom"
import { PiWarningCircleThin } from "react-icons/pi";

const Confirmation = ({ smartCardNo, amount, closeModal, handleTransaction, phoneNumber, phoneNo, dataPurchase, airtimeAmount }) => {
    const location = useLocation();

    const rendertext = () => {
        if (location.pathname === "/dashboard/pay-tv-bill") {
            return (
                <p className="text-center text-sm text-[#434343]">
                    You are about to pay Dstv smart card no:<br />
                    <span className="font-bold">{smartCardNo}</span> with <span className='font-bold'>N{amount}</span>
                    <br />
                    Do you want to proceed?
                </p>
            )
        } else if (location.pathname === "/dashboard/buy-airtime") {
            return (
                <p className="text-center text-sm text-[#434343]">
                    You are about to Recharge to: <br />
                    <span className="font-bold">{phoneNumber}</span> for <span className='font-bold'>N{airtimeAmount}</span>
                    <br />
                    Do you want to proceed?
                </p>
            )
        } else if (location.pathname === "/dashboard/buy-data") {
            return (
                <p className="text-center text-sm text-[#434343]">
                    You are Sending <span className='font-bold'>{dataPurchase}GB</span> to <span className="font-bold">{phoneNo}</span>
                    <br />
                    Do you want to proceed?
                </p>
            )
        }
    }

    return (
        <div className="p-3 flex flex-col items-center gap-4">
            <PiWarningCircleThin className="text-9xl text-[#E2B93B]" />
            {rendertext()}
            <div className="w-full grid grid-cols-2 gap-5">
                <button
                    onClick={closeModal}
                    className="bg-[#4CACF0] py-2 rounded-lg text-white text-lg cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleTransaction}
                    className="bg-[#4CACF0] py-2 rounded-lg text-white text-lg cursor-pointer"
                >
                    Yes
                </button>
            </div>
        </div>
    )
}

export default Confirmation
