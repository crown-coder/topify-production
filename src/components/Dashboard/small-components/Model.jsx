import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";

const Model = () => {
    return (
        <div className='absolute w-full h-full bg-gray-400/50 z-50 flex justify-center items-center'>
            <div className='p-5 bg-white rounded-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <h2>Result Checker</h2>
                    <button className='text-gray-600'>
                        <IoIosCloseCircle size={24} />
                    </button>
                </div>
                <form className='flex flex-col gap-4 w-[400px]'>
                    <select className='p-3 border rounded-lg text-gray-500'>
                        <option value="Exam Name">Exam Name</option>
                        <option value="WAEC">WAEC</option>
                        <option value="NECO">NECO</option>
                        <option value="NABTAB">NABTAB</option>
                    </select>
                    <input className='p-3 border rounded-lg outline-none text-gray-500' type='number' placeholder='quantity' name='quantity' required />
                    <input className='p-3 border rounded-lg outline-none text-gray-500' type='number' value='3500' readOnly />
                    <input className='w-full mt-4 py-3 outline-none text-white cursor-pointer font-semibold text-lg rounded-lg bg-[#4CACF0]' type='submit' value="Generate" />
                </form>
            </div>
        </div>
    )
}

export default Model
