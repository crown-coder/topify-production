import React, { useState } from 'react'
import DSTV from '../../../../assets/Dstv.png'
import STARTIMES from '../../../../assets/Startimes.png'

const TvSubForm = ({ onSubmit }) => {
    const [smartCardNumber, setSmartCardNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ smartCardNumber, amount });
    }

    return (
        <div>
            <h2 className='text-[#434343] font-normal text-lg'>TV Bill Payment</h2>
            <div className=''>
                <h4 className='text-[10px] text-[#232323D9]'>Recent transactions</h4>
                <div className='w-full flex gap-3 my-2'>
                    <button className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#4CACF0] p-1'>
                            <img src={DSTV} className='w-[30px] h-[30px] object-contain' />
                        </div>
                        <p className='text-[7px] text-[#232323D9]'>12345678</p>
                    </button>
                    <button className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#4CACF0] p-1'>
                            <img src={STARTIMES} className='w-[30px] h-[30px] object-contain' />
                        </div>
                        <p className='text-[7px] text-[#232323D9]'>12345678</p>
                    </button>
                </div>
                {/* form */}
                <div>
                    <form onSubmit={handleSubmit} className='mt-3 flex flex-col gap-5'>
                        <select className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' required>
                            <option>Cable name</option>
                        </select>
                        <input type='number' value={smartCardNumber} onChange={(e) => setSmartCardNumber(e.target.value)} placeholder='Smart card/UC number' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' required />
                        <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' required />
                        <select className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' required>
                            <option>Cable plan</option>
                        </select>
                        <button type="submit" className='w-full p-2 rounded-lg border text-white bg-[#4CACF0] cursor-pointer'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TvSubForm
