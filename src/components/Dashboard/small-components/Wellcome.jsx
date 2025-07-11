import React from 'react';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useModal } from '../../ModalContext';
import KycCard from './Cards/KycCard';
import { MdVerified } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';

const fetchUserData = async () => {
    const response = await axios.get(`/api/api2/user`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        withCredentials: true,
    });
    return response.data;
};

const Welcome = () => {
    const { openModal, closeModal } = useModal();

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUserData,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const handleKYCModal = () => {
        openModal(<KycCard closeModal={closeModal} />);
    };

    const formatBalance = (balance) => {
        if (!balance) return '₦0.00';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2
        }).format(balance).replace('NGN', '₦');
    };

    if (isError) {
        return (
            <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <p className="text-red-500">Error: {error?.message || 'Something went wrong'}</p>
            </div>
        );
    }

    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className='w-full flex max-lg:flex-col max-lg:items-start justify-between items-center'>
                <div className="flex-1">
                    <h2 className='font-semibold text-lg mb-1 text-[#434343] dark:text-white'>
                        Welcome Back, <span>{isLoading ? <Skeleton width={100} /> : user?.name?.split(' ')[0] || 'User'}</span>
                    </h2>

                    {isLoading ? (
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
                        {isLoading ? (
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
