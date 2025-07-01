import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import Table from "./small-components/Tables/Table";
import { useModal } from "../ModalContext";
import CardLayout from "../Dashboard/small-components/Cards/CardLayout";
import { PiWarningCircleThin } from "react-icons/pi";
import Confetti from "react-confetti";
import SuccessPhoto from "../../assets/success.png"

const UserFunding = () => {
    const { openModal, closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [isActive, setIsActive] = useState("All");

    const Btns = [
        { id: 1, name: "All" },
        { id: 2, name: "Manual Funding" },
        { id: 3, name: "Monnify Transactions" },
        { id: 4, name: "Wallet Transfer" },
    ];

    const handleTransaction = () => {
        setIsLoading(true);

        setTimeout(() => {
            const success = Math.random() > 0.5; // Simulate success or failure
            setIsLoading(false);
            setIsSuccess(success);

            openModal(
                <CardLayout cardTitle={success ? "Success" : "Failed"} closeModal={closeModal}>
                    <div className="p-3 flex flex-col items-center gap-4">
                        {success ? (
                            <Confetti />
                        ) : (
                            <PiWarningCircleThin className="text-9xl text-red-500" />
                        )}
                        {success ? <img src={SuccessPhoto} /> : ""}
                        <p className="text-center text-sm text-[#434343]">
                            {success ? "Transaction completed successfully!" : "Transaction failed. Please try again."}
                        </p>
                        {/* <button
                            onClick={closeModal}
                            className="bg-[#4CACF0] py-2 rounded-lg text-white text-lg cursor-pointer"
                        >
                            Close
                        </button> */}
                    </div>
                </CardLayout>
            );
        }, 2000); // Simulate API call delay
    };

    const handleFundingConfirmation = (e) => {
        e.preventDefault();
        openModal(
            <CardLayout cardTitle="Funding Confirmation" closeModal={closeModal}>
                <div className="p-3 flex flex-col items-center gap-4">
                    <PiWarningCircleThin className="text-9xl text-[#E2B93B]" />
                    <p className="text-center text-sm text-[#434343]">
                        You are Sending <span className='font-bold'>N2000</span> to <span className="font-bold">0116905849</span>
                        <br />
                        Do you want to proceed?
                    </p>
                    <div className="w-full grid grid-cols-2 gap-5">
                        <button
                            onClick={closeModal}
                            className="bg-[#4CACF0] py-2 rounded-lg text-white text-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleTransaction}
                            className="bg-[#4CACF0] py-2 rounded-lg text-white text-lg cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Yes"}
                        </button>
                    </div>
                </div>
            </CardLayout>
        );
    };

    const handleOpenFundingModal = () => {
        openModal(
            <CardLayout cardTitle="Fund User" closeModal={closeModal}>
                <form className="flex flex-col">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='username' className='text-sm font-light'>Username</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" name='username' placeholder="sadiqmuhammad2101@gmail.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 my-2">
                        <button type="button" className="py-1 rounded-md border border-[#2CA0F2]">Debit</button>
                        <button type="button" className="py-1 rounded-md border border-[#2CA0F2] bg-[#2CA0F2] text-white">Credit</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='amount' className='text-sm font-light'>Amount</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="number" name='amount' placeholder="e.g 2000" />
                    </div>
                    <button
                        onClick={handleFundingConfirmation}
                        type="button"
                        className="w-full p-2 mt-3 bg-[#4CACF0] rounded-md text-white font-bold"
                    >
                        Submit
                    </button>
                </form>
            </CardLayout>
        );
    };

    return (
        <div>
            <div className="p-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl flex flex-col gap-4">
                {/* Filter Btns */}
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-4">
                        {Btns.map((btn, i) => (
                            <button
                                key={btn.id}
                                onClick={() => setIsActive(btn.name)}
                                className={`pb-1 text-sm transition-all duration-100 ${isActive === btn.name ? "text-[#2CA0F2] border-b-2 border-[#2CA0F2]" : "text-[#434343B2]"}`}
                            >
                                {btn.name}
                            </button>
                        ))}
                    </div>
                    <p className="text-[#434343B2]">
                        Total: <span className="text-[#2CA0F2] font-bold">N9000</span>
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 border border-blue-400 text-blue-400 rounded-lg py-1 px-3 text-sm max-lg:hidden">
                            <FaFilter />
                            <span className="text-black">Filter</span>
                        </button>
                        <div className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg">
                            <span className="text-[#2CA0F2] text-xl">
                                <IoMdSearch />
                            </span>
                            <input
                                type="text"
                                placeholder="Search Users by Name, Email or Date"
                                className="w-[270px] max-lg:w-[180px] text-[11px] bg-transparent outline-none"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleOpenFundingModal}
                        className="py-1 px-3 bg-[#2CA0F2] text-white rounded-lg outline-none"
                    >
                        Fund/Debit
                    </button>
                </div>
            </div>
            <Table />
        </div>
    );
};

export default UserFunding;
