import React from 'react'

const Card = ({ className, icon, title, content, rank, iconStyle }) => {
    return (
        <div className={`${className} px-4 py-7 bg-white rounded-xl shadow-sm`}>
            <div className='flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-100'>
                <img src={icon} alt={title} className={`w-9 ${iconStyle}`} />
                <div>
                    <h4 className='text-[#121212] font-bold text-lg'>{title}</h4>
                    <p className='text-[#828282] text-sm font-light'>{rank}</p>
                </div>
            </div>
            <p className='text-[#252525] font-light leading-relaxed text-lg'>{content}</p>
        </div>
    )
}

export default Card
