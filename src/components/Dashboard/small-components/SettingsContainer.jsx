import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import SettingsCard from "./SettingsCard";
import Profile from "../../../assets/profile.png";
import Pin from "../../../assets/pin.png";
import Delete from "../../../assets/delete.png";
import Bank from "../../../assets/bank.png";
import { useModal } from '../../ModalContext';
import CardLayout from "./Cards/CardLayout";
import FinishCard from "./Cards/FinishCard";
import Confetti from "react-confetti";

const AddBankModal = ({ onClose }) => {
    const [bankDetails, setBankDetails] = useState(null);
    const [loadingBank, setLoadingBank] = useState(true);

    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const response = await axios.get('/api/bank-accounts');
                if (response.data?.data?.length > 0) {
                    setBankDetails(response.data.data[0]);
                }
            } catch (error) {
                console.error('Failed to fetch bank details:', error);
            } finally {
                setLoadingBank(false);
            }
        };

        fetchBankDetails();
    }, []);

    const [formData, setFormData] = useState({
        account_name: '',
        bank_name: '',
        account_number: '',
        bank_code: 'is_defaul',
        is_default: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post('/api/bank-accounts/store', {
                bank_name: formData.bank_name,
                account_number: formData.account_number,
                account_name: formData.account_name,
                bank_code: formData.bank_code,
                is_default: formData.is_default
            });

            toast.success('Bank details added successfully!');
            onClose();
        } catch (error) {
            console.error('Error adding bank details:', error);
            toast.error(error.response?.data?.message || 'Failed to add bank details');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <CardLayout cardTitle="Add Bank Details" closeModal={onClose}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='account_name' className='text-sm font-light'>Account name</label>
                    <input
                        className='p-2 rounded-lg border text-[#989898] text-sm font-light'
                        type="text"
                        name='account_name'
                        value={formData.account_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='bank_name' className='text-sm font-light'>Bank name</label>
                    <input
                        className='p-2 rounded-lg border text-[#989898] text-sm font-light'
                        type="text"
                        name='bank_name'
                        value={formData.bank_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='account_number' className='text-sm font-light'>Account number</label>
                    <input
                        className='p-2 rounded-lg border text-[#989898] text-sm font-light'
                        type="text"
                        name='account_number'
                        value={formData.account_number}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit account number"
                    />
                </div>
                <div className="flex gap-2 mt-3">
                    <button
                        type="button"
                        className="bg-[#E0E0E0] rounded-md text-[#828282] p-2 flex-1"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 p-2 bg-[#4CACF0] rounded-md text-white font-bold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Update Details'}
                    </button>
                </div>
            </form>
        </CardLayout>
    );
};

const SettingsContainer = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const [bankDetails, setBankDetails] = useState(null);
    const [loadingBank, setLoadingBank] = useState(true);

    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const response = await axios.get('/api/bank-accounts');
                if (response.data?.data?.length > 0) {
                    setBankDetails(response.data.data[0]);
                }
            } catch (error) {
                console.error('Failed to fetch bank details:', error);
            } finally {
                setLoadingBank(false);
            }
        };

        fetchBankDetails();
    }, []);

    const handlePinSuccessCard = (e) => {
        e.preventDefault();
        openModal(
            <CardLayout cardTitle="Pin Update" closeModal={closeModal}>
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <FinishCard message="Your pin have been updated successfully." />
            </CardLayout>
        );
    };

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
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="password" placeholder='****' name='new-pin' required />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button className="bg-[#E0E0E0] rounded-md text-[#828282] p-2" onClick={closeModal}>Cancel</button>
                        <button type="submit" onClick={handlePinSuccessCard} className="flex-1 p-2 bg-[#4CACF0] rounded-md text-white font-bold">Set new pin</button>
                    </div>
                </form>
            </CardLayout>
        );
    };

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
        );
    };

    return (
        <div className="p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl">
            <div className="mt-4 max-lg:mx-7 grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-5 gap-3">
                <SettingsCard
                    className="bg-[#2CA0F2] text-white"
                    title="Profile"
                    imageUrl={Profile}
                    onClick={() => navigate('profile')}
                />
                {loadingBank ? (
                    <div className="bg-[#C2D9EA] text-[#006CB8] flex items-center justify-center p-4 rounded-xl">
                        <span className="text-sm font-medium">Loading bank details...</span>
                    </div>
                ) : bankDetails ? (
                    <div className="bg-[#C2D9EA] p-4 rounded-xl flex flex-col justify-between gap-2 relative">
                        <div className="flex items-center gap-2">
                            <img src={Bank} alt="Bank" className="absolute right-0 bottom-0 max-lg:w-[100px]" />
                            <h3 className="font-bold text-xl text-[#006CB8]">Bank Account Details</h3>
                        </div>
                        <div className="text-lg text-[#2CA0F2] font-semibold">
                            <p>{bankDetails.bank_name}</p>
                            <p>{bankDetails.account_name}</p>
                            <p>{bankDetails.account_number}</p>
                        </div>
                    </div>
                ) : (
                    <SettingsCard
                        className="bg-[#C2D9EA] text-[#006CB8]"
                        title="Add bank details"
                        imageUrl={Bank}
                        onClick={() => openModal(<AddBankModal onClose={closeModal} />)}
                    />
                )}
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
