import React, { useState } from "react";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const AnalyticTable = () => {
    const tableData = [
        { id: 1, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 2, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 3, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 4, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 5, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 2, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 3, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 4, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
        { id: 5, name: "Smart Data User", email: "Smartdatauser1@m...", wallet: 5, transaction: 10, spending: "N20050", funding: "N15,050", balance: "N20,500", referredBy: "N/A", login: "2024-12-17", time: "21:14:05" },
    ];

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    // Checkbox State
    const [selectedRows, setSelectedRows] = useState([]);

    // Get Current Rows for the page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    // Handle Page Change
    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Handle Select All Checkboxes
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(currentRows.map((row) => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    // Handle Row Checkbox Selection
    const handleRowSelect = (id) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter((rowId) => rowId !== id)
                : [...prevSelectedRows, id]
        );
    };

    return (
        <div className="w-full">
            <div className="w-[1035px] overflow-x-auto">
                <table className="min-w-[1200px] w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr className="text-center text-[#969a9b] text-[12px] border-t-8 border-b-8 rounded-lg border-[#f1f1f1]">
                            <th className="p-3">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                                />
                            </th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">S/N</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Name</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Email</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Wallet Funding Count</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Transaction Count</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Total Spending</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Total Funding</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Wallet Balance</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Referred By</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">Last Login</th>
                            <th className="p-3 font-semibold min-w-[130px] whitespace-nowrap">View Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentRows.map((user) => (
                            <tr
                                key={user.id}
                                className={`text-center text-[11px] font-semibold text-gray-800 border-b-8 border-[#f1f1f1] ${selectedRows.includes(user.id) ? "bg-blue-50" : ""
                                    }`}
                            >
                                <td className="p-3 py-5">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleRowSelect(user.id)}
                                        checked={selectedRows.includes(user.id)}
                                    />
                                </td>
                                <td className="p-3 py-5 min-w-[100px]">{user.id}</td>
                                <td className="p-3 min-w-[130px]">{user.name}</td>
                                <td className="p-3 min-w-[130px]">{user.email}</td>
                                <td className="p-3 min-w-[130px]">{user.wallet}</td>
                                <td className="p-3 min-w-[130px]">{user.transaction}</td>
                                <td className="p-3 min-w-[130px]">{user.spending}</td>
                                <td className="p-3 min-w-[130px]">{user.funding}</td>
                                <td className="p-3 min-w-[130px]">{user.balance}</td>
                                <td className="p-3 min-w-[130px]">{user.referredBy}</td>
                                <td className="p-3 min-w-[130px]">
                                    <span>{user.login}<br />{user.time}</span>
                                </td>
                                <td className="p-3 min-w-[130px] cursor-pointer text-[#2CA0F2]">View</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="w-full bg-[#F4F2FF] flex justify-end px-5 py-2 border shadow-sm rounded-lg">
                <div className='flex gap-2 h-fit'>
                    <span className='text-[#969A9B] text-sm'>{`${indexOfFirstRow + 1}-${Math.min(indexOfLastRow, tableData.length)} of ${tableData.length}`}</span>
                    <div className='flex justify-between items-center gap-4'>
                        <button className='text-[#969A9B] text-xl hover:text-gray-800 transition-all duration-75 cursor-pointer' onClick={() => handlePageChange("prev")} disabled={currentPage === 1}><MdOutlineKeyboardArrowLeft /></button>
                        <button className='text-[#969A9B] hover:text-gray-800 transition-all duration-75 text-xl cursor-pointer' onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}><MdOutlineKeyboardArrowRight /></button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AnalyticTable;
