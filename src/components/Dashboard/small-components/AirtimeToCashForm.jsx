import React, { useState } from 'react'
import { useModal } from '../../ModalContext'
import LoadingCard from './Cards/LoadingCard';
import Confirmation from './Cards/Confirmation';
import CardLayout from './Cards/CardLayout'

const AirtimeToCashForm = () => {
    const { openModal, closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            openModal(
                <CardLayout closeModal={closeModal}>
                    <Confirmation />
                </CardLayout>
            )
        }, 3000);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label for='network' className='text-lg text-[#1E1E1E] font-light'>Network</label>
                            <select name='network' className='p-3 border rounded-lg'>
                                <option value="MTN">MTN</option>
                                <option value="Airtel">Airtel</option>
                                <option value="Glo">Glo</option>
                                <option value="9Mobile">9Mobile</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label for='amount' className='text-lg text-[#1E1E1E] font-light'>Amount*</label>
                            <input className='p-3 border rounded-lg' type="number" name='amount' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label for='email' className='text-lg text-[#1E1E1E] font-light'>Max Length 11</label>
                            <input className='p-3 border rounded-lg' type="text" placeholder='grimejeffy@gmail.com' name='email' />
                        </div>
                    </div>
                    <div className='flex gap-5 my-5'>
                        <input type='radio' name='method' /><span>Fund wallet</span>
                        <input type='radio' name='method' /><span>Transfer to bank</span>
                    </div>
                    <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label for='receive' className='text-lg text-[#1E1E1E] font-light'>You will receive</label>
                            <input className='p-3 border rounded-lg' type="number" name='receive' readOnly />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label for='account' className='text-lg text-[#1E1E1E] font-light'>Account Number</label>
                            <input className='p-3 border rounded-lg' type="number" name='account' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label for='bank' className='text-lg text-[#1E1E1E] font-light'>Network</label>
                            <select name='bank' className='p-3 border rounded-lg'>
                                <option value="UBA">UBA</option>
                                <option value="Union">Union</option>
                                <option value="Zenith">Zenith</option>
                                <option value="Wema">Wema</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='w-full grid grid-cols-2 gap-3 mt-5'>
                    <button className='p-4 rounded-lg border'>Cancel</button>
                    <button type='submit' className='p-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'>Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default AirtimeToCashForm
