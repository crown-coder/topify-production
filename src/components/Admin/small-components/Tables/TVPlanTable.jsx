import React, { useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const TVPlanTable = () => {
    const tableData = [
        { id: 1, name: "GOTV Smallie", cable: "GOTV", code: "34", amount: "N20,050", validity: "Monthly" },
        { id: 2, name: "DSTV Compact", cable: "DSTV", code: "56", amount: "N10,500", validity: "Monthly" },
        { id: 3, name: "Startimes Nova", cable: "Startimes", code: "78", amount: "N5,000", validity: "Monthly" },
        { id: 4, name: "DSTV Compact", cable: "DSTV", code: "56", amount: "N10,500", validity: "Monthly" },
        { id: 5, name: "Startimes Nova", cable: "Startimes", code: "78", amount: "N5,000", validity: "Monthly" },
        { id: 6, name: "DSTV Compact", cable: "DSTV", code: "56", amount: "N10,500", validity: "Monthly" },
        { id: 7, name: "Startimes Nova", cable: "Startimes", code: "78", amount: "N5,000", validity: "Monthly" },
        { id: 8, name: "Startimes Nova", cable: "Startimes", code: "78", amount: "N5,000", validity: "Monthly" }

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
            <div className='w-full overflow-x-auto'>
                <table className='w-full border-collapse'>
                    <thead className='bg-gray-50'>
                        <tr className='text-center text-[#969a9b] text-[12px] border-t-8 border-b-8 rounded-lg border-[#f1f1f1]'>
                            <th className="p-3">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                                />
                            </th>
                            <th className='p-3 whitespace-nowrap'>Package Name</th>
                            <th className='p-3 whitespace-nowrap'>Cable Name</th>
                            <th className='p-3 whitespace-nowrap'>Product Code</th>
                            <th className='p-3 whitespace-nowrap'>Amount</th>
                            <th className='p-3 whitespace-nowrap'>Validity</th>
                            <th className='p-3 whitespace-nowrap'>Edit</th>
                            <th className='p-3 whitespace-nowrap'>Delete</th>
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
                                <td className='p-3'>{row.name}</td>
                                <td className='p-3'>{row.cable}</td>
                                <td className='p-3'>{row.code}</td>
                                <td className='p-3'>{row.amount}</td>
                                <td className='p-3'>{row.validity}</td>
                                <td className='p-3'>
                                    <span className='flex justify-center items-center'>
                                        <HiOutlinePencil className="text-[#969a9b] text-lg cursor-pointer" />
                                    </span>

                                </td>
                                <td className='p-3'>
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

export default TVPlanTable
