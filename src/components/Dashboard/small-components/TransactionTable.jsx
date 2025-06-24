import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionTable = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/transactions?search=&page=1&pageSize=10`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const handleRowClick = (transaction) => {
        navigate(`/dashboard/transactions/receipt/${transaction.id}`, {
            state: transaction
        });
    };

    const formatAmount = (amount) => {
        if (!amount) return '₦0.00';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2
        }).format(amount).replace('NGN', '₦');
    };

    if (loading) {
        return (
            <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <p className='text-center py-4'>Loading transactions...</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <p className='text-center py-4 text-gray-500'>No transaction records found</p>
            </div>
        );
    }

    return (
        <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl overflow-x-auto'>
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='border border-gray-100 py-2 rounded-lg bg-[#FAFAFA] dark:bg-gray-700 text-[#969A98] text-sm text-left'>
                        <th className='p-3 font-light'>S/N</th>
                        <th className='p-3 font-light max-lg:hidden'>Reference</th>
                        <th className='p-3 font-light'>Amount</th>
                        <th className='p-3 font-light'>Description</th>
                        <th className='p-3 font-light'>Status</th>
                        <th className='p-3 font-light max-lg:hidden'>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr
                            key={transaction.id}
                            className='border-b border-gray-100 dark:border-gray-700 text-sm text-[#434343] dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                            onClick={() => handleRowClick(transaction)}
                        >
                            <td className='p-3'>{index + 1}</td>
                            <td className='p-3 max-lg:hidden'>{transaction.reference}</td>
                            <td className='p-3'>{formatAmount(parseFloat(transaction.amount))}</td>
                            <td className='p-3'>{transaction.description}</td>
                            <td className='p-3'>
                                {transaction.status === 'success' ? (
                                    <span className='px-2 py-1 text-xs rounded-md text-green-600 dark:text-green-400 bg-[#EDFFF5] dark:bg-green-900'>
                                        Successful
                                    </span>
                                ) : transaction.status === 'pending' ? (
                                    <span className='px-2 py-1 text-xs rounded-md text-yellow-600 dark:text-yellow-400 bg-[#FFFAEB] dark:bg-yellow-900'>
                                        Pending
                                    </span>
                                ) : (
                                    <span className='px-2 py-1 text-xs rounded-md text-red-600 dark:text-red-400 bg-[#FFF2F2] dark:bg-red-900'>
                                        Failed
                                    </span>
                                )}
                            </td>
                            <td className='p-3 max-lg:hidden'>
                                {transaction.transactionable?.phone_number || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;