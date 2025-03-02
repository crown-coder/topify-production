import React, { useState } from 'react'
import Glo from '../../../../assets/glo.png'
import Airtel from '../../../../assets/airtel.png'
import { useModal } from '../../../ModalContext'
import { MdCancel } from "react-icons/md";

const AirtimeForm = ({ onSubmit }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [airtimeAmount, setAirtimeAmount] = useState('');

    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ phoneNumber, airtimeAmount });
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-[#434343] font-normal text-lg'>TV Bill Payment</h2>
                <button>
                    <MdCancel onClick={closeModal} />
                </button>
            </div>
            <div className=''>
                <h4 className='text-[10px] text-[#232323D9]'>Recent transactions</h4>
                <div className='w-full flex gap-3 my-2'>
                    <button className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#4CACF0] p-1'>
                            <img src={Glo} className='w-[30px] h-[30px] object-contain' />
                        </div>
                        <p className='text-[7px] text-[#232323D9]'>12345678</p>
                    </button>
                    <button className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#4CACF0] p-1'>
                            <img src={Airtel} className='w-[30px] h-[30px] object-contain' />
                        </div>
                        <p className='text-[7px] text-[#232323D9]'>12345678</p>
                    </button>
                </div>
                {/* form */}
                <div>
                    <form onSubmit={handleSubmit} className='mt-3 flex flex-col gap-5'>
                        <input type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Mobile Number' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' required />
                        <input type='number' value={airtimeAmount} onChange={(e) => setAirtimeAmount(e.target.value)} placeholder='Amount Amount' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' required />
                        <button type="submit" className='w-full p-2 rounded-lg border text-white bg-[#4CACF0] cursor-pointer'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AirtimeForm
