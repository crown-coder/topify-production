import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AccountCard from './AccountCard';
import { useModal } from '../../ModalContext';
import TempAccCard from './Cards/TempAccCard';
import Monie from '../../../assets/monie.png';
import Wema from '../../../assets/wema.png';
import Palmpay from '../../../assets/palmpay.png';
import NinePayment from '../../../assets/9payment.jpg';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Async fetch function
const fetchUserAccounts = async () => {
    const response = await axios.get(`/api/api2/user`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data?.funding_accounts || [];
};

const SkeletonAccountCard = () => (
    <div className="p-4 max-lg:p-2 flex max-lg:flex-col gap-5 lg:gap-4 lg:p-[10px] rounded-2xl bg-gray-300 dark:bg-gray-700 animate-pulse">
        <div className="rounded-full bg-gray-400 w-[60px] h-[60px] max-lg:w-[40px] max-lg:h-[40px]"></div>
        <div className="flex-1 text-white space-y-2">
            <Skeleton width={120} height={16} />
            <Skeleton width={180} height={14} />
            <Skeleton width={160} height={14} />
            <Skeleton width={100} height={30} />
        </div>
    </div>
);

const Accounts = () => {
    const { openModal, closeModal } = useModal();

    const {
        data: userAccounts = [],
        isLoading,
        isFetching,
        refetch,
        isError,
        error,
    } = useQuery({
        queryKey: ['user-accounts'],
        queryFn: fetchUserAccounts,
        staleTime: 1000 * 60 * 10, // 10 min
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const handleAccountModal = () => {
        openModal(<TempAccCard closeModal={closeModal} />);
    };

    const bankConfig = {
        'Wema bank': {
            color: 'bg-[#AE328E]',
            icon: Wema,
        },
        'Palmpay': {
            color: 'bg-purple-700',
            icon: Palmpay,
            iconStyle: 'w-[60px] h-[53px] max-lg:w-[40px] max-lg:h-[40px] rounded-full',
        },
        'Moniepoint Microfinance Bank': {
            color: 'bg-[#031335]',
            icon: Monie,
        },
        default: {
            color: 'bg-blue-500',
            icon: NinePayment,
            iconStyle: 'w-[65px] h-[50px] max-lg:w-[40px] max-lg:h-[40px] rounded-full',
        },
    };

    const displayAccounts = (userAccounts.length > 0
        ? userAccounts
        : [
            {
                bank_name: "Wema Bank",
                account_name: "Default User",
                account_number: "0000000000",
            },
            {
                bank_name: "Sterling Bank",
                account_name: "Default User",
                account_number: "1111111111",
            },
            {
                bank_name: "Moniepoint Microfinance Bank",
                account_name: "Default User",
                account_number: "2222222222",
            },
        ]
    ).map((account) => ({
        ...account,
        ...(bankConfig[account.bank_name] || bankConfig['default']),
    }));


    if (isLoading || isFetching) {
        return (
            <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 max-lg:gap-1'>
                    {[...Array(3)].map((_, i) => (
                        <SkeletonAccountCard key={i} />
                    ))}
                </div>
            </div>
        );
    }


    if (isError) {
        return (
            <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl text-center text-red-500'>
                Error loading accounts: {error.message}
            </div>
        );
    }

    return (
        <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className='w-full flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Accounts</h2>
                <button
                    className='px-4 py-2 rounded-lg cursor-pointer text-white text-sm bg-blue-500 hover:bg-blue-600 transition-colors'
                    onClick={handleAccountModal}
                >
                    Use Temporary account
                </button>
            </div>

            <div className='m-3 max-lg:mx-0 lg:mx-0 grid grid-cols-2 lg:grid-cols-3 gap-3 max-lg:gap-1'>
                {displayAccounts.map((account, index) => (
                    <AccountCard
                        key={index}
                        className={account.color}
                        bankIcon={account.icon}
                        bankName={account.bank_name}
                        accountName={account.account_name}
                        accountNumber={account.account_number}
                        iconBack={account.iconBack || ""}
                        iconStyle={account.iconStyle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Accounts;
