import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { motion } from "framer-motion";
import { electricCompany } from '../../constants/constants';
import Prepaid from '../../assets/prepaid.png';
import Postpaid from '../../assets/postpaid.png';
import { useModal } from '../ModalContext';
import CardLayout from './small-components/Cards/CardLayout';
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { TailSpin } from 'react-loader-spinner';
import Confetti from "react-confetti";
import { MdCancel } from "react-icons/md";

// Create axios instance with default config
const api = axios.create({
    baseURL: 'https://app.smartdatalinks.ng',
    withCredentials: true, // This ensures cookies are sent with requests
    headers: {
        'Content-Type': 'application/json'
    }
});

const ElectricityPaymentForm = ({
    type,
    company,
    closeModal,
    getDiscoName
}) => {
    const [formData, setFormData] = useState({
        meterNumber: '',
        phoneNumber: '',
        amount: ''
    });
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: ''
    });
    const [validationMessage, setValidationMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const { openModal } = useModal();
    const navigate = useNavigate();

    // Electricity distributor ID mapping
    const discoIdMap = {
        'JED': 9,    // Jos Electric
        'KEDCO': 4,  // Kano Electric
        'BEDC': 10,  // Benin Electric
        'AEDC': 3,   // Abuja Electric
        'YEDC': 11,  // Yola Electric
    };

    // Fetch wallet balance
    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const response = await api.get('/api2/user');
                const balance = parseFloat(response.data?.wallet?.balance || 0);
                setWalletBalance(balance);
            } catch (err) {
                console.error('Failed to fetch wallet balance:', err);
            }
        };
        fetchWalletBalance();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateMeterNumber = useCallback(async (meterNumber) => {
        if (!meterNumber || meterNumber.length < 6) {
            setValidationMessage('');
            setIsValid(false);
            setCustomerDetails({ name: '', address: '' });
            return;
        }

        const meter_type = type.toLowerCase();
        const disco_name = getDiscoName(company);
        const url = `/validate_meter?meter_number=${meterNumber}&disco_name=${disco_name}&meter_type=${meter_type}`;

        try {
            setIsValidating(true);
            const res = await api.get(url);

            if (res.data?.name) {
                setValidationMessage(`${res.data.name}`);
                setIsValid(true);
                setCustomerDetails({
                    name: res.data.name,
                    address: res.data.address || ''
                });
            } else {
                setValidationMessage('Invalid meter number');
                setIsValid(false);
                setCustomerDetails({ name: '', address: '' });
            }
        } catch (error) {
            const message = error.response?.data?.message ||
                error.message ||
                "Failed to validate meter";
            setValidationMessage(`${message}`);
            setIsValid(false);
            setCustomerDetails({ name: '', address: '' });

            if (error.response?.status === 401) {
                console.error('Session expired, please login again');
                setError('Session expired, please login again');
            }
        } finally {
            setIsValidating(false);
        }
    }, [type, company, getDiscoName]);

    // Debounced meter number validation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.meterNumber) {
                validateMeterNumber(formData.meterNumber);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [formData.meterNumber, validateMeterNumber]);

    const handleFundWallet = () => {
        closeModal();
        navigate('/dashboard/fund-wallet');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const amountValue = parseFloat(formData.amount);

        // Check wallet balance
        if (amountValue > walletBalance) {
            setError(`Insufficient funds. Your balance is ₦${walletBalance.toFixed(2)}. `);
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await api.post(
                '/electricity_bill_payments',
                {
                    electricity_distributor_id: discoIdMap[company] || 0,
                    disco_name: getDiscoName(company),
                    meter_number: formData.meterNumber,
                    meter_type: type.toLowerCase(),
                    amount: amountValue,
                    name: customerDetails.name,
                    address: customerDetails.address,
                    phone_number: formData.phoneNumber
                }
            );

            // Update wallet balance
            setWalletBalance(prev => prev - amountValue);

            // Show success modal
            openModal(
                <div className="relative">
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={500}
                    />
                    <div className="p-6 text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                        <div className="text-left mb-4">
                            <p><strong>Disco:</strong> {company}</p>
                            <p><strong>Type:</strong> {type}</p>
                            <p><strong>Meter Number:</strong> {formData.meterNumber}</p>
                            <p><strong>Amount:</strong> ₦{amountValue.toFixed(2)}</p>
                            <p><strong>Customer:</strong> {customerDetails.name}</p>
                            {customerDetails.address && <p><strong>Address:</strong> {customerDetails.address}</p>}
                            <p className="mt-2"><strong>Remaining balance:</strong> ₦{(walletBalance - amountValue).toFixed(2)}</p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-[#4CACF0] text-white rounded hover:bg-[#3A9BDE]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            );
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'An error occurred. Please try again.';
            setError(errorMessage);

            if (err.response?.status === 401) {
                console.error('Authentication failed:', errorMessage);
            }
            console.error('Payment error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* <div className='flex justify-between items-center mb-4'>
                <h2 className='text-[#434343] font-normal text-lg'>
                    {company} {type} Payment
                </h2>
                <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close modal"
                >
                    <MdCancel size={20} />
                </button>
            </div> */}

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                    Wallet Balance: <span className="font-bold">₦{walletBalance.toFixed(2)}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Meter Number</label>
                    <input
                        type='text'
                        name="meterNumber"
                        value={formData.meterNumber}
                        onChange={handleInputChange}
                        placeholder='Enter meter number'
                        className='w-full p-3 rounded-lg border text-sm font-light'
                        required
                    />
                    {validationMessage && (
                        <div className={`my-1 p-2 ${isValid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} text-sm rounded`}>
                            {validationMessage}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                    <input
                        type='tel'
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder='Enter phone number'
                        className='w-full p-3 rounded-lg border text-sm font-light'
                        required
                        pattern="[0-9]{11}"
                        title="Please enter a valid 11-digit phone number"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Amount (₦)</label>
                    <input
                        type='number'
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder='Enter amount'
                        className='w-full p-3 rounded-lg border text-sm font-light'
                        required
                        min="100"
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded flex items-center justify-between">
                        {error.includes('Insufficient') ? (
                            <>
                                {error}
                                <button
                                    onClick={handleFundWallet}
                                    className="text-white py-1 px-2 rounded-md bg-blue-600"
                                >
                                    Fund
                                </button>
                            </>
                        ) : (
                            error
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full p-3 rounded-lg text-white font-medium transition-colors flex items-center justify-center ${isValid && !isValidating && !isSubmitting
                        ? 'bg-[#4CACF0] hover:bg-[#3A9BDE]'
                        : validationMessage && !isValid && !isValidating
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    disabled={!isValid || isValidating || isSubmitting}
                >
                    {isValidating ? (
                        <>
                            <ImSpinner8 className="animate-spin mr-2" />
                            Validating...
                        </>
                    ) : isSubmitting ? (
                        <>
                            <TailSpin color="#FFF" height={20} width={20} className="mr-2" />
                            Processing Payment...
                        </>
                    ) : validationMessage && !isValid ? (
                        'Invalid Meter No.'
                    ) : (
                        'Proceed to Payment'
                    )}
                </button>
            </form>
        </div>
    );
};

const PayElectricityBill = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const [activeCompany, setActiveCompany] = useState("JED");

    const getDiscoName = useCallback((companyName) => {
        const discoMap = {
            JED: "jos-electric",
            KEDCO: "kano-electric",
            BEDC: "benin-electric",
            AEDC: "abuja-electric",
            YEDC: "yola-electric",
        };
        return discoMap[companyName] || companyName.toLowerCase().replace(/\s/g, "-");
    }, []);

    const handleSubModal = (type) => {
        openModal(
            <CardLayout cardTitle={`${type} Payment - ${activeCompany}`} closeModal={closeModal}>
                <div className="mt-4">
                    <ElectricityPaymentForm
                        type={type}
                        company={activeCompany}
                        closeModal={closeModal}
                        getDiscoName={getDiscoName}
                    />
                </div>
            </CardLayout>
        );
    };

    const handleNavigateToTransactionHistory = () => {
        navigate("/dashboard/pay-electricity-bill/wallet-table");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-5 flex flex-col items-center gap-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl">
                <div className="w-full mb-5 flex justify-end">
                    <button
                        className="cursor-pointer text-gray-600 text-sm flex gap-1 items-center transition-all duration-100 hover:text-[#4CACF0]"
                        onClick={handleNavigateToTransactionHistory}
                    >
                        <span>View All Purchase</span>
                        <MdKeyboardArrowRight className="text-xl" />
                    </button>
                </div>

                <div className="flex justify-between overflow-x-auto w-[30%] max-lg:w-[70%] mt-3 p-1 rounded-lg relative gap-2">
                    {electricCompany.map((el, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCompany(el.name)}
                            className={`flex items-center justify-center rounded-full border transition-all duration-100 ${activeCompany === el.name ? 'border-2 border-blue-700 scale-110 bg-blue-50' : 'border-gray-300'}`}
                        >
                            <img
                                src={el.image}
                                alt={el.name}
                                className='w-[45px] h-[45px] object-contain max-lg:w-[35px] max-lg:h-[35px] p-1'
                            />
                        </button>
                    ))}
                </div>

                <div className='mt-10 w-[80%] max-lg:w-[90%] grid grid-cols-2 max-lg:grid-cols-1 gap-4'>
                    <div
                        className='bg-[#2CA0F2] h-[250px] max-lg:h-[160px] rounded-lg relative text-center pt-8 cursor-pointer hover:shadow-lg transition-shadow'
                        onClick={() => handleSubModal("Prepaid")}
                    >
                        <h2 className='text-white font-bold text-5xl max-lg:text-3xl uppercase'>Prepaid</h2>
                        <img src={Prepaid} alt="Prepaid electricity" className='w-[220px] max-lg:w-[150px] absolute bottom-0 right-0' />
                    </div>
                    <div
                        className='bg-[#C2D9EA] h-[250px] max-lg:h-[160px] rounded-lg relative text-center pt-8 cursor-pointer hover:shadow-lg transition-shadow'
                        onClick={() => handleSubModal("Postpaid")}
                    >
                        <h2 className='text-[#006CB8] font-bold text-5xl max-lg:text-3xl uppercase'>Postpaid</h2>
                        <img src={Postpaid} alt="Postpaid electricity" className='w-[220px] max-lg:w-[150px] absolute bottom-0 right-0' />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PayElectricityBill;