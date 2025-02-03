import React, { useState } from 'react'
import CardLayout from './CardLayout';
const KycCard = ({ closeModal }) => {

    const [verifyWithBvn, setVerifyWithBvn] = useState(false);
    const [verifyWithNin, setVerifyWithNin] = useState(false);

    const renderContent = () => {
        if (verifyWithBvn) {
            return (
                <CardLayout cardTitle="Update with BVN" closeModal={closeModal}>
                    <p className='text-[#828282] text-sm'>
                        Please enter your BVN number and your details below to validate your funding accounts.
                    </p>
                    <form className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label for="Bvn" className='text-sm font-light'>BVN Number</label>
                            <input type='number' placeholder='123456789' name='Bvn' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label for="fullname" className='text-sm font-light'>Full Name</label>
                            <input type='text' placeholder='Jeff Grimes' name='fullname' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label for="Phone" className='text-sm font-light'>Phone Number</label>
                            <input type='number' placeholder='08000000000' name='Phone' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'/>
                        </div>
                        <button type='submit' className='w-full mt-4 py-2 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'>Submit</button>
                    </form>
                </CardLayout>
            )
        }
        if (verifyWithNin) {
            return (
                <CardLayout cardTitle="Update with NIN" closeModal={closeModal}>
                    <p className='text-[#828282] text-sm'>
                        Please enter your NIN number and your details below to validate your funding accounts.
                    </p>
                    <form className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label for="Nin" className='text-sm font-light'>NIN Number</label>
                            <input type='number' placeholder='123456789' name='Nin' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label for="fullname" className='text-sm font-light'>Full Name</label>
                            <input type='text' placeholder='Jeff Grimes' name='fullname' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label for="Phone" className='text-sm font-light'>Phone Number</label>
                            <input type='number' placeholder='08000000000' name='Phone' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'/>
                        </div>
                        <button type='submit' className='w-full mt-4 py-2 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'>Submit</button>
                    </form>
                </CardLayout>
            )
        }
        // Default Card
        return (
            <CardLayout cardTitle="Update KYC" closeModal={closeModal}>
                <p className='text-[#828282] text-sm'>
                    Update your KYC in order to comply with CBN standards. Choose from the below options to do so.
                </p>
                <button className='text-white bg-[#006CB8] rounded-md text-left p-2 font-bold cursor-pointer' onClick={() => setVerifyWithBvn(true)}>Update with BVN</button>
                <button className='text-white bg-[#006CB8] rounded-md text-left p-2 font-bold cursor-pointer' onClick={() => setVerifyWithNin(true)}>Update with NIN</button>
            </CardLayout>
        )
    }
    // Render content based on the verification method
    return <div>{renderContent()}</div>
}

export default KycCard
