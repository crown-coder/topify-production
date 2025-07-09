import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoInformationCircleOutline } from "react-icons/io5";
import {
    FaMoneyBillWave,
    FaMoneyCheckAlt,
    FaSnowflake,
    FaTrashAlt,
} from 'react-icons/fa';
import { TbArrowLeft } from 'react-icons/tb';
import { FiCopy } from 'react-icons/fi';
import { PiWarningCircleThin } from 'react-icons/pi';

import Logo from '../../../../assets/logo.png';
import MetalPhoto from '../../../../assets/metal.png';

import { useModal } from '../../../ModalContext';
import CardLayout from '../Cards/CardLayout';
import CardFundingForm from '../Forms/CardFundingForm';
import CardWithdrawalForm from '../Forms/CardWithdrawalForm';
import AlertBox from '../AlertBox';
import CardTransactionTable from '../CardTransactionTable';

const fetchCardDetails = async ({ queryKey }) => {
    const [_key, cardId] = queryKey;
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    const config = {
        headers: { 'X-XSRF-TOKEN': xsrfToken },
        withCredentials: true,
    };

    const allCardsRes = await axios.get('/api/Allvirtual-cards', config);
    const card = allCardsRes.data.data.find((c) => c.card_id === cardId);
    if (!card) throw new Error('Card not found');

    console.log("This is the card", card)

    const detailRes = await axios.get(`/api/virtual-cards/${card.id}/details`, config);
    const detail = detailRes.data;

    return {
        ...detail,
        id: card.id,
        provider: card.provider,
        expiry: `${detail.expiry_month}/${detail.expiry_year.toString().slice(-2)}`
    };
};

const CardDetails = () => {
    const { cardId, currency } = useParams();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();

    const [copiedField, setCopiedField] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState('success');

    const { data: card, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['cardDetails', cardId],
        queryFn: fetchCardDetails,
    });

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        });
    };

    const goBack = () => navigate(-1);

    const openFundingModal = () => {
        openModal(
            <CardLayout cardTitle="Funding Card" closeModal={closeModal}>
                <CardFundingForm
                    cardId={card.card_id}
                    currency={card.card_currency}
                    cardProvider={card.provider}
                    onSuccess={() => {
                        refetch();
                        closeModal();
                    }}
                />
            </CardLayout>
        );
    };

    const openWithdrawalModal = () => {
        openModal(
            <CardLayout cardTitle="Withdraw Funds" closeModal={closeModal}>
                <CardWithdrawalForm
                    currentCardId={card.id}
                    cardId={card.card_id}
                    cardCurrency={card.card_currency}
                    cardProvider={card.provider}
                    onSuccess={() => {
                        refetch();
                        closeModal();
                    }}
                />
            </CardLayout>
        );
    };

    const handleFreezeToggle = async () => {
        setLoading(true);
        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const newStatus = card.is_active ? 1 : 0;

            const response = await axios.post(
                `/api/virtual-cards/toggle-freeze`,
                {
                    is_active: newStatus,
                    card_id: card.card_id,
                    currency: card.card_currency
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                updateCardStatus(newStatus);
                setAlertType('success');
                setAlertMessage(`Card ${newStatus ? 'frozen' : 'unfrozen'} successfully!`);
            } else {
                setAlertType('error');
                setAlertMessage(response.data.message || `Failed to ${card.is_active ? 'freeze' : 'unfreeze'} card`);
            }
            fetchCard()
            setShowAlert(true);
        } catch (error) {
            console.error('Error toggling freeze status:', error);
            setAlertType('error');
            setAlertMessage(error.response?.data?.message || `Failed to ${card.is_active ? 'freeze' : 'unfreeze'} card`);
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    const handleFreezeCard = () => {
        openModal(
            <CardLayout cardTitle={card.is_active ? "Freeze Card" : "Unfreeze Card"} closeModal={closeModal}>
                <div className="flex flex-col items-center">
                    <FaSnowflake className="text-6xl text-[#4CACF0]" />
                    <p className="text-gray-600">Are you sure you want to {card.is_active ? 'freeze' : 'unfreeze'} this card?</p>
                    <p className="text-gray-600 font-light italic mb-4">
                        {card.is_active ? 'You can unfreeze it later.' : 'The card will become active again.'}
                    </p>
                    <div className="flex justify-between w-full">
                        <button
                            onClick={closeModal}
                            className="text-red-500 px-4 py-2 rounded-lg border border-red-100 hover:bg-red-50 transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={() => {
                                handleFreezeToggle();
                                closeModal();
                            }}
                            className="bg-[#4CACF0] hover:bg-[#3a8bc8] text-white px-4 py-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {card.is_active ? 'Freezing...' : 'Unfreezing...'}
                                </span>
                            ) : (
                                card.is_active ? 'Freeze Card' : 'Unfreeze Card'
                            )}
                        </button>
                    </div>
                </div>
            </CardLayout>
        );
    };

    const handleBtnDisabled = () => {
        return !card || !card.is_active;
    };

    const handleDeleteCard = () => {
        openModal(
            <CardLayout cardTitle="Delete Card" closeModal={closeModal}>
                <div className="flex flex-col items-center">
                    <PiWarningCircleThin className="text-9xl text-[#E2B93B]" />
                    <p className="text-gray-600">Are you sure you want to delete this card?</p>
                    <p className="text-gray-600 font-light italic mb-4">You can't undo this action later.</p>
                    <div className="flex justify-between w-full">
                        <button
                            onClick={closeModal}
                            className="text-red-500 px-4 py-2 rounded-lg border border-red-100 hover:bg-red-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                closeModal();
                                navigate('/cards');
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Permanently Delete
                        </button>
                    </div>
                </div>
            </CardLayout>
        );
    };

    const renderSkeleton = () => (
        <motion.div className="p-5 bg-white rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <Skeleton width={120} height={20} />
                <Skeleton width={100} height={30} />
            </div>
            <div className="flex gap-4 max-lg:flex-col">
                <div className="w-[420px] max-lg:w-full p-4 rounded-xl bg-gray-200">
                    <Skeleton height={40} />
                    <Skeleton height={30} count={3} className="my-2" />
                </div>
                <div className="flex-1 space-y-4">
                    <Skeleton height={40} />
                    <Skeleton height={80} count={2} />
                    <Skeleton height={200} />
                </div>
            </div>
        </motion.div>
    );

    if (isLoading) return renderSkeleton();
    if (isError) return <div className="text-center text-red-500 py-10">{error?.message}</div>;
    if (!card) return <div className="text-center text-gray-400 py-10">No card data available</div>;

    return (
        <motion.div className="p-2">
            {showAlert && (
                <AlertBox
                    message={alertMessage}
                    type={alertType}
                    isVisible={showAlert}
                    onDismiss={() => setShowAlert(false)}
                />
            )}

            <div className="flex items-center gap-2 mb-3">
                <button
                    onClick={goBack}
                    className="text-sm flex items-center gap-1 border px-4 py-2.5 rounded-lg bg-white"
                >
                    <TbArrowLeft size={18} /> Back to Cards
                </button>
            </div>

            <div className="flex max-lg:flex-col lg:items-center gap-4 bg-white p-3 rounded-md">
                {/* Left: Card */}
                <div className={`w-[420px] max-lg:w-full h-fit rounded-xl shadow-xl shadow-blue-100 ${card.card_currency === 'NGN' ? 'bg-blue-500' : 'bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950'} p-4 text-white`}>
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-xl font-light">
                            Smart<span className="font-semibold">Card</span>
                        </h1>
                        <div className="w-12 h-12 rounded-full bg-white/20 flex justify-center items-center">
                            <img src={Logo} alt="logo" className="w-10 h-10" />
                        </div>
                    </div>

                    <div className='flex items-center justify-between my-4'>
                        <div>
                            <h2 className="text-lg font-normal">{card.card_name}</h2>
                            <div className="flex items-center space-x-2 mt-1">
                                <p className="text-base tracking-wider">{card.card_number}</p>
                                <FiCopy
                                    className="w-4 h-4 opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
                                    onClick={() => copyToClipboard(card.card_number, 'number')}
                                />
                                {copiedField === 'number' && <span className="text-xs">Copied!</span>}
                            </div>
                        </div>
                        <img src={MetalPhoto} className='w-[65px]' alt="Chip Contact Plate" />
                    </div>

                    <div className="flex justify-between mt-3">
                        <div>
                            <p className="text-sm font-light text-gray-300">Card Type</p>
                            <p className="font-medium">{card.card_currency}</p>
                        </div>
                        <div>
                            <p className="text-sm font-light text-gray-300">Expiry</p>
                            <div className="flex items-center">
                                <p className="font-medium mr-1">{card.expiry}</p>
                                <FiCopy
                                    className="w-3 h-3 opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
                                    onClick={() => copyToClipboard(card.expiry, 'expiry')}
                                />
                                {copiedField === 'expiry' && <span className="text-xs ml-1">Copied!</span>}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-light text-gray-300">CVV</p>
                            <div className="flex items-center">
                                <p className="font-medium mr-1">{card.cvv}</p>
                                <FiCopy
                                    className="w-3 h-3 opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
                                    onClick={() => copyToClipboard(card.cvv, 'cvv')}
                                />
                                {copiedField === 'cvv' && <span className="text-xs ml-1">Copied!</span>}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-light text-gray-300">Balance</p>
                            <p className="font-medium">{card.balance} {card.card_currency}</p>
                        </div>
                    </div>
                </div>

                {/* Right: Controls + Info */}
                <div className='bg-white p-4 rounded-lg flex-1'>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <button onClick={openFundingModal} className="flex items-center justify-center gap-2 border py-2 px-3 rounded-md bg-gray-50 hover:bg-gray-100 text-blue-700">
                            <FaMoneyBillWave /> Fund
                        </button>
                        <button onClick={openWithdrawalModal} className="flex items-center justify-center gap-2 border py-2 px-3 rounded-md bg-gray-50 hover:bg-gray-100 text-orange-500">
                            <FaMoneyCheckAlt /> Withdraw
                        </button>
                        <button
                            onClick={handleFreezeCard}
                            disabled={loading}
                            className={`flex items-center justify-center gap-2 ${card.is_active ? 'text-blue-500' : 'text-green-500'
                                } border py-2 px-3 rounded-md bg-gray-50 transition-all duration-75 hover:bg-gray-100 disabled:opacity-50`}
                        >
                            <FaSnowflake className="text-lg" />
                            {card.is_active ? 'Freeze' : 'Unfreeze'}
                        </button>
                        <button onClick={handleDeleteCard} className="flex items-center justify-center gap-2 text-red-600 border py-2 px-3 rounded-md bg-gray-50 hover:bg-gray-100">
                            <FaTrashAlt /> Delete
                        </button>
                    </div>

                    <div className="border rounded p-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Card Details</h3>
                        <div className="grid grid-cols-5 gap-3">
                            <div>
                                <p className="text-sm text-gray-500">Creation Date</p>
                                <p className="font-medium">{new Date(card.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Currency</p>
                                <p className="font-medium">{card.card_currency}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className={`font-medium ${card.is_active ? 'text-green-500' : 'text-red-500'}`}>
                                    {card.is_active ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Daily Limit</p>
                                <p className="font-medium">{card.current_card_limit} {card.card_currency}</p>
                            </div>
                            {/* <div>
                                <button className="flex items-center gap-2 border border-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
                                    <IoInformationCircleOutline className="w-4 h-4 text-blue-500" />
                                    Card Info
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <CardTransactionTable cardId={cardId} cardCurrency={currency} />
        </motion.div>
    );
};

export default CardDetails;
