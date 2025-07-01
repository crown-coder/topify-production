import React from 'react'

const DiscountCard = ({ title, ImageUrl, className }) => {
    return (
        <div className='flex justify-between items-center p-4 rounded-lg border border-[#C2D9EA]'>
            <div className='flex gap-3 items-center'>
                <img className={`${className}`} src={ImageUrl} alt={title} width={60} height={60} />
                <div>
                    <h4>{title}</h4>
                </div>
            </div>
        </div>
    )
}

export default DiscountCard
