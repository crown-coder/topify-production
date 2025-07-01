import React from 'react'
import Logo from '../../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const WalletReceipt = () => {

    const navigate = useNavigate()

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div className='w-full bg-white rounded-xl p-3 flex flex-col items-center gap-7'>
            <header className='w-[45%] flex items-center justify-between'>
                <div>
                    <img src={Logo} className='w-12 h-12' alt="smart data links logo" />
                    <h2 className='font-light text-blue-950 uppercase'>Smart <br /><span className='font-bold'>Data Links</span></h2>
                </div>
                <h1 className='text-lg'>Transaction Receipt</h1>
            </header>
            <div className='w-[60%] text-center'>
                <h1 className='text-4xl font-bold text-green-600'>20,000.00</h1>
                <p className='text-xl text-[#434343]'>Amount Transfered</p>
            </div>
            <div className='p-5 w-[50%] bg-white shadow-sm rounded-md'>
                <table className='w-full'>
                    <tr>
                        <td className='text-gray-400 pb-2'>Service Name</td>
                        <td>Wallet Transfer</td>
                    </tr>
                    <tr>
                        <td className='text-gray-400 pb-2'>Transaction ID</td>
                        <td>TRX-1234567890</td>
                    </tr>
                    <tr>
                        <td className='text-gray-400 pb-2'>Sender's User Tag</td>
                        <td>John Doe</td>
                    </tr>
                    <tr>
                        <td className='text-gray-400 pb-2'>Recipient's User Tag</td>
                        <td>Jane Doe</td>
                    </tr>
                    <tr>
                        <td className='text-gray-400 pb-2'>Date & Time</td>
                        <td>27/09/2024 01:09 PM</td>
                    </tr>
                    <tr>
                        <td className='text-gray-400 pb-2'>Status</td>
                        <td>Success</td>
                    </tr>
                </table>
            </div>

            <footer className='py-3 text-center w-[60%]'>
                <p className='text-gray-400'>�� 2025 Smart Data Links. All rights reserved.</p>
                <p className='text-sm text-gray-400 italic'>Your Happiness is our satisfaction</p>

            </footer>
            {/* Printing Buttons */}
            <div className='w-[60%] grid grid-cols-2 gap-3 mt-5'>
                <button className='border rounded-md py-2 text-[#434343]' onClick={GoBack}>Back to dashboard</button>
                <button className='border border-[#4CACF0] rounded-md py-2 text-white bg-[#4CACF0]'>Save Receipt</button>
            </div>
        </div>
    )
}

export default WalletReceipt
