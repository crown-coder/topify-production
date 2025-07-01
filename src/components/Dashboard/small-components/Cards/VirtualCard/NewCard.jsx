import React from 'react'
import { CiCreditCard2 } from "react-icons/ci";

const NewCard = ({ onClick }) => {
    return (
        <div className='min-w-[220px] p-3 min-h-[180px] rounded-xl relative border-dashed border-2 border-blue-200 bg-blue-50 flex flex-col items-center justify-center cursor-pointer' onClick={onClick}>
            <h1>
                <CiCreditCard2 className='text-gray-400 text-7xl' />
            </h1>
            <p className='text-gray-400 text-lg'>Generate new virtual card</p>
        </div>
    )
}

export default NewCard
