import React from 'react'
import { FaFilter } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
const TransactionHeader = () => {
    return (
        <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl flex justify-between items-center'>
            <div className='flex gap-2'>
                <button className='flex items-center gap-1 border border-blue-400 text-blue-400 rounded-lg py-1 px-3 text-sm max-lg:hidden'>
                    <FaFilter />
                    <span className='text-black'>Filter</span>
                </button>
                {/* // search bar */}
                <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-lg'>
                    <span className='text-[#2CA0F2] text-xl'>
                        <IoMdSearch />
                    </span>
                    <input type='text' placeholder='Search Users by Name, Email or Date' className='w-[270px] max-lg:w-[180px] text-[11px] bg-transparent outline-none' />
                </div>
            </div>
            <select className='py-2 px-2 bg-[#70BAF0] rounded-lg text-[#175682] outline-none'>
                <option value='All'>All</option>
                <option value='Date'>Date</option>
                <option value='Email'>Email</option>
            </select>
        </div>
    )
}

export default TransactionHeader
