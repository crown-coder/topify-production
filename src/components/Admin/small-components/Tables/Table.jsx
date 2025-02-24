import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Table = () => {
    // Sample Data (Replace with API Data)
    const tableData = [
        { id: 1, sn: '01', transactionId: '#2255DDC35', user: 'Justin Septimus', email: 'example@email.com', description: 'Manual Funding/Debit', date: '27/09/2024 01:09 PM', amount: 'N100', type: 'Credit', fundedBy: 'Administrator', status: 'Failed', balanceBefore: 'N20,000', balanceAfter: 'N20,600' },
        { id: 2, sn: '02', transactionId: '#2255AAB34', user: 'Emmanuel Coder', email: 'emmanuel@email.com', description: 'Recharge Purchase', date: '29/09/2024 11:09 AM', amount: 'N500', type: 'Debit', fundedBy: 'User', status: 'Success', balanceBefore: 'N21,000', balanceAfter: 'N20,500' },
        { id: 3, sn: '03', transactionId: '#2255CCB44', user: 'Chloe Smith', email: 'chloe@email.com', description: 'Data Purchase', date: '30/09/2024 10:00 AM', amount: 'N300', type: 'Credit', fundedBy: 'Administrator', status: 'Failed', balanceBefore: 'N19,000', balanceAfter: 'N19,300' },
        { id: 4, sn: '04', transactionId: '#2255EED55', user: 'John Doe', email: 'john@email.com', description: 'Bill Payment', date: '01/10/2024 08:00 PM', amount: 'N1000', type: 'Debit', fundedBy: 'User', status: 'Success', balanceBefore: 'N22,000', balanceAfter: 'N21,000' },
        { id: 5, sn: '05', transactionId: '#2255ZZZ66', user: 'Jane Doe', email: 'jane@email.com', description: 'Manual Funding', date: '02/10/2024 09:15 AM', amount: 'N200', type: 'Credit', fundedBy: 'Administrator', status: 'Success', balanceBefore: 'N20,800', balanceAfter: 'N21,000' },
        { id: 2, sn: '02', transactionId: '#2255AAB34', user: 'Emmanuel Coder', email: 'emmanuel@email.com', description: 'Recharge Purchase', date: '29/09/2024 11:09 AM', amount: 'N500', type: 'Debit', fundedBy: 'User', status: 'Success', balanceBefore: 'N21,000', balanceAfter: 'N20,500' },
        { id: 3, sn: '03', transactionId: '#2255CCB44', user: 'Chloe Smith', email: 'chloe@email.com', description: 'Data Purchase', date: '30/09/2024 10:00 AM', amount: 'N300', type: 'Credit', fundedBy: 'Administrator', status: 'Failed', balanceBefore: 'N19,000', balanceAfter: 'N19,300' },
        { id: 4, sn: '04', transactionId: '#2255EED55', user: 'John Doe', email: 'john@email.com', description: 'Bill Payment', date: '01/10/2024 08:00 PM', amount: 'N1000', type: 'Debit', fundedBy: 'User', status: 'Success', balanceBefore: 'N22,000', balanceAfter: 'N21,000' },
        { id: 5, sn: '05', transactionId: '#2255ZZZ66', user: 'Jane Doe', email: 'jane@email.com', description: 'Manual Funding', date: '02/10/2024 09:15 AM', amount: 'N200', type: 'Credit', fundedBy: 'Administrator', status: 'Success', balanceBefore: 'N20,800', balanceAfter: 'N21,000' },
    ];

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5; // Number of rows per page
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    // Checkbox State
    const [selectedRows, setSelectedRows] = useState([]);

    // Get Current Rows for the Page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    // Handle Page Change
    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    // Checkbox Logic
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = currentRows.map(row => row.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    }

    const handleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    }

    return (
        <div className='w-[1035px] overflow-x-scroll'>
            <table className='w-full table-auto'>
                <thead className='text-[#969a9b] text-left border-b-8 border-[#f1f1f1]'>
                    <tr className='bg-white rounded-lg'>
                        <th className='px-5 py-3'>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedRows.length === currentRows.length}
                            />
                        </th>
                        <th className='font-semibold text-sm'>S/N</th>
                        <th className='font-semibold text-sm'>Transaction ID</th>
                        <th className='font-semibold text-sm'>User</th>
                        <th className='font-semibold text-sm'>Description</th>
                        <th className='font-semibold text-sm'>Amount</th>
                        <th className='font-semibold text-sm'>Type</th>
                        <th className='font-semibold text-sm'>Funded By</th>
                        <th className='font-semibold text-sm'>Status</th>
                        <th className='font-semibold text-sm'>Balance before</th>
                        <th className='font-semibold text-sm'>Balance after</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map(row => (
                        <tr
                            key={row.id}
                            className={`rounded-lg border-b-8 border-[#f1f1f1] text-sm ${selectedRows.includes(row.id) ? 'bg-blue-50' : 'bg-white'}`}
                        >
                            <td className='px-5 py-5'>
                                <input
                                    type="checkbox"
                                    onChange={() => handleRowSelect(row.id)}
                                    checked={selectedRows.includes(row.id)}
                                />
                            </td>
                            <td>{row.sn}</td>
                            <td>{row.transactionId}</td>
                            <td>
                                <span>{row.user}</span><br />
                                <span className='text-[#969a9b] text-[12px]'>{row.email}</span>
                            </td>
                            <td>
                                <span>{row.description}</span><br />
                                <span className='text-[#969a9b] text-[12px]'>{row.date}</span>
                            </td>
                            <td>{row.amount}</td>
                            <td>{row.type}</td>
                            <td>{row.fundedBy}</td>
                            <td className='text-[11px]'>
                                <span className={`px-2 py-1 rounded-md ${row.status === 'Success' ? 'text-[#27AE60] bg-[#EDFFF5]' : 'text-[#EB5757] bg-[#FFF2F2]'}`}>
                                    {row.status}
                                </span>
                            </td>
                            <td>{row.balanceBefore}</td>
                            <td>{row.balanceAfter}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className='w-full bg-[#F4F2FF] flex justify-end px-5 py-2 border shadow-sm rounded-lg'>
                <div className='flex gap-2 h-fit'>
                    <span className='text-[#969A9B] text-sm'>
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className='flex justify-between items-center gap-4'>
                        <button
                            className='text-[#969A9B] text-xl hover:text-gray-800 transition-all duration-75 cursor-pointer'
                            onClick={() => handlePageChange('prev')}
                            disabled={currentPage === 1}
                        >
                            <MdOutlineKeyboardArrowLeft />
                        </button>
                        <button
                            className='text-[#969A9B] hover:text-gray-800 transition-all duration-75 text-xl cursor-pointer'
                            onClick={() => handlePageChange('next')}
                            disabled={currentPage === totalPages}
                        >
                            <MdOutlineKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;
