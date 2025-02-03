import React, { useState } from 'react';
import CardLayout from './CardLayout';

const TempAccCard = ({ closeModal }) => {
    const [amountEntered, setAmountEntered] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleInputChange = (e) => {
        setAmountEntered(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amountEntered) {
            setIsConfirmed(true);
        }
    };

    const renderContent = () => {
        if (isConfirmed) {
            return (
                <CardLayout cardTitle="Temporary Account Payment" closeModal={closeModal}>
                    <div>
                        <h4>Transfer NGN {amountEntered}</h4>
                        <small className='text-[#BDBDBD]'>Account number expires in <span className='text-[#006CB8] font-bold'>50 Mins</span></small>
                    </div>
                    <div>
                        <h4 className='font-semibold text-[#4F4F4F]'>Bank Name</h4>
                        <p className='text-[#4F4F4F]'>Paystack</p>
                    </div>
                    <div>
                        <h4 className='font-semibold text-[#4F4F4F]'>Account Name</h4>
                        <p className='text-[#4F4F4F]'>Paystack-Smartdatalink</p>
                    </div>
                    <div>
                        <h4 className='font-semibold text-[#4F4F4F]'>Account Number</h4>
                        <p className='text-[#4F4F4F]'>0987366770</p>
                    </div>
                    <div className='text-center my-1'>
                        <p className='text-[#828282]'>
                            <span className='font-bold text-lg text-[#4F4F4F]'>NOTE</span> Kindly transfer exact amount to<br />
                            the account details above.
                        </p>
                    </div>
                    <button
                        onClick={closeModal}
                        className='w-full mt-4 py-2 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'
                    >
                        I've sent the money
                    </button>
                </CardLayout>
            );
        }

        return (
            <CardLayout cardTitle="Temporary Account Payment" closeModal={closeModal}>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="amount" className='text-sm font-light'>
                            Input amount to be transferred
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., NGN 2000"
                            name="amount"
                            id="amount"
                            value={amountEntered}
                            onChange={handleInputChange}
                            className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light'
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-full mt-4 py-2 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'
                    >
                        Next
                    </button>
                </form>
            </CardLayout>
        );
    };

    return <div>{renderContent()}</div>;
};

export default TempAccCard;
