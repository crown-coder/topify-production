import React, { useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { LuKeyRound } from "react-icons/lu";

const UsersTable = () => {
    const tableData = [
        { id: 1, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },
        { id: 2, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },
        { id: 3, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },
        { id: 4, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },

        { id: 5, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },
        { id: 6, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },
        { id: 7, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },
        { id: 8, name: "Smart Data U...", phoneNumber: "08123232323", email: "Smartdatauser@gmail.com", package: "Smart Earner", walletBalance: "N20,050", dateRegistered: "2024-12-17 21:14:05", referredBy: "User Ref 12", lastLogin: "2024-12-17", time: "21:14:05" },
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
        <div className='w-full'>
            <div className='w-[1035px] overflow-x-auto'>
                <table className='min-w-[1200px] w-full border-collapse'>
                    <thead className='bg-gray-50'>
                        <tr className='text-center text-[#969a9b] text-[12px] border-t-8 border-b-8 rounded-lg border-[#f1f1f1]'>
                            <th className="p-3">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                                />
                            </th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>S/N</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Name</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Phone Number</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Email</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Package</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Wallet Balance</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Date Registered</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Referred By</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Last Login</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>View Details</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Reset Password</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Edit</th>
                            <th className='p-3 font-semibold min-w-[130px] whitespace-nowrap'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {currentRows.map((row) => (
                            <tr key={row.id} className={`text-center text-[11px] font-semibold text-gray-800 border-b-8 border-[#f1f1f1] ${selectedRows.includes(row.id) ? "bg-blue-50" : ""
                                }`}>
                                <td className='p-3'>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => handleRowSelect(row.id)}
                                    />
                                </td>
                                <td className='p-3'>{row.id}</td>
                                <td className='p-3'>{row.name}</td>
                                <td className='p-3'>{row.phoneNumber}</td>
                                <td className='p-3'>{row.email}</td>
                                <td className='p-3'>{row.package}</td>
                                <td className='p-3'>{row.walletBalance}</td>
                                <td className='p-3'>{row.dateRegistered}</td>
                                <td className='p-3'>{row.referredBy}</td>
                                <td className='p-3'>{row.lastLogin}<br />{row.time}</td>
                                <td className='p-3 cursor-pointer text-[#2CA0F2]'>View</td>
                                <td className='p-3 min-w-[130px]'>
                                    <span className='flex justify-center items-center'>
                                        <LuKeyRound className="text-[#969a9b] text-lg cursor-pointer" />
                                    </span>
                                </td>
                                <td className='p-3 min-w-[130px]'>
                                    <span className='flex justify-center items-center'>
                                        <HiOutlinePencil className="text-[#969a9b] text-lg cursor-pointer" />
                                    </span>

                                </td>
                                <td className='p-3 min-w-[130px]'>
                                    <span className='flex justify-center items-center'>
                                        <HiOutlineTrash className="text-[#969a9b] text-lg cursor-pointer" />
                                    </span>

                                </td>
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
        </div>
    )
}

export default UsersTable
