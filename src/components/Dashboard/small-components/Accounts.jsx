import React from 'react'
import AccountCard from './AccountCard'
import { useModal } from '../../ModalContext'
import TempAccCard from './Cards/TempAccCard'

import Monie from '../../../assets/monie.png'
import Sterlling from '../../../assets/sterlling.png'
import Wema from '../../../assets/wema.png'

const Accounts = () => {

    const { openModal, closeModal } = useModal()

    const handleAccountModal = () => {
        openModal(
            <TempAccCard closeModal={closeModal} />
        )
    }

    return (
        <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className=' w-full flex justify-between items-center'>
                <h2 className='text-xl text-gray-900'>Accounts</h2>
                <button className='p-2 rounded-lg cursor-pointer text-gray-900 text-sm bg-blue-400' onClick={handleAccountModal}>Use Temporary account</button>
            </div>
            <div className='m-3 max-lg:mx-0 lg:mx-0  grid grid-cols-2 lg:grid-cols-3 gap-3 max-lg:gap-1'>
                <AccountCard className="bg-[#AE328E]" bankIcon={Wema} bankName="Wema Bank PLC" accountName="Jeff Grimes" accountNumber="0048932093" />
                <AccountCard iconBack="w-[60px] h-[60px] max-lg:w-[40px] max-lg:h-[40px] rounded-full bg-gray-800 flex items-center justify-center" className="bg-[#F1454A]" bankIcon={Sterlling} bankName="Sterling Bank" accountName="Jeff Grimes" accountNumber="0048932093" />
                <AccountCard className="bg-[#031335]" bankIcon={Monie} bankName="Monie Point" accountName="Jeff Grimes" accountNumber="0048932093" />
            </div>
        </div>
    )
}

export default Accounts
