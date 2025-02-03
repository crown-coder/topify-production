import React from 'react'

const PlainCard = ({ className, size, duration, amount, validity, cardBgColor, handleBuyDataForm }) => {
    return (
        <div className={`${className} ${cardBgColor} bg-[#FFE89C]  p-2 rounded-lg text-center cursor-pointer`} onClick={handleBuyDataForm}>
            <h2 className='text-sm font-bold'>{size} {duration} Bundle</h2>
            <p className='text-[9px] text-[#7D7300]'>Get {size} {duration} Plan for {amount}. Valid for {validity} hrs</p>
        </div>
    )
}

export default PlainCard
