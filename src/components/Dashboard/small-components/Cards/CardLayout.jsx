import React from 'react'
import { MdCancel } from "react-icons/md";


const CardLayout = ({ cardTitle, children, closeModal }) => {
    return (
        <div className='flex flex-col gap-2 rounded-lg p-4 bg-white transition-all duration-100 w-[400px] max-lg:ml-2 max-lg:w-[95%]'>
            <div className='flex justify-between items-center'>
                <h2 className='text-[#434343] text-xl'>{cardTitle}</h2>
                <button>
                    <MdCancel onClick={closeModal} />
                </button>
            </div>
            {children}
        </div>
    )
}

export default CardLayout
