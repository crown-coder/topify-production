import React from 'react'

const Balance = () => {
    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className='w-full flex max-lg:flex-col max-lg:items-start justify-between items-center'>
                <div>
                    <p className='font-semibold text- mb-[2px] text-[#434343] dark:text-white'>No. of Logins Today</p>
                    <h2 className='text-[#006CB8] font-bold '>22</h2>
                </div>
                <div className='flex mt-3 flex-col gap-1'>
                    <p className='text-[#828282] text-lg font-light'>My Balance</p>
                    <h2 className='text-[#006CB8] text-3xl font-bold'>N0.00</h2>
                </div>
            </div>
        </div>
    )
}

export default Balance
