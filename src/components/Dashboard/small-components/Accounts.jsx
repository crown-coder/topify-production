import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCard from './AccountCard';
import { useModal } from '../../ModalContext';
import TempAccCard from './Cards/TempAccCard';
import Monie from '../../../assets/monie.png';
// import Sterlling from '../../../assets/sterlling.png';
import Wema from '../../../assets/wema.png';
import Palmpay from '../../../assets/palmpay.png';
import NinePayment from '../../../assets/9payment.jpg'

const Accounts = () => {
    const [loading, setLoading] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const { openModal, closeModal } = useModal();

    // Bank configuration with colors and icons
    const bankConfig = {
        'Wema bank': {
            color: 'bg-[#AE328E]',
            icon: Wema
        },
        'Palmpay': {
            color: 'bg-purple-700',
            icon: Palmpay,
            iconStyle: 'w-[60px] h-[53px] max-lg:w-[40px] max-lg:h-[40px] rounded-full'
        },
        'Moniepoint Microfinance Bank': {
            color: 'bg-[#031335]',
            icon: Monie
        },
        // Default fallback
        'default': {
            color: 'bg-blue-500',
            icon: NinePayment,
            iconStyle: 'w-[65px] h-[50px] max-lg:w-[40px] max-lg:h-[40px] rounded-full'

        }
    };

    useEffect(() => {
        const fetchUserAccounts = async () => {
            try {
                const response = await axios.get(`/api/api2/user`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUserAccounts(response.data?.funding_accounts || []);
            } catch (err) {
                console.error('Error fetching user accounts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAccounts();
    }, []);

    const handleAccountModal = () => {
        openModal(
            <TempAccCard closeModal={closeModal} />
        );
    };

    if (loading) {
        return (
            <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl flex justify-center'>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Combine user accounts with their respective styles
    const displayAccounts = userAccounts.length > 0
        ? userAccounts.map(account => ({
            ...account,
            ...(bankConfig[account.bank_name] || bankConfig['default'])
        }))
        : [
            {
                bank_name: "Wema Bank PLC",
                account_name: "Jeff Grimes",
                account_number: "0048932093",
                ...bankConfig['Wema Bank PLC']
            },
            {
                bank_name: "Sterling Bank",
                account_name: "Jeff Grimes",
                account_number: "0048932093",
                ...bankConfig['Sterling Bank'],
                iconBack: "w-[60px] h-[60px] max-lg:w-[40px] max-lg:h-[40px] rounded-full bg-gray-800 flex items-center justify-center"
            },
            {
                bank_name: "Monie Point",
                account_name: "Jeff Grimes",
                account_number: "0048932093",
                ...bankConfig['Monie Point']
            }
        ];

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