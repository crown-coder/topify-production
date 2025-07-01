import React from 'react'
import UsersTable from './small-components/Tables/UsersTable';
import { IoMdSearch } from "react-icons/io";
import { PiUsersThreeBold } from "react-icons/pi";
import { HiOutlineShare } from "react-icons/hi";

const Users = () => {
    return (
        <div>
            <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <div className='w-full flex max-lg:flex-col max-lg:items-start justify-between items-center'>
                    <div>
                        <p className='font-semibold text-lg text-mb-[2px] text-[#434343] dark:text-white'>Total Users</p>
                        <h2 className='text-[#006CB8] font-bold text-2xl'>16</h2>
                    </div>
                    <button className='px-4 py-1 border-2 border-[#2CA0F2] font-bold text-[#2CA0F2] rounded-md'>Add User</button>
                </div>
            </div>
            <div className='flex py-2 pr-2 items-center justify-between'>
                <div className='w-full flex justify-between gap-2'>
                    {/* // search bar */}
                    <div className='flex gap-2'>
                        <div className='flex items-center gap-1 bg-gray-200 p-2 rounded-lg'>
                            <span className='text-[#2CA0F2] text-xl'>
                                <IoMdSearch />
                            </span>
                            <input type='text' placeholder='Search Users by Name, Email or Date' className='w-[270px] max-lg:w-[180px] text-[11px] bg-transparent outline-none' />
                        </div>

                        <div className='flex items-center gap-1 bg-gray-200  p-2 rounded-lg'>
                            <PiUsersThreeBold className='text-[#2CA0F2] text-xl' />
                            <select className='bg-transparent outline-none text-[#434343B2]'>
                                <option value='All'>All</option>
                                <option value='Date'>Date</option>
                                <option value='Email'>Email</option>
                            </select>
                        </div>

                        <div className='flex items-center gap-1 bg-gray-200  p-2 rounded-lg'>
                            <HiOutlineShare className='text-[#2CA0F2] text-xl' />
                            <select className='bg-transparent outline-none text-[#434343B2]'>
                                <option value='All'>All Packages</option>
                                <option value='Date'>Date</option>
                                <option value='Email'>Email</option>
                            </select>
                        </div>

                    </div>
                    <button className='bg-[#2CA0F2] px-7 py-1 rounded-lg text-white'>
                        Export
                    </button>
                </div>
            </div>
            <UsersTable />
        </div>
    )
}

export default Users
