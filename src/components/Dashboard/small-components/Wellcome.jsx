import React from 'react'
import { useModal } from '../../ModalContext';
import KycCard from './Cards/KycCard';
const Wellcome = () => {
    const { openModal, closeModal } = useModal();

    const handleKYCModal = () => {
        openModal(
            <KycCard closeModal={closeModal} />
        )
    }

    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className='w-full flex max-lg:flex-col max-lg:items-start justify-between items-center'>
                <div>
                    <h2 className='font-semibold text-lg mb-[2px] text-[#434343] dark:text-white'>Welcome Back, <span>Jeff</span></h2>
                    <p className='font-light text-sm text-[#E2B93B]'>Complete your KYS to enjoy all our services. <span className='text-blue-500 cursor-pointer underline' onClick={handleKYCModal}>Proceed</span></p>
                </div>
                <div className='flex mt-3 flex-col gap-1'>
                    <p className='text-[#828282] text-lg font-light'>My Balance</p>
                    <h2 className='text-[#006CB8] text-3xl font-bold'>N0.00</h2>
                </div>
            </div>
        </div>
    )
}

export default Wellcome
