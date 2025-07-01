import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';
import { FiCopy } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import { useModal } from '../../ModalContext.jsx';
import CardLayout from './Cards/CardLayout.jsx';
import { PiWarningCircleThin } from "react-icons/pi";
import CardFundingForm from './Forms/CardFundingForm.jsx';
import CardWithdrawalForm from './Forms/CardWithdrawalForm.jsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    FaMoneyBillWave,
    FaMoneyCheckAlt,
    FaSnowflake,
    FaTrashAlt
} from 'react-icons/fa';
import MetalPhoto from '../../../assets/metal.png';
import GeneralLoader from './GeneralLoader.jsx';
import AlertBox from './AlertBox.jsx';
import CardTransactionTable from './CardTransactionTable.jsx';

const CardDetails = () => {
    const { cardId, currency } = useParams();
    const [cardCurrency, setCardCurrency] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const [card, setCard] = useState(location.state || null);
    const [copiedField, setCopiedField] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentCardId, setCurrentCardId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    const fetchCard = async () => {
        try {
            setLoading(true);
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const config = {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken
                },
                withCredentials: true
            };

            const allCardsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/Allvirtual-cards`, config);
            const allCards = allCardsResponse.data.data;

            const matchingCard = allCards.find(card => card.card_id === cardId);

            if (!matchingCard) {
                setError('Card not found');
                return;
            }

            setCurrentCardId(matchingCard.id);

            const cardDetailsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/virtual-cards/${matchingCard.id}/details`, config);
            const cardDetails = cardDetailsResponse.data;

            const updatedCard = {
                ...cardDetails,
                expiry: `${cardDetails.expiry_month}/${cardDetails.expiry_year.toString().slice(-2)}`
            };

            setCard(updatedCard);
            setCardCurrency(updatedCard.card_currency)
        } catch (err) {
            setError('Failed to load card');
            console.error('Error fetching card:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCard();
    }, [cardId]);

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    const updateCardStatus = (newStatus) => {
        setCard(prev => ({
            ...prev,
            is_active: newStatus
        }));
    };

    const handleFunding = () => {
        if (!card) return;
        openModal(
            <CardLayout cardTitle="Funding Card" closeModal={closeModal}>
                <CardFundingForm
                    cardId={card.card_id}
                    currency={card.card_currency}
                    onSuccess={() => {
                        fetchCard();
                        closeModal();
                    }}
                />
            </CardLayout>
        );
    };

    const handleWithdraw = () => {
        if (!card) return;
        openModal(
            <CardLayout cardTitle="Withdraw Funds" closeModal={closeModal}>
                <CardWithdrawalForm
                    closeModal={closeModal}
                    currentCardId={currentCardId}
                    cardId={card.card_id}
                    cardCurrency={card.card_currency}
                    onSuccess={() => {
                        fetchCard();
                        closeModal();
                    }}
                />
            </CardLayout>
        );
    };

    const handleFreezeToggle = async () => {
        setIsLoading(true);
        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            const newStatus = card.is_active ? 1 : 0;

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/virtual-cards/toggle-freeze`,
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
            setIsLoading(false);
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

    const goBack = () => navigate(-1);

    if (loading) return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative my-2 p-5 rounded-xl w-full bg-white"
        >
            <GeneralLoader />
        </motion.div>
    );

    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!card) return <div className="text-center py-10 text-gray-400">No card data available</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-2"
        >
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
                    className="bg-white text-sm flex items-center gap-1 border border-blue-100 text-blue-900 font-medium px-4 py-2.5 rounded-lg active:bg-blue-100 transition-all duration-200 shadow-sm"
                >
                    <TbArrowLeft size={18} /> Back to Cards
                </button>
            </div>
            <div className="w-full flex items-center max-lg:flex-col justify-between max-lg:grid-cols-1 gap-3 rounded-lg p-3 relative bg-white">
                <div className={`w-[420px] h-fit rounded-xl shadow-xl shadow-blue-100 ${card.card_currency === 'NGN' ? 'bg-blue-500' : 'bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950'} p-4 text-white`}>
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
                <div className='bg-white p-4 rounded-lg w-full max-w-[600px]'>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <button
                            disabled={handleBtnDisabled()}
                            onClick={handleFunding}
                            className={`flex items-center justify-center gap-2 border py-2 px-3 rounded-md transition-all duration-75 ${handleBtnDisabled()
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-50 text-blue-700 hover:bg-gray-100'
                                }`}
                        >
                            <FaMoneyBillWave className="text-lg" />
                            Fund
                        </button>

                        <button
                            disabled={handleBtnDisabled()}
                            onClick={handleWithdraw}
                            className={`flex items-center justify-center gap-2 border py-2 px-3 rounded-md transition-all duration-75 ${handleBtnDisabled()
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-50 text-orange-500 hover:bg-gray-100'
                                }`}
                        >
                            <FaMoneyCheckAlt className="text-lg" />
                            Withdraw
                        </button>

                        <button
                            onClick={handleFreezeCard}
                            disabled={isLoading}
                            className={`flex items-center justify-center gap-2 ${card.is_active ? 'text-blue-500' : 'text-green-500'
                                } border py-2 px-3 rounded-md bg-gray-50 transition-all duration-75 hover:bg-gray-100 disabled:opacity-50`}
                        >
                            <FaSnowflake className="text-lg" />
                            {card.is_active ? 'Freeze' : 'Unfreeze'}
                        </button>

                        <button
                            onClick={handleDeleteCard}
                            className="flex items-center justify-center gap-2 text-red-600 border py-2 px-3 rounded-md bg-gray-50 transition-all duration-75 hover:bg-gray-100"
                        >
                            <FaTrashAlt className="text-lg" />
                            Delete
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Card Details</h3>
                        <div className="grid grid-cols-2 gap-4">
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
                                <p className="font-medium">
                                    {card.current_card_limit} {card.card_currency}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CardTransactionTable
                cardId={cardId}
                cardCurrency={currency}
            />

        </motion.div>
    );
};

export default CardDetails;