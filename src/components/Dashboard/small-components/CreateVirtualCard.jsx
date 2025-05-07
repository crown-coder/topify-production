import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateVirtualCard = ({ onCardCreated }) => {
    // const xsrfToken = Cookies.get('XSRF-TOKEN');
    // console.log(xsrfToken)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        country: 'Nigeria',
        postal_code: '',
        house_no: '',
        id_type: 'bvn', 
        bvn_number: '', 
        nin_number: '',
        passport_number: ''
    });

    const [selfieImage, setSelfieImage] = useState(null);
    const [selfiePreview, setSelfiePreview] = useState('');
    const [frontIdImage, setFrontIdImage] = useState(null);
    const [frontIdPreview, setFrontIdPreview] = useState('');
    const [backIdImage, setBackIdImage] = useState(null);
    const [backIdPreview, setBackIdPreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraType, setCameraType] = useState('selfie');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.postal_code.trim()) newErrors.postal_code = 'Postal code is required';
        if (!formData.house_no.trim()) newErrors.house_no = 'House number is required';

        // Validate based on ID type
        if (formData.id_type === 'bvn') {
            if (!formData.bvn_number || formData.bvn_number.length !== 11 || !/^\d+$/.test(formData.bvn_number)) {
                newErrors.bvn = 'BVN must be 11 digits';
            }
        } else if (formData.id_type === 'nin') {
            if (!formData.nin_number || !/^\d+$/.test(formData.nin_number)) {
                newErrors.nin_number = 'Valid NIN is required';
            }
            if (!frontIdImage) newErrors.frontId = 'Front of ID is required';
            if (!backIdImage) newErrors.backId = 'Back of ID is required';
        } else if (formData.id_type === 'passport') {
            if (!formData.passport_number || !/^\d+$/.test(formData.passport_number)) {
                newErrors.passport_number = 'Valid passport number is required';
            }
            if (!frontIdImage) newErrors.frontId = 'Passport image is required';
        }

        if (!selfieImage) newErrors.selfie = 'Selfie image is required';
        return newErrors;
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'selfie') {
                    setSelfiePreview(reader.result);
                    setSelfieImage(file);
                } else if (type === 'frontId') {
                    setFrontIdPreview(reader.result);
                    setFrontIdImage(file);
                } else if (type === 'backId') {
                    setBackIdPreview(reader.result);
                    setBackIdImage(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async (type) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setShowCamera(true);
            setCameraType(type);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please upload an image instead.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            const file = new File([blob], `${cameraType}.jpg`, { type: 'image/jpeg' });
            const reader = new FileReader();
            reader.onloadend = () => {
                if (cameraType === 'selfie') {
                    setSelfieImage(file);
                    setSelfiePreview(reader.result);
                } else if (cameraType === 'frontId') {
                    setFrontIdImage(file);
                    setFrontIdPreview(reader.result);
                } else if (cameraType === 'backId') {
                    setBackIdImage(file);
                    setBackIdPreview(reader.result);
                }
            };
            reader.readAsDataURL(canvas.toDataURL('image/jpeg'));
            stopCamera();
        }, 'image/jpeg', 0.9);
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
            const formDataToSend = new FormData();

            formDataToSend.append('first_name', formData.firstName);
            formDataToSend.append('last_name', formData.lastName);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('country', formData.country);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('state', formData.state);
            formDataToSend.append('postal_code', formData.postal_code);
            formDataToSend.append('house_no', formData.house_no);
            formDataToSend.append('id_type', formData.id_type);

            if (selfieImage) {
                formDataToSend.append('selfie_image', selfieImage);
            }

            if (formData.id_type === 'bvn') {
                formDataToSend.append('bvn_number', formData.bvn_number);  // Changed from 'bvn' to 'bvn_number'
            } else if (formData.id_type === 'nin') {
                formDataToSend.append('nin_number', formData.nin_number);
                if (frontIdImage) formDataToSend.append('front_card', frontIdImage);  // Changed field name
                if (backIdImage) formDataToSend.append('back_card', backIdImage);  // Changed field name
            } else if (formData.id_type === 'passport') {
                formDataToSend.append('passport_number', formData.passport_number);
                if (frontIdImage) formDataToSend.append('passport_image', frontIdImage);  // Changed field name
            }

            const xsrfToken = Cookies.get('XSRF-TOKEN');

            const response = await axios.post(
                '/api/virtual-cards/create-holder',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true,
                }
            );

            alert("Virtual Card User Created Successfully!");
            onCardCreated(response.data);
        } catch (error) {
            console.error("Card creation failed:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to create card user Account. Please try again.";
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderIdFields = () => {
        switch (formData.id_type) {
            case 'nin':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIN Number</label>
                            <input
                                type="text"
                                name="nin_number"
                                value={formData.nin_number}
                                onChange={handleChange}
                                placeholder="Enter your NIN"
                                className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.nin_number ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.nin_number && (
                                <p className="mt-1 text-xs text-red-500">{errors.nin_number}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Front of ID</label>
                                {frontIdPreview ? (
                                    <div className="mb-2">
                                        <img
                                            src={frontIdPreview}
                                            alt="Front ID preview"
                                            className="h-32 w-full object-cover rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFrontIdPreview('');
                                                setFrontIdImage(null);
                                            }}
                                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                                        >
                                            Change Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => startCamera('frontId')}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                            >
                                                Take Photo
                                            </button>
                                            <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 cursor-pointer">
                                                Upload Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'frontId')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {errors.frontId && (
                                            <p className="mt-1 text-xs text-red-500">{errors.frontId}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Back of ID</label>
                                {backIdPreview ? (
                                    <div className="mb-2">
                                        <img
                                            src={backIdPreview}
                                            alt="Back ID preview"
                                            className="h-32 w-full object-cover rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBackIdPreview('');
                                                setBackIdImage(null);
                                            }}
                                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                                        >
                                            Change Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => startCamera('backId')}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                            >
                                                Take Photo
                                            </button>
                                            <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 cursor-pointer">
                                                Upload Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'backId')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {errors.backId && (
                                            <p className="mt-1 text-xs text-red-500">{errors.backId}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                );
            case 'passport':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                            <input
                                type="text"
                                name="passport_number"
                                value={formData.passport_number}
                                onChange={handleChange}
                                placeholder="Enter your passport number"
                                className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.passport_number ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.passport_number && (
                                <p className="mt-1 text-xs text-red-500">{errors.passport_number}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Passport Image</label>
                            {frontIdPreview ? (
                                <div className="mb-2">
                                    <img
                                        src={frontIdPreview}
                                        alt="Passport preview"
                                        className="h-32 w-full object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFrontIdPreview('');
                                            setFrontIdImage(null);
                                        }}
                                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                                    >
                                        Change Image
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => startCamera('frontId')}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                        >
                                            Take Photo
                                        </button>
                                        <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 cursor-pointer">
                                            Upload Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'frontId')}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {errors.frontId && (
                                        <p className="mt-1 text-xs text-red-500">{errors.frontId}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                );
            case 'bvn':
            default:
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">BVN Number</label>
                        <input
                            type="text"
                            name="bvn_number"  // Changed from 'bvn' to 'bvn_number'
                            value={formData.bvn_number}  // Changed from 'bvn' to 'bvn_number'
                            onChange={handleChange}
                            placeholder="22222222222"
                            className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.bvn ? 'border-red-500' : ''}`}
                            inputMode="numeric"
                            maxLength="11"
                            required
                        />
                        {errors.bvn ? (
                            <p className="mt-1 text-xs text-red-500">{errors.bvn}</p>
                        ) : (
                            <p className="mt-1 text-xs text-gray-500">Please fill your valid BVN (11 digits)</p>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="w-full p-4 bg-white rounded-xl mt-2">
            <div className="grid md:grid-cols-2 gap-2">
                {/* Left Column - Header and Info */}
                <div className="space-y-6">
                    <header>
                        <h1 className="text-xl font-semibold text-gray-700 mb-3">Create Your Virtual Card</h1>
                        <p className="text-gray-600 text-sm">
                            Securely shop online, pay bills, and manage subscriptions with our virtual cards.
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
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Fill the below form to Create Your Card User Account
                        </h2>
                    </section>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First name"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.firstName ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last name"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.lastName ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Your current address"
                                className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.address ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.address && (
                                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                            )}
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
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.city ? 'border-red-500' : ''}`}
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
                                    placeholder="State"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.state ? 'border-red-500' : ''}`}
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
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                    placeholder="Postal Code"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.postal_code ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.postal_code && (
                                    <p className="mt-1 text-xs text-red-500">{errors.postal_code}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">House Number</label>
                                <input
                                    type="text"
                                    name="house_no"
                                    value={formData.house_no}
                                    onChange={handleChange}
                                    placeholder="Your House Number"
                                    className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.house_no ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.house_no && (
                                    <p className="mt-1 text-xs text-red-500">{errors.house_no}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select ID type</label>
                            <select
                                name="id_type"
                                value={formData.id_type}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border text-[#989898] text-sm font-light ${errors.id_type ? 'border-red-500' : ''}`}
                                required
                            >
                                <option value="bvn">BVN</option>
                                <option value="nin">NIN</option>
                                <option value="passport">Passport</option>
                            </select>
                            {errors.id_type && (
                                <p className="mt-1 text-xs text-red-500">{errors.id_type}</p>
                            )}
                        </div>

                        {renderIdFields()}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Selfie Image</label>
                            {selfiePreview ? (
                                <div className="mb-2">
                                    <img
                                        src={selfiePreview}
                                        alt="Selfie preview"
                                        className="h-32 w-32 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelfiePreview('');
                                            setSelfieImage(null);
                                        }}
                                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                                    >
                                        Change Image
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => startCamera('selfie')}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                        >
                                            Take Photo
                                        </button>
                                        <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 cursor-pointer">
                                            Upload Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'selfie')}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {errors.selfie && (
                                        <p className="mt-1 text-xs text-red-500">{errors.selfie}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {showCamera && (
                            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-lg max-w-md">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-auto"
                                    />
                                    <canvas ref={canvasRef} className="hidden" />
                                    <div className="flex justify-center mt-4 space-x-4">
                                        <button
                                            type="button"
                                            onClick={captureImage}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                        >
                                            Capture
                                        </button>
                                        <button
                                            type="button"
                                            onClick={stopCamera}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
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
                                `Register For Card`
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