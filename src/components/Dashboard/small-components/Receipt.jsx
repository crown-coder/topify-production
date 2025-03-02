import React from 'react';
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import LOGO from '../../../assets/MTNSQRT.png';

const Receipt = () => {
    const { transactionId } = useParams();
    const location = useLocation();
    const transaction = location.state;
    const navigate = useNavigate();

    const GoBack = () => {
        navigate(-1);
    }

    if (!transaction) {
        return <p className="text-center">No transaction data found</p>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className='my-2'
        >
            <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
                <div className='relative w-full flex justify-center items-center mb-5'>
                    <h2 className="text-lg text-[#434343]">Transaction Details</h2>
                    <p className='absolute right-4 text-[#434343] italic'>29/10/2025</p>
                </div>

                <h1 className='flex items-center gap-2 w-[60%] mb-5'>
                    <span>Product:</span>
                    <img className="h-8 w-8" src={LOGO} alt="MTNSQRT Logo" />
                </h1>

                <table className='w-[60%]'>
                    <tr>
                        <td className='w-[50%] text-gray-500 text-sm pb-2'>Service Name</td>
                        <td className='pl-16 pb-2'>{transaction.description}</td>
                    </tr>
                    <tr>
                        <td className='w-[50%] text-gray-500 text-sm pb-2'>Transaction ID</td>
                        <td className='pl-16 pb-2'>{transactionId}</td>
                    </tr>
                    <tr>
                        <td className='w-[50%] text-gray-500 text-sm pb-2'>Mobile number</td>
                        <td className='pl-16 pb-2'>{transaction.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td className='w-[50%] text-gray-500 text-sm pb-2'>Amount Paid</td>
                        <td className='pl-16 pb-2'>{transaction.amount}</td>
                    </tr>
                    <tr>
                        <td className='w-[50%] text-gray-500 text-sm pb-2'>Status</td>
                        <td className='pl-16 pb-2'>{transaction.status === 1 ? (
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
                        )}</td>
                    </tr>
                </table>
                <div className='w-[60%] grid grid-cols-2 gap-3 mt-5'>
                    <button className='border rounded-md py-2 text-[#434343]' onClick={GoBack}>Back to dashboard</button>
                    <button className='border border-[#4CACF0] rounded-md py-2 text-white bg-[#4CACF0]'>Save Receipt</button>
                </div>
            </div>
        </motion.div>
    );
};

export default Receipt;
