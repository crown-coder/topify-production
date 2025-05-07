import React, { useState } from 'react'
import { TbCopy } from "react-icons/tb";
import { IoCopy } from "react-icons/io5";

const AccountCard = ({ className, bankIcon, bankName, accountName, accountNumber, iconBack, iconStyle }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        })
    }

    return (
        <div className={`relative p-4 max-lg:p-2 flex max-lg:flex-col gap-5 lg:gap-4 lg:p-[10px] rounded-2xl ${className || 'bg-blue-800'}`}>
            <div className={`rounded-full ${iconBack}`}>
                <img src={bankIcon} className={`max-lg:w-[40px] max-lg:h-[40px] ${iconStyle}`} />
            </div>
            <div className='text-white'>
                <h3 className='font-semibold lg:font-normal lg:text-sm mb-2 max-lg:mb-1'>{bankName}</h3>
                <p className='font-extralight lg:text-sm max-lg:text-[11px]'><span className="max-lg:hidden">Name:</span> <span className='font-semibold lg:font-normal'>{accountName}</span></p>
                <p className='my-2 max-lg:my-1 font-extralight lg:text-sm max-lg:text-[11px]'><span className="max-lg:hidden">Account Number:</span> <span className='font-semibold lg:font-normal'>{accountNumber}</span></p>
                <button onClick={handleCopy} className={`cursor-pointer flex gap-2 items-center mt-2 py-1 px-3 rounded-lg bg-[#FFE9F8] max-lg:absolute max-lg:right-4 max-lg:top-4 max-lg:rounded-full max-lg:p-2 max-lg:text-xl max-lg:bg-transparent ${copied ? 'text-green-500 max-lg:text-green max-lg:border-green' : 'text-orange-600 max-lg:text-red-900 max-lg:border max-lg:border-red-900'}`}>
                    <span>
                        {copied ? <IoCopy /> : <TbCopy />}
                    </span>
                    <span className='max-lg:hidden'>
                        {copied ? "Copied!" : "Copy"}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default AccountCard
