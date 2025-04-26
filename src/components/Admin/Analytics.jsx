import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import AnalyticTable from './small-components/Tables/AnalyticTable';

const Analytics = () => {
    const [isActive, setIsActive] = useState("Transaction Summary")
    const Btns = [
        { id: 1, name: "Transaction Summary" },
        { id: 2, name: "Retention" }
    ]

    return (
        <div>
            <div className='p-3 bg-white dark:bg-gray-800 w-full mt-2 rounded-xl flex flex-col gap-4 border'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex gap-4'>
                        {Btns.map((btn, i) => (
                            <button
                                key={i}
                                onClick={() => setIsActive(btn.name)}
                                className={`pb-[5px] text-[13px] transition-all duration-100 ${isActive === btn.name ? 'text-[#2CA0F2] border-b-2 border-[#2CA0F2]' : 'text-[#434343B2]'}`}
                            >
                                {btn.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='w-full flex justify-between gap-2'>
                        {/* // search bar */}
                        <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-lg'>
                            <span className='text-[#2CA0F2] text-xl'>
                                <IoMdSearch />
                            </span>
                            <input type='text' placeholder='Search Users by Name, Email or Date' className='w-[270px] max-lg:w-[180px] text-[11px] bg-transparent outline-none' />
                        </div>
                        <button className='bg-[#2CA0F2] px-10 py-1 rounded-lg text-white'>
                            Export
                        </button>
                    </div>
                </div>
            </div>
            <AnalyticTable />
        </div>
    )
}

export default Analytics
