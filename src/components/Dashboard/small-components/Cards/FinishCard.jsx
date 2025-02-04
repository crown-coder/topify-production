import React from 'react'
import Success from '../../../../assets/success.png'
const FinishCard = ({ message }) => {
    return (
        <div className='flex flex-col items-center gap-2'>
            <img src={Success} alt="Success" className="w-[100px] h-[100px" />
            <h2 className="text-xl text-green-600 font-semibold my-3">Success</h2>
            <p className="text-[#434343] text-sm">{message}</p>
        </div>
    )
}

export default FinishCard
