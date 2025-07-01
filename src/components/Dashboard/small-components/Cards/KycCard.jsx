import React, { useState } from 'react';
import axios from 'axios';
import CardLayout from './CardLayout';

const KycCard = ({ closeModal }) => {
    const [verifyWithBvn, setVerifyWithBvn] = useState(false);
    const [verifyWithNin, setVerifyWithNin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [bvnFormData, setBvnFormData] = useState({
        name: '',
        bvn: '',
        phone: ''
    });

    const [ninFormData, setNinFormData] = useState({
        nin: '',
        name: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (verifyWithBvn) {
            setBvnFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setNinFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // KYC with BVN
    const handleKYCWithBvnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.patch('/api/kyc-bvn', bvnFormData);

            if (response.status === 200 || response.status === 201) {
                alert('KYC with BVN successful!');
                closeModal();
            }
        } catch (err) {
            console.error('Error submitting BVN KYC:', err);

            // Handle 422 validation errors
            if (err.response?.status === 422) {
                const errors = err.response.data.errors || {};
                const errorMessages = [];

                // Collect all validation error messages
                for (const field in errors) {
                    errorMessages.push(...errors[field]);
                }

                setError(errorMessages.join('\n') || 'Validation failed. Please check your inputs.');
            }
            // Handle other types of errors
            else {
                setError(err.response?.data?.message ||
                    err.message ||
                    'KYC verification failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // KYC with NIN
    const handleKYCWithNinSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.patch('/api/kyc-nin', ninFormData);
            if (response.status === 200 || response.status === 201) {
                alert('KYC with NIN successful!');
                closeModal();
            }
        } catch (err) {
            console.error('Error submitting NIN KYC:', err);
            setError(err.response?.data?.message || 'KYC verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        if (verifyWithBvn) {
            return (
                <CardLayout cardTitle="Update with BVN" closeModal={closeModal}>
                    <p className='text-[#828282] text-sm mb-4'>
                        Please enter your BVN number and your details below to validate your funding accounts.
                    </p>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleKYCWithBvnSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="bvn" className='text-sm font-light'>BVN Number</label>
                            <input
                                value={bvnFormData.bvn}
                                onChange={handleChange}
                                type='text'
                                id='bvn'
                                placeholder='123456789'
                                name='bvn'
                                className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light'
                                maxLength="11"
                                pattern="[0-9]{11}"
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='text-sm font-light'>Full Name</label>
                            <input
                                value={bvnFormData.name}
                                onChange={handleChange}
                                type='text'
                                placeholder='Jeff Grimes'
                                name='name'
                                id='name'
                                className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phone" className='text-sm font-light'>Phone Number</label>
                            <input
                                value={bvnFormData.phone}
                                onChange={handleChange}
                                type='tel'
                                id='phone'
                                placeholder='08000000000'
                                name='phone'
                                className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light'
                                pattern="[0-9]{11}"
                                maxLength="11"
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full mt-4 py-3 text-white font-semibold text-lg rounded-lg bg-[#4CACF0] flex justify-center items-center'
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : 'Submit'}
                        </button>
                    </form>
                </CardLayout>
            );
        }

        if (verifyWithNin) {
            return (
                <CardLayout cardTitle="Update with NIN" closeModal={closeModal}>
                    <p className='text-[#828282] text-sm mb-4'>
                        Please enter your NIN number and your details below to validate your funding accounts.
                    </p>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleKYCWithNinSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="nin" className='text-sm font-light'>NIN Number</label>
                            <input
                                value={ninFormData.nin}
                                onChange={handleChange}
                                type='text'
                                id='nin'
                                placeholder='123456789'
                                name='nin'
                                className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light'
                                maxLength="11"
                                pattern="[0-9]{11}"
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='text-sm font-light'>Full Name</label>
                            <input
                                value={ninFormData.name}
                                onChange={handleChange}
                                type='text'
                                placeholder='Jeff Grimes'
                                name='name'
                                id='name'
                                className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phone" className='text-sm font-light'>Phone Number</label>
                            <input
                                value={ninFormData.phone}
                                onChange={handleChange}
                                type='tel'
                                id='phone'
                                placeholder='08000000000'
                                name='phone'
                                className='w-full p-3 rounded-lg border text-[#989898] text-sm font-light'
                                pattern="[0-9]{11}"
                                maxLength="11"
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full mt-4 py-3 text-white font-semibold text-lg rounded-lg bg-[#4CACF0] flex justify-center items-center'
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : 'Submit'}
                        </button>
                    </form>
                </CardLayout>
            );
        }

        // Default Card
        return (
            <CardLayout cardTitle="Update KYC" closeModal={closeModal}>
                <p className='text-[#828282] text-sm mb-4'>
                    Update your KYC in order to comply with CBN standards. Choose from the below options to do so.
                </p>
                <button
                    className='text-white bg-[#006CB8] rounded-md text-left p-3 font-bold cursor-pointer mb-3 w-full'
                    onClick={() => setVerifyWithBvn(true)}
                >
                    Update with BVN
                </button>
                <button
                    className='text-white bg-[#006CB8] rounded-md text-left p-3 font-bold cursor-pointer w-full'
                    onClick={() => setVerifyWithNin(true)}
                >
                    Update with NIN
                </button>
            </CardLayout>
        );
    };

    return <div>{renderContent()}</div>;
};

export default KycCard;