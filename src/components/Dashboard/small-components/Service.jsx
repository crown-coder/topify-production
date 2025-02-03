import React from 'react'

const Service = ({ icon, title, onClick }) => {
    return (
        <button onClick={onClick} className='bg-blue-100 px-2 max-lg:px-1 py-4 rounded-xl flex flex-col items-center cursor-pointer'>
            <img src={icon} width={35} height={35} />
            <span className='text-[#006CB8] text-[16px] max-lg:text-[13px] font-light mt-4'>{title}</span>
        </button>
    )
}

export default Service
