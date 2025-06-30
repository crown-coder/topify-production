import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useModal } from '../../ModalContext';
import KycCard from './Cards/KycCard';
import { MdVerified } from "react-icons/md";

const Welcome = () => {
    const { openModal } = useModal();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleKYCModal = () => {
        openModal(<KycCard closeModal={() => { }} />);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/api2/user`);
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const formatBalance = (balance) => {
        if (!balance) return '₦0.00';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2
        }).format(balance).replace('NGN', '₦');
    };

    if (error) {
        return (
            <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className='w-full flex max-lg:flex-col max-lg:items-start justify-between items-center'>
                <div className="flex-1">
                    <h2 className='font-semibold text-lg mb-1 text-[#434343] dark:text-white'>
                        Welcome Back, <span>{loading ? <Skeleton width={100} /> : user?.name?.split(' ')[0] || 'User'}</span>
                    </h2>

                    {loading ? (
                        <Skeleton width={200} height={20} />
                    ) : user?.kyc_verified ? (
                        <p className='flex items-center gap-1 text-green-500'>
                            <MdVerified className="text-xl" />
                            <span className='text-sm'>Verified User</span>
                        </p>
                    ) : (
                        <p className='text-sm text-[#E2B93B]'>
                            Complete your KYC to enjoy all our services.
                            <button
                                className='text-blue-500 cursor-pointer underline ml-1'
                                onClick={handleKYCModal}
                            >
                                Proceed
                            </button>
                        </p>
                    )}
                </div>

                <div className='flex mt-3 lg:mt-0 flex-col gap-1 items-end lg:items-start'>
                    <p className='text-[#828282] text-sm lg:text-lg font-light'>My Balance</p>
                    <h2 className='text-[#006CB8] text-2xl lg:text-3xl font-bold'>
                        {loading ? (
                            <Skeleton width={100} height={30} />
                        ) : (
                            formatBalance(user?.wallet?.balance)
                        )}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Welcome;