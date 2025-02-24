import React from 'react'

const UtilityCard = ({ title, icon }) => {
    return (
        <div className='flex justify-between items-center p-4 rounded-lg border border-[#C2D9EA]'>
            <div className='flex gap-3 items-center'>
                <div className='w-[60px] h-[60px] bg-[#C2D9EA] rounded-md flex items-center justify-center'>
                    <h2 className='text-2xl text-[#434343]'>
                        {icon}
                    </h2>
                </div>
                <div>
                    <h4>{title}</h4>
                </div>
            </div>
            <button className='rounded-md text-white font-light bg-[#2CA0F2] px-3 py-1'>Update</button>
        </div>
    )
}

export default UtilityCard
