import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CardTransactionTable = ({ cardId, cardCurrency }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        if (!cardId || !cardCurrency) return;
        console.log("The id is ", cardId, "The card currency ", cardCurrency)
        console.log("Effect triggered → cardId:", cardId, ", cardCurrency:", cardCurrency);

        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const xsrfToken = Cookies.get('XSRF-TOKEN');

                const response = await axios.get(
                    `/api/virtual-cards/transactions/${cardId}?page=1&currency=${cardCurrency}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
                        },
                        withCredentials: true,
                    }
                );

                // console.log("Fetched transaction for card:", cardId, response.data);

                if (response.data.status === 'success') {
                    setTransactions(response.data.data.transactions || []);
                    setError(null);
                } else {
                    setTransactions([]);
                    setError(response.data.message || 'No transactions found');
                }
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [cardId, cardCurrency]);


    const handleRowClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseReceipt = () => {
        setSelectedTransaction(null);
    };

    if (loading) {
        return <div className="w-full my-3 rounded-lg bg-white p-4">Loading transactions...</div>;
    }

    if (error) {
        return <div className="w-full my-3 rounded-lg bg-white p-4">{error}</div>;
    }

    if (transactions.length === 0) {
        return <div className="w-full my-3 rounded-lg bg-white p-4">No transactions found</div>;
    }

    return (
        <div className="w-full my-3 rounded-lg bg-white p-4">
            <h2 className="text-lg font-semibold mb-4">Card Transaction History</h2>

            <div className="max-h-[300px] overflow-y-scroll">
                <table className='w-full border-collapse my-4'>
                    <thead>
                        <tr className='border border-gray-100 py-2 rounded-lg bg-[#FAFAFA] dark:bg-gray-700 text-[#969A98] text-sm text-left'>
                            <td className='p-3 font-light'>S/N</td>
                            <td className='p-3 font-light'>Description</td>
                            <td className='p-3 font-light'>Amount</td>
                            <td className='p-3 font-light max-lg:hidden'>Currency</td>
                            <td className='p-3 font-light'>Transaction Date</td>
                            <td className='p-3 font-light max-lg:hidden'>Transaction Type</td>
                            <td className='p-3 font-light max-lg:hidden'>Transaction Reference</td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr
                                key={transaction.client_transaction_reference}
                                className='border-b border-gray-100 dark:border-gray-700 text-sm text-[#434343] dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                                onClick={() => handleRowClick(transaction)}
                            >
                                <td className='p-3'>{index + 1}</td>
                                <td className='p-3'>{transaction.description}</td>
                                <td className='p-3'>{transaction.currency === "USD" ? '$' : '₦'}{transaction.amount}</td>
                                <td className='p-3 max-lg:hidden'>{transaction.currency}</td>
                                <td className='p-3'>{transaction.transaction_date}</td>
                                <td className='p-3 max-lg:hidden'>{transaction.card_transaction_type}</td>
                                <td className='p-3 max-lg:hidden'>{transaction.client_transaction_reference}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Transaction Receipt Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Transaction Receipt</h3>
                            <button
                                onClick={handleCloseReceipt}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span>{selectedTransaction.amount} {selectedTransaction.currency}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Type:</span>
                                <span>{selectedTransaction.card_transaction_type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span>{selectedTransaction.transaction_date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Reference:</span>
                                <span>{selectedTransaction.client_transaction_reference}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Description:</span>
                                <span>{selectedTransaction.description}</span>
                            </div>
                            {selectedTransaction.enriched_data && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Category:</span>
                                        <span>{selectedTransaction.enriched_data.transaction_category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Group:</span>
                                        <span>{selectedTransaction.enriched_data.transaction_group}</span>
                                    </div>
                                    {selectedTransaction.enriched_data.merchant_logo && (
                                        <div className="pt-3">
                                            <img
                                                src={selectedTransaction.enriched_data.merchant_logo}
                                                alt="Merchant logo"
                                                className="h-10"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardTransactionTable;