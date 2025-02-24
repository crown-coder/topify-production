import React, { useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const DataTypeTable = () => {
    const tableData = [
        { id: 1, Name: "SME", Network: "MTN", Status: "Active" },
        { id: 2, Name: "GIFTING", Network: "MTN", Status: "Active" },
        { id: 3, Name: "SME2", Network: "MTN", Status: "Active" },
        { id: 4, Name: "CORPORATE", Network: "MTN", Status: "Active" },
        { id: 5, Name: "OTHERS", Network: "MTN", Status: "Active" },
        { id: 6, Name: "SME2", Network: "MTN", Status: "Active" },
        { id: 7, Name: "CORPORATE", Network: "MTN", Status: "Active" },
        { id: 8, Name: "OTHERS", Network: "MTN", Status: "Active" }
    ]

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
                            <th className='p-3 whitespace-nowrap'>Name</th>
                            <th className='p-3 whitespace-nowrap'>Network</th>
                            <th className='p-3 whitespace-nowrap'>Status</th>
                            <th className='p-3 whitespace-nowrap'>Edit</th>
                            <th className='p-3 whitespace-nowrap'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {currentRows.map((row) => (
                            <tr key={row.id} className={`text-center text-[11px] font-semibold text-gray-800 border-b-8 border-[#f1f1f1] ${selectedRows.includes(row.id) ? "bg-blue-50" : ""
                                }`}>
                                <td className='p-3 py-5 '>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleRowSelect(row.id)}
                                        checked={selectedRows.includes(row.id)}
                                    />
                                </td>
                                <td className='p-3 py-5'>{row.Name}</td>
                                <td className='p-3 py-5'>{row.Network}</td>
                                <td className='p-3 py-5'>{row.Status}</td>
                                <td className='p-3 py-5'>
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

export default DataTypeTable
