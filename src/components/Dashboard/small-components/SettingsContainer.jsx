import React from "react";
import { useNavigate, useLocation } from "react-router-dom"
import SettingsCard from "./SettingsCard";
import Profile from "../../../assets/profile.png";
import Pin from "../../../assets/pin.png";
import Delete from "../../../assets/delete.png";
import Bank from "../../../assets/bank.png";
import { useModal } from '../../ModalContext'
import CardLayout from "./Cards/CardLayout"
import FinishCard from "./Cards/FinishCard";
import Confetti from "react-confetti";

const SettingsContainer = () => {
    const navigate = useNavigate();

    const { openModal, closeModal } = useModal()

    const handleBankSucessCard = (e) => {
        e.preventDefault();

        openModal(
            <CardLayout cardTitle="Details Update" closeModal={closeModal}>
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <FinishCard message="Your bank details have been updated successfully." />
            </CardLayout>
        );
    }

    const handlePinSuccessCard = (e) => {
        e.preventDefault();

        openModal(
            <CardLayout cardTitle="Pin Update" closeModal={closeModal}>
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <FinishCard message="Your pin have been updated successfully." />
            </CardLayout>
        );
    }

    const changeBankModal = () => {
        openModal(
            <CardLayout cardTitle="Change Bank Details" closeModal={closeModal}>
                <form className="flex flex-col">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='account-name' className='text-sm font-light'>Account name</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" name='account-name' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='bank-name' className='text-sm font-light'>Bank name</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" name='bank-name' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='account-number' className='text-sm font-light'>Account number</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="number" name='account-number' required />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button className="bg-[#E0E0E0] rounded-md text-[#828282] p-2" onClick={closeModal}>Cancel</button>
                        <button type="submit" onClick={handleBankSucessCard} className="flex-1 p-2 bg-[#4CACF0] rounded-md text-white font-bold">Update Details</button>
                    </div>
                </form>
            </CardLayout>
        )
    }

    const changePinModal = () => {
        openModal(
            <CardLayout cardTitle="Change Pin" closeModal={closeModal}>
                <form className="flex flex-col">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='current-pin' className='text-sm font-light'>Current Pin</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="password" placeholder="****" name='change-pin' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='new-pin' className='text-sm font-light'>New Pin</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="Password" placeholder='****' name='new-pin' required />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button className="bg-[#E0E0E0] rounded-md text-[#828282] p-2" onClick={closeModal}>Cancel</button>
                        <button type="submit" onClick={handlePinSuccessCard} className="flex-1 p-2 bg-[#4CACF0] rounded-md text-white font-bold">Set new pin</button>
                    </div>
                </form>
            </CardLayout>
        )
    }

    const deleteAccModal = () => {
        openModal(
            <CardLayout cardTitle="Account Deletion" closeModal={closeModal}>
                <p className="text-[#434343] text-sm">
                    You are about to delete your account with SmartData Link. <span className="font-bold">Are you sure you want to continue?</span>
                </p>
                <div className="flex gap-2">
                    <button className="bg-[#E0E0E0] rounded-md text-[#828282] p-2" onClick={closeModal}>No, Cancel</button>
                    <button className="flex-1 p-2 bg-[#EB5757] rounded-md text-white font-bold">Yes Delete my account</button>
                </div>
            </CardLayout>
        )
    }


    return (
        <div className="p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl">
            <div className="mt-4 max-lg:mx-7 grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-5 gap-3">
                <SettingsCard
                    className="bg-[#2CA0F2] text-white"
                    title="Profile"
                    imageUrl={Profile}
                    onClick={() => navigate('profile')}
                />
                <SettingsCard
                    className="bg-[#C2D9EA] text-[#006CB8]"
                    title="Change bank details"
                    imageUrl={Bank}
                    onClick={changeBankModal}
                />
                <SettingsCard
                    className="bg-[#C2D9EA] text-[#006CB8]"
                    title="Change Pin"
                    imageUrl={Pin}
                    onClick={changePinModal}
                />
                <SettingsCard
                    className="bg-red-100 text-[#E85757] border border-[#E85757]"
                    title="Delete account"
                    imageUrl={Delete}
                    onClick={deleteAccModal}
                />
            </div>
        </div>
    );
};

export default SettingsContainer;
