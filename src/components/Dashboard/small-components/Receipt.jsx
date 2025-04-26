import React from 'react';
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png'

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
            <div className='w-full bg-white rounded-xl p-3 flex flex-col items-center gap-7'>
                <header className='w-[45%] flex items-center justify-between'>
                    <div>
                        <img src={Logo} className='w-12 h-12' alt="smart data links logo" />
                        <h2 className='font-light text-blue-950 uppercase'>Smart <br /><span className='font-bold'>Data Links</span></h2>
                    </div>
                    <h1 className='text-lg'>Transaction Receipt</h1>
                </header>

                {/* <h1 className='flex items-center gap-2 w-[60%] mb-5'>
                    <span>Product:</span>
                    <img className="h-8 w-8" src={LOGO} alt="MTNSQRT Logo" />
                </h1> */}
                <div className='w-[60%] text-center'>
                    <h1 className='text-4xl font-bold text-green-600'>{transaction.amount}</h1>
                    <p className='text-xl text-[#434343]'>Amount Transfered</p>
                </div>
                <div className='p-5 w-[50%] bg-white shadow-sm rounded-md'>
                    <table className='w-full'>
                        <tr>
                            <td className='text-gray-400 pb-2'>Service Name</td>
                            <td>{transaction.description}</td>
                        </tr>
                        <tr>
                            <td className='text-gray-400 pb-2'>Transaction ID</td>
                            <td>{transactionId}</td>
                        </tr>
                        <tr>
                            <td className='text-gray-400 pb-2'>Mobile number</td>
                            <td>{transaction.transactionable?.phone_number}</td>
                        </tr>
                        <tr>
                            <td className='text-gray-400 pb-2'>Amount Paid</td>
                            <td>{transaction.amount}</td>
                        </tr>
                        <tr>
                            <td className='text-gray-400 pb-2'>Status</td>
                            <td>
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
                        </tr>
                    </table>
                </div>
                <div className='w-[60%] grid grid-cols-2 gap-3 mt-5'>
                    <button className='border rounded-md py-2 text-[#434343]' onClick={GoBack}>Back to dashboard</button>
                    <button className='border border-[#4CACF0] rounded-md py-2 text-white bg-[#4CACF0]'>Save Receipt</button>
                </div>
            </div>
        </motion.div>
    );
};

export default Receipt;
