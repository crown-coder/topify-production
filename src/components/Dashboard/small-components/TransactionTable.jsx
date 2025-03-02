import React from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionData } from '../../../constants/constants';

const TransactionTable = () => {
    const navigate = useNavigate();

    // const handleRowClick = (transaction) => {
    //     navigate(`/dashboard/transactions/receipt/${transaction.transactionId}`, { state: transaction });
    // };
    const handleRowClick = (transaction) => {
        const transactionId = encodeURIComponent(transaction.transactionId); // Encode special characters
        navigate(`/dashboard/transactions/receipt/${transactionId}`, { state: transaction });
    };

    return (
        <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            {transactionData.length === 0 ? (
                <p className='text-center text-gray-500'>No transaction record</p>
            ) : (
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='border border-gray-100 py-2 rounded-lg bg-[#FAFAFA] text-[#969A98] text-sm text-left'>
                            <th className='p-2 font-light'>S/N</th>
                            <th className='font-light max-lg:hidden'>Transaction ID</th>
                            <th className='font-light'>Amount</th>
                            <th className='font-light'>Description</th>
                            <th className='font-light'>Status</th>
                            <th className='font-light max-lg:hidden'>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionData.map((transaction, index) => (
                            <tr
                                key={index}
                                className='border-b border-gray-100 text-sm text-[#434343] cursor-pointer hover:bg-gray-100'
                                onClick={() => handleRowClick(transaction)}
                            >
                                <td className='p-2'>{transaction.id}</td>
                                <td className='max-lg:hidden'>{transaction.transactionId}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.description}</td>
                                <td className='p-2 font-medium'>
                                    {transaction.status === 1 ? (
                                        <span className='p-1 text-[11px] rounded-md text-green-600 bg-[#EDFFF5]'>
                                            Successful
                                        </span>
                                    ) : transaction.status === 2 ? (
                                        <span className='p-1 text-[11px] rounded-md text-yellow-600 bg-[#FFFAEB]'>
                                            Pending
                                        </span>
                                    ) : transaction.status === 3 ? (
                                        <span className='p-1 text-[11px] rounded-md text-red-600 bg-[#FFF2F2]'>
                                            Failed
                                        </span>
                                    ) : (
                                        'Unknown'
                                    )}
                                </td>
                                <td className='max-lg:hidden'>{transaction.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionTable;
