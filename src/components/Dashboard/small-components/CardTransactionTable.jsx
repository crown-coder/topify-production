import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CardTransactionTable = ({ cardId, cardCurrency }) => {
    const [apiTransactions, setApiTransactions] = useState([]);
    const [localTransactions, setLocalTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [viewMode, setViewMode] = useState('api'); // 'api' or 'local'
    const [resending, setResending] = useState(false);

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

            const { apiTransaction, localTransaction } = response.data;

            if (apiTransaction?.status === 'success') {
                setApiTransactions(apiTransaction.data.transactions || []);
            } else {
                setApiTransactions([]);
            }

            setLocalTransactions(localTransaction || []);
            setError(null);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!cardId || !cardCurrency) return;
        fetchTransactions();
    }, [cardId, cardCurrency]);

    const handleResend = async (transaction) => {
        try {
            setResending(true);
            const response = await axios.post('/api/resend_refund', {
                card_id: cardId,
            });
            alert(response.data.message || 'Resend initiated');
        } catch (err) {
            alert(err.message || 'Failed to resend');
        } finally {
            setResending(false);
        }
    };

    const handleRowClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseReceipt = () => {
        setSelectedTransaction(null);
    };

    const transactionsToRender = viewMode === 'api' ? apiTransactions : localTransactions;

    return (
        <div className="w-full my-3 rounded-lg bg-white p-4">
            <div className="flex max-lg:flex-col max-lg:gap-2 lg:justify-between lg:items-center mb-4">
                <h2 className="text-lg font-semibold">Card Transaction History</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => setViewMode('api')}
                        className={`px-3 py-1 rounded ${viewMode === 'api' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Card Transactions
                    </button>
                    <button
                        onClick={() => setViewMode('local')}
                        className={`px-3 py-1 rounded ${viewMode === 'local' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Local Transactions
                    </button>
                </div>
            </div>

            {loading ? (
                <div>Loading transactions...</div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : transactionsToRender.length === 0 ? (
                <div>No transactions found</div>
            ) : (
                <div className="max-h-[300px] overflow-y-scroll">
                    <table className='w-full border-collapse my-4'>
                        <thead>
                            <tr className='bg-[#FAFAFA] dark:bg-gray-700 text-[#969A98] text-sm'>
                                <td className='p-3'>S/N</td>
                                <td className='p-3'>Description</td>
                                <td className='p-3'>Amount</td>
                                <td className='p-3 max-lg:hidden'>Currency</td>
                                <td className='p-3'>Date</td>
                                <td className='p-3 max-lg:hidden'>Type</td>
                                <td className='p-3 max-lg:hidden'>Reference</td>
                                {viewMode === 'local' && <td className='p-3'>Action</td>}
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsToRender.map((tx, index) => (
                                <tr
                                    key={tx.client_transaction_reference || index}
                                    className='border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300'
                                    onClick={() => viewMode === 'api' && handleRowClick(tx)}
                                >
                                    <td className='p-3'>{index + 1}</td>
                                    <td className='p-3'>{tx.description}</td>
                                    <td className='p-3'>{tx.currency === "USD" ? '$' : '₦'}{tx.amount}</td>
                                    <td className='p-3 max-lg:hidden'>{tx.currency}</td>
                                    <td className='p-3'>{tx.transaction_date}</td>
                                    <td className='p-3 max-lg:hidden'>{tx.card_transaction_type}</td>
                                    <td className='p-3 max-lg:hidden'>{tx.client_transaction_reference}</td>
                                    {viewMode === 'local' && (
                                        <td className='p-3'>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleResend(tx);
                                                }}
                                                className="text-sm text-blue-600 underline"
                                            >
                                                {resending ? 'Sending...' : 'Resend'}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Transaction Receipt Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Transaction Receipt</h3>
                            <button onClick={handleCloseReceipt} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between"><span>Amount:</span><span>{selectedTransaction.amount} {selectedTransaction.currency}</span></div>
                            <div className="flex justify-between"><span>Type:</span><span>{selectedTransaction.card_transaction_type}</span></div>
                            <div className="flex justify-between"><span>Date:</span><span>{selectedTransaction.transaction_date}</span></div>
                            <div className="flex justify-between"><span>Reference:</span><span>{selectedTransaction.client_transaction_reference}</span></div>
                            <div className="flex justify-between"><span>Description:</span><span>{selectedTransaction.description}</span></div>
                            {selectedTransaction.enriched_data && (
                                <>
                                    <div className="flex justify-between"><span>Category:</span><span>{selectedTransaction.enriched_data.transaction_category}</span></div>
                                    <div className="flex justify-between"><span>Group:</span><span>{selectedTransaction.enriched_data.transaction_group}</span></div>
                                    {selectedTransaction.enriched_data.merchant_logo && (
                                        <div className="pt-3">
                                            <img src={selectedTransaction.enriched_data.merchant_logo} alt="Merchant logo" className="h-10" />
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
