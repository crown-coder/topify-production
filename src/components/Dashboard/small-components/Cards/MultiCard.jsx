import React from 'react'
import { IoMdTime } from "react-icons/io";
import { MdOutlinePriceChange } from "react-icons/md";

const MultiCard = ({ className, size, duration, amount, validity, cardBgColor, handleBuyDataForm }) => {
    return (
        <div className={`bg-[#FFE89C] p-2 rounded-lg flex flex-col text-center items-center justify-around ${className} ${cardBgColor} cursor-pointer`} onClick={handleBuyDataForm}>
            <div>
                <h2 className='text-sm lg:text-lg font-bold'>{size} {duration} Bundle</h2>
                <p className='text-[9px] lg:text-[12px] text-[#7D7300]'>Get {size} Hourly Plan for {amount}.<br />Valid for {validity} hrs</p>
            </div>
            <div className='flex justify-center items-center mt-1'>
                <div className='pr-1'>
                    <span className='flex g-[3px] items-center'>
                        <IoMdTime />
                        <span className='text-[9px] text-[#7D7300]'>Validity</span>
                    </span>
                    <h4>{validity} day</h4>
                </div>
                <div className='w-[1px] bg-black h-full'></div>
                <div className='pl-1'>
                    <span className='flex g-[3px] items-center'>
                        <MdOutlinePriceChange />
                        <span className='text-[9px] text-[#7D7300]'>Price</span>
                    </span>
                    <h4>{amount}</h4>
                </div>
            </div>
        </div>
    )
}

export default MultiCard
