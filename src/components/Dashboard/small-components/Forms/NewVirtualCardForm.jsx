import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Skeleton from "react-loading-skeleton";

const NewVirtualCardForm = ({ onCreateCard, closeModal, selectedCard }) => {
    const [walletBalance, setWalletBalance] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fundingAmount: '',
        pin: '',
    });

    // Get XSRF token from cookies
    const xsrfToken = Cookies.get('XSRF-TOKEN');

    //fetch wallet Balance
    const fetchWalletBalance = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api2/user`)
            setWalletBalance(response.data.wallet.balance);
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWalletBalance();
    }, []);


    //fetch exchange rate
    const fetchExchangeRate = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/getExchangeRates`);
            setExchangeRate(response.data.data.app_rate);
            // console.log('Exchange Rate:', response.data.data.app_rate);
        } catch (err) {
            console.error('Error fetching exchange rate:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchExchangeRate();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        setError(null);

        try {
            // Validate PIN
            if (!formData.pin || formData.pin.length !== 4) {
                throw new Error('PIN must be 4 digits');
            }

            // Validate funding amount
            if (!formData.fundingAmount || parseFloat(formData.fundingAmount) <= 0) {
                throw new Error('Please enter a valid funding amount');
            }

            const requestData = {
                card_type_id: selectedCard.id,
                funding_amount: formData.fundingAmount,
                pin: formData.pin
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/virtual-cards/card/create`,
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true,
                }
            );

            // Call success callback with the new card data
            onCreateCard(response.data);
            closeModal();

        } catch (error) {
            console.error('Error creating card:', error.response?.data);
            setError(error.response?.data?.message || error.message || 'Failed to create card');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            {selectedCard && (
                <div className="mb-6 relative ">
                    <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 text-white overflow-hidden shadow-lg transition-all duration-75 hover:shadow-none cursor-pointer">
                        {/* Card shine effect */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-gradient-to-r from-transparent via-white to-transparent"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-xs opacity-80">Card Type</p>
                                    <p className="font-medium">{selectedCard.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs opacity-80">Creation Fee</p>
                                    <p className="font-medium">{selectedCard.fee} USD</p>
                                </div>
                            </div>

                            <div className="mb-2">
                                <p className="text-xs opacity-80 mb-1">Limit</p>
                                <p className="text-xl font-bold">{selectedCard.limit} USD</p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs opacity-80">Currency</p>
                                    <p className="font-medium">{selectedCard.currency}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-[45px] h-[45px] bg-white/20 rounded-full flex items-center justify-center">
                                        <img src='/logo.png' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10"></div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/5"></div>
                    </div>

                    {/* Card status indicator (optional) */}
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        {selectedCard.status}
                    </div>
                </div>
            )}

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-2">
                <div className="flex justify-between items-end">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                            {loading ? (
                                <Skeleton width={100} />
                            ) : (
                                "Wallet Balance"
                            )}
                        </h4>
                        <p className="text-2xl font-bold text-gray-800">
                            {loading ? (
                                <Skeleton width={150} height={32} />
                            ) : (
                                <span className="flex items-center">
                                    <span className="text-gray-600">₦</span>
                                    {new Intl.NumberFormat('en-NG').format(walletBalance)}
                                </span>
                            )}
                        </p>
                    </div>

                    <div>
                        {/* <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                            {loading ? (
                                <Skeleton width={100} />
                            ) : (
                                "Today's Exchange Rate"
                            )}
                        </p> */}
                        <p className="text-sm font-bold text-gray-800">
                            {loading ? (
                                <Skeleton width={150} height={32} />
                            ) : (
                                <span className="flex items-center text-green-600">
                                    <span className="mr-1">₦</span>
                                    {new Intl.NumberFormat('en-NG', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }).format(exchangeRate)}
                                    <span className="text-sm font-medium text-gray-500 ml-1">/USD</span>
                                </span>
                            )}
                        </p>
                    </div>

                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="fundingAmount" className="text-sm font-light">
                        Amount to Fund
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                        <input
                            className="w-full pl-8 p-2 rounded-lg border text-[#989898] text-sm font-light"
                            type="number"
                            name="fundingAmount"
                            value={formData.fundingAmount}
                            onChange={handleChange}
                            min="1"
                            step="any"
                            placeholder="Enter amount in USD"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="pin" className="text-sm font-light">
                        New PIN (4 digits)
                    </label>
                    <input
                        className="p-2 rounded-lg border text-[#989898] text-sm font-light"
                        name="pin"
                        type="password"
                        value={formData.pin}
                        onChange={handleChange}
                        placeholder="Enter 4-digit PIN"
                        maxLength={4}
                        pattern="\d{4}"
                        title="Please enter exactly 4 digits"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isCreating}
                    className={`w-full p-3 mt-2 bg-[#4CACF0] rounded-md text-white hover:bg-[#3a8bc8] transition-colors ${isCreating ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isCreating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        'Create Card'
                    )}
                </button>
            </form>
        </div>
    )
}

export default NewVirtualCardForm;