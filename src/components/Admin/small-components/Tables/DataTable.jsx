import React, { useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const DataTable = () => {
    const tableData = [
        { id: 1, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
        { id: 2, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
        { id: 3, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
        { id: 4, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
        { id: 5, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
        { id: 6, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
        { id: 7, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
        { id: 8, network: "GLO", planType: "GIFTING", plan: "138GB", amount: "N20,050", smartEarnerAmount: "N20,050", affiliateAmount: "N20,050", topUserAmount: "N20,500", apiAmount: "N20,500", validity: "30days Incl 12gb" },
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
        <div className='w-full max-w-full'>
            <div className='w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
                <table className='min-w-[1200px] w-full border-collapse'>
                    <thead className='bg-gray-50'>
                        <tr className='text-center text-[#969a9b] text-[12px]'>
                            <th className="p-3 border-b">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                                />
                            </th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>S/N</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Network</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Plan Type</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Plan</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Amount</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Smart Earner Am...</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Affiliate Amount</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Top User Amount</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>API Amount</th>
                            <th className='p-3 font-semibold min-w-[150px] whitespace-nowrap border-b'>Validity</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Edit</th>
                            <th className='p-3 font-semibold min-w-[100px] whitespace-nowrap border-b'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {currentRows.map((row) => (
                            <tr key={row.id}
                                className={`text-center text-[11px] font-semibold text-gray-800 ${selectedRows.includes(row.id) ? "bg-blue-50" : ""}`}>
                                <td className="p-3 py-5">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleRowSelect(row.id)}
                                        checked={selectedRows.includes(row.id)}
                                    />
                                </td>
                                <td className='p-3 py-5 min-w-[100px]'>{row.id}</td>
                                <td className='p-3 min-w-[100px]'>{row.network}</td>
                                <td className='p-3 min-w-[100px]'>{row.planType}</td>
                                <td className='p-3 min-w-[100px]'>{row.plan}</td>
                                <td className='p-3 min-w-[100px]'>{row.amount}</td>
                                <td className='p-3 min-w-[100px]'>{row.smartEarnerAmount}</td>
                                <td className='p-3 min-w-[100px]'>{row.affiliateAmount}</td>
                                <td className='p-3 min-w-[100px]'>{row.topUserAmount}</td>
                                <td className='p-3 min-w-[100px]'>{row.apiAmount}</td>
                                <td className='p-3 min-w-[150px]'>{row.validity}</td>
                                <td className='p-3 min-w-[100px]'>
                                    <span className='flex justify-center items-center'>
                                        <HiOutlinePencil className="text-[#969a9b] text-lg cursor-pointer" />
                                    </span>
                                </td>
                                <td className='p-3 min-w-[100px]'>
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
            <div className="w-full bg-[#F4F2FF] flex justify-end px-5 py-2 border shadow-sm rounded-lg mt-2">
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

export default DataTable;