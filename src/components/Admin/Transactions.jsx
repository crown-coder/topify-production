import React, { useState } from 'react'
import { FaFilter } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import Table from './small-components/Tables/Table'

const Transactions = () => {
    const [isActive, setIsActive] = useState("All")

    const Btns = [
        { id: 1, name: "All" },
        { id: 2, name: "Data" },
        { id: 3, name: "Airtime" },
        { id: 4, name: "Wallet Transfer" },
    ]

    return (
        <div>
            <div className='p-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl flex flex-col gap-4'>
                {/* Filter Btns */}
                <div className='w-full flex justify-between items-center'>
                    <div className='flex gap-4'>
                        {Btns.map((btn, i) => (
                            <button
                                key={i}
                                onClick={() => setIsActive(btn.name)}
                                className={`pb-1 text-sm transition-all duration-100 ${isActive === btn.name ? 'text-[#2CA0F2] border-b-2 border-[#2CA0F2]' : 'text-[#434343B2]'}`}
                            >
                                {btn.name}
                            </button>
                        ))}
                    </div>
                    <p className='text-[#434343B2]'>Total: <span className='text-[#2CA0F2] font-bold'>N9000</span></p>
                </div>
                <div className='flex items-center justify-between'>
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
                            <input type='text' placeholder='Search Users by Name, or Transaction Number' className='w-[270px] max-lg:w-[180px] text-[11px] bg-transparent outline-none' />
                        </div>
                    </div>
                    <button className='py-1 px-3 bg-[#2CA0F2] text-white rounded-lg outline-none'>Fund/Debit</button>
                </div>
            </div>
            <Table />
        </div>
    )
}

export default Transactions
Transactions