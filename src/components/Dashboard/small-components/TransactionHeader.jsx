import { useState } from 'react'
import { FaFilter } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";
const TransactionHeader = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (

        <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl flex justify-between items-center relative'>
            <div className='flex gap-2'>
                <button className='flex items-center gap-1 border border-blue-400 text-blue-400 rounded-lg py-1 px-3 text-sm' onClick={toggleFilter}>
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
            <select className='py-2 px-2 bg-[#70BAF0] rounded-lg text-[#175682] outline-none max-lg:hidden'>
                <option value='All'>All</option>
                <option value='Date'>Date</option>
                <option value='Email'>Email</option>
            </select>

            {/* Filter Modal */}
            <div className={`p-3 rounded-xl shadow-lg bg-white absolute left-5 top-16 ${isFilterOpen ? "block" : "hidden"}`}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-[#434343] font-normal text-lg'>Filter</h2>
                    <button>
                        <MdCancel onClick={toggleFilter} />
                    </button>
                </div>
                <form className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='status' className='text-sm font-light'>Status</label>
                        <select id='status' name='status' className='p-2 rounded-lg border text-[#989898] text-sm font-light'>
                            <option value=''>Select</option>
                            <option value='pending'>Pending</option>
                            <option value='completed'>Completed</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='payment-method' className='text-sm font-light'>Payment method</label>
                        <select id='payment-method' name='payment-method' className='p-2 rounded-lg border text-[#989898] text-sm font-light'>
                            <option value=''>Select</option>
                            <option value='stripe'>stripe</option>
                            <option value='paypal'>PayPal</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='date-range' className='text-sm font-light'>Date Range</label>
                        <input type='date' id='date-range' name='date-range' className='p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='dastination' className='text-sm font-light'>Destination Account Number</label>
                        <input type='text' id='dastination' name='dastination' className='p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='col-span-2'>
                        <input type="submit" value="Apply filters" className='w-full p-2 rounded-lg border text-white bg-[#4CACF0] cursor-pointer' />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default TransactionHeader
