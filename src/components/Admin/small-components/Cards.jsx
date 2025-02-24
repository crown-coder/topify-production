import React from 'react'

const Cards = ({ title, preType, PreSubtype, data, airtime, imageUrl }) => {
    return (
        <div className='flex justify-between items-center p-4 rounded-lg border border-[#C2D9EA]'>
            <div className='flex gap-3 items-center'>
                <img src={imageUrl} alt={title} width={60} height={60} />
                <div>
                    <h4>{title}</h4>
                    <p className='text-sm text-[#434343B2]'>{preType}: <span className='text-[#434343]'>{data}</span></p>
                    <p className='text-sm text-[#434343B2]'>{PreSubtype}: <span className='text-[#434343]'>{airtime}</span></p>
                </div>
            </div>
            <button className='rounded-md text-white font-light bg-[#2CA0F2] px-3 py-1'>Update</button>
        </div>
    )
}

export default Cards
