import React, { useState } from 'react';
import { TbCurrencyNaira } from 'react-icons/tb';
import { FaDollarSign } from 'react-icons/fa';

const CreateVirtualCard = ({ onCardCreated }) => {
    const [cardType, setCardType] = useState('Naira');
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        houseNumber: '',
        pin: '',
        billingAddress: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        if (!formData.houseNumber.trim()) newErrors.houseNumber = 'House number is required';
        if (!formData.pin || formData.pin.length !== 4 || !/^\d+$/.test(formData.pin)) {
            newErrors.pin = 'PIN must be 4 digits';
        }
        if (cardType === 'Dollar' && !formData.billingAddress.trim()) {
            newErrors.billingAddress = 'International billing address is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Only proceed if everything was successful
            alert(`Virtual ${cardType} Card Created Successfully!`);
            onCardCreated();
        } catch (error) {
            console.error("Card creation failed:", error);
            alert("Failed to create card. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full p-4 bg-white rounded-xl mt-2">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Header and Info */}
                <div className="space-y-6">
                    <header>
                        <h1 className="text-xl font-semibold text-gray-700 mb-3">Create Your Virtual Card</h1>
                        <p className="text-gray-600 text-sm">
                            Securely shop online, pay bills, and manage subscriptions with our virtual cards.
                            {cardType === 'Dollar' && (
                                <span className="block mt-2 text-blue-600 font-medium">
                                    Dollar cards require international billing addresses.
                                </span>
                            )}
                        </p>
                    </header>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="font-medium text-blue-800 mb-2">Why choose a virtual card?</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">✓</span>
                                <span>Secure online payments without exposing your main account</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">✓</span>
                                <span>Set spending limits and expiration dates</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">✓</span>
                                <span>Instant issuance with no physical card needed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div>
                    <section className="mb-6">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Select Card Type</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setCardType('Naira')}
                                className={`p-4 rounded-lg flex items-center justify-center border transition-all ${cardType === 'Naira'
                                        ? 'bg-blue-50 border-blue-500 shadow-inner'
                                        : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                                    }`}
                                aria-label="Select Naira card"
                            >
                                <TbCurrencyNaira className="text-2xl text-blue-600 mr-2" />
                                <span className="font-medium">Naira Card</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setCardType('Dollar')}
                                className={`p-4 rounded-lg flex items-center justify-center border transition-all ${cardType === 'Dollar'
                                        ? 'bg-green-50 border-green-500 shadow-inner'
                                        : 'bg-gray-50 border-gray-200 hover:border-green-300'
                                    }`}
                                aria-label="Select Dollar card"
                            >
                                <FaDollarSign className="text-2xl text-green-600 mr-2" />
                                <span className="font-medium">Dollar Card</span>
                            </button>
                        </div>
                    </section>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="As it appears on your ID"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.fullName ? 'border-red-500' : ''
                                        }`}
                                    required
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Your current address"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.address ? 'border-red-500' : ''
                                        }`}
                                    required
                                />
                                {errors.address && (
                                    <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Your current City"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.city ? 'border-red-500' : ''
                                        }`}
                                    required
                                />
                                {errors.city && (
                                    <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Your current state"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.state ? 'border-red-500' : ''
                                        }`}
                                    required
                                />
                                {errors.state && (
                                    <p className="mt-1 text-xs text-red-500">{errors.state}</p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="Postal Code"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.postalCode ? 'border-red-500' : ''
                                        }`}
                                    required
                                />
                                {errors.postalCode && (
                                    <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">House Number</label>
                                <input
                                    type="text"
                                    name="houseNumber"
                                    value={formData.houseNumber}
                                    onChange={handleChange}
                                    placeholder="Your House Number"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.houseNumber ? 'border-red-500' : ''
                                        }`}
                                    required
                                />
                                {errors.houseNumber && (
                                    <p className="mt-1 text-xs text-red-500">{errors.houseNumber}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card PIN</label>
                            <input
                                type="password"
                                name="pin"
                                value={formData.pin}
                                onChange={handleChange}
                                placeholder="4 digits"
                                className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.pin ? 'border-red-500' : ''
                                    }`}
                                maxLength={4}
                                pattern="\d{4}"
                                inputMode="numeric"
                                required
                            />
                            {errors.pin ? (
                                <p className="mt-1 text-xs text-red-500">{errors.pin}</p>
                            ) : (
                                <p className="mt-1 text-xs text-gray-500">This PIN will be used for card transactions</p>
                            )}
                        </div>

                        {cardType === 'Dollar' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">International Billing Address</label>
                                <input
                                    type="text"
                                    name="billingAddress"
                                    value={formData.billingAddress}
                                    onChange={handleChange}
                                    placeholder="Street, City, Country"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.billingAddress ? 'border-red-500' : ''
                                        }`}
                                    required={cardType === 'Dollar'}
                                />
                                {errors.billingAddress && (
                                    <p className="mt-1 text-xs text-red-500">{errors.billingAddress}</p>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-[#4CACF0] hover:bg-[#3A9BDE]'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                `Create ${cardType} Card`
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <footer className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-600">Note:</span> KYC verification is required for card generation.
                    All cards are issued in accordance with our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
                </p>
            </footer>
        </div>
    );
};

export default CreateVirtualCard;