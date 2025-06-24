import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import AlertBox from './AlertBox';

const FormField = ({ label, name, value, onChange, placeholder, error, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2.5 rounded-lg border text-gray-600 text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
            required
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

const CameraModal = ({ onCapture, onCancel, videoRef, canvasRef }) => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-xl max-w-md w-full">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto rounded-lg"
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    type="button"
                    onClick={onCapture}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Capture
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

const CreateVirtualCard = ({ onCardCreated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        dateOfBirth: '',
        city: '',
        state: '',
        country: 'Nigeria',
        postal_code: '',
        house_no: '',
        id_type: 'bvn',
        bvn_number: '',
        nin_number: '',
        passport_number: '',
        card_type_id: '',
    });

    const xsrfToken = Cookies.get('XSRF-TOKEN');

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success' // 'success', 'error', 'warning', 'info'
    });

    const [cardsAvailable, setCardsAvailable] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
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

    const fetchAvailableCards = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/getCardType`, {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                },
                withCredentials: true,
            });

            const allCards = response.data.data || [];
            const activeCards = allCards.filter(card => card.status === 'active');
            setCardsAvailable(activeCards);
        } catch (error) {
            console.error("Error fetching available cards:", error);

            setAlert({
                show: true,
                message: "Failed to fetch available cards. Please try again later.",
                type: "error"
            });
        }
    };

    useEffect(() => {
        fetchAvailableCards();
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.postal_code.trim()) newErrors.postal_code = 'Postal code is required';
        if (!formData.house_no.trim()) newErrors.house_no = 'House number is required';
        if (!formData.card_type_id) newErrors.card_type_id = 'Card type is required';

        if (!formData.bvn_number || formData.bvn_number.length !== 11 || !/^\d+$/.test(formData.bvn_number)) {
            newErrors.bvn_number = 'BVN must be 11 digits';
        }

        if (formData.id_type === 'nin') {
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
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setShowCamera(true);
            setCameraType(type);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please upload an image instead.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        canvas.toBlob((blob) => {
            if (!blob) return;

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
            formDataToSend.append('card_type_id', formData.card_type_id);
            formDataToSend.append('first_name', formData.firstName);
            formDataToSend.append('last_name', formData.lastName);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('date_of_birth', formData.dateOfBirth);
            formDataToSend.append('country', formData.country);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('state', formData.state);
            formDataToSend.append('postal_code', formData.postal_code);
            formDataToSend.append('house_no', formData.house_no);

            if (selectedCard?.provider === 'graph') {
                formDataToSend.append('bank_id_number', formData.bvn_number);
                formDataToSend.append('id_type', formData.id_type);

                if (formData.id_type === 'bvn') {
                    formDataToSend.append('bvn_number', formData.bvn_number);
                } else if (formData.id_type === 'nin') {
                    formDataToSend.append('nin_number', formData.nin_number);
                    if (frontIdImage) formDataToSend.append('front_card', frontIdImage);
                    if (backIdImage) formDataToSend.append('back_card', backIdImage);
                } else if (formData.id_type === 'passport') {
                    formDataToSend.append('passport_number', formData.passport_number);
                    if (frontIdImage) formDataToSend.append('passport_image', frontIdImage);
                }
            } else {
                formDataToSend.append('id_type', formData.id_type);

                if (formData.id_type === 'bvn') {
                    formDataToSend.append('bvn_number', formData.bvn_number);
                } else if (formData.id_type === 'nin') {
                    formDataToSend.append('nin_number', formData.nin_number);
                    if (frontIdImage) formDataToSend.append('front_card', frontIdImage);
                    if (backIdImage) formDataToSend.append('back_card', backIdImage);
                } else if (formData.id_type === 'passport') {
                    formDataToSend.append('passport_number', formData.passport_number);
                    if (frontIdImage) formDataToSend.append('passport_image', frontIdImage);
                }
            }

            if (selfieImage) {
                formDataToSend.append('selfie_image', selfieImage);
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/virtual-cards/create-holder`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true,
                }
            );

            setAlert({
                show: true,
                message: "Virtual Card User Created Successfully!",
                type: "success"
            });

            onCardCreated(response.data);
        } catch (error) {
            console.error("Card creation failed:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to create card user Account. Please try again.";
            setAlert({
                show: true,
                message: errorMessage,
                type: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCardSelect = (card) => {
        setSelectedCard(card);
        setFormData(prev => ({
            ...prev,
            card_type_id: card.id,
            id_type: card.provider === 'graph' ? 'bvn' : prev.id_type
        }));
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
                                className={`w-full p-3 rounded-lg border text-gray-600 text-sm ${errors.nin_number ? 'border-red-500' : 'border-gray-300'}`}
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
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                            >
                                                Take Photo
                                            </button>
                                            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer">
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
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                            >
                                                Take Photo
                                            </button>
                                            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer">
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
                                className={`w-full p-3 rounded-lg border text-gray-600 text-sm ${errors.passport_number ? 'border-red-500' : 'border-gray-300'}`}
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
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                        >
                                            Take Photo
                                        </button>
                                        <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer">
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
                            name="bvn_number"
                            value={formData.bvn_number}
                            onChange={handleChange}
                            placeholder="22222222222"
                            className={`w-full p-3 rounded-lg border text-gray-600 text-sm ${errors.bvn_number ? 'border-red-500' : 'border-gray-300'}`}
                            inputMode="numeric"
                            maxLength="11"
                            required
                        />
                        {errors.bvn_number ? (
                            <p className="mt-1 text-xs text-red-500">{errors.bvn_number}</p>
                        ) : (
                            <p className="mt-1 text-xs text-gray-500">Please fill your valid BVN (11 digits)</p>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="w-full p-6 bg-white rounded-xl shadow-sm mt-2">

            {alert.show && (
                <AlertBox
                    message={alert.message}
                    isVisible={alert.show}
                    onDismiss={() => setAlert({ ...alert, show: false })}
                    type={alert.type}
                />
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Information Section */}
                <div className="space-y-6">
                    <header className="space-y-2">
                        <h1 className="text-2xl font-semibold text-gray-800">Create Your Virtual Card</h1>
                        <p className="text-gray-500">
                            Securely shop online, pay bills, and manage subscriptions with our virtual cards.
                        </p>
                    </header>

                    <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                        <h3 className="font-medium text-blue-700 mb-3">Why choose a virtual card?</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                            {[
                                "Secure online payments without exposing your main account",
                                "Set spending limits and expiration dates",
                                "Instant issuance with no physical card needed"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircleIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Form Section */}
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Card Application
                        </h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Fill the form below to create your card user account
                        </p>
                    </section>

                    <section className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-700">Card Type</h3>
                        {errors.card_type_id && (
                            <p className="mt-1 text-xs text-red-500">{errors.card_type_id}</p>
                        )}
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            {cardsAvailable.map(card => (
                                <div
                                    key={card.id}
                                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${formData.card_type_id === card.id ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                    onClick={() => handleCardSelect(card)}
                                >
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="card_type_id"
                                            value={card.id}
                                            checked={formData.card_type_id === card.id}
                                            className="form-radio h-4 w-4 text-blue-600"
                                            onChange={() => { }}
                                            required
                                        />
                                        <div>
                                            <span className="block text-sm font-medium text-gray-800">{card.name}</span>
                                            <span className="block text-xs text-gray-500">
                                                {card.currency} {card.limit} Limit
                                                {card.fee !== "0.00" && ` (Fee: ${card.fee})`}
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </section>

                    {selectedCard && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First name"
                                    error={errors.firstName}
                                />
                                <FormField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last name"
                                    error={errors.lastName}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Your current address"
                                    error={errors.address}
                                />
                                <FormField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    placeholder="Your date of birth"
                                    error={errors.dateOfBirth}
                                    type="date"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Your current city"
                                    error={errors.city}
                                />
                                <FormField
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    error={errors.state}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="Postal Code"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                    placeholder="Postal code"
                                    error={errors.postal_code}
                                />
                                <FormField
                                    label="House Number"
                                    name="house_no"
                                    value={formData.house_no}
                                    onChange={handleChange}
                                    placeholder="House number"
                                    error={errors.house_no}
                                />
                            </div>

                            {/* {selectedCard.provider !== 'graph' && ( */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                                <select
                                    name="id_type"
                                    value={formData.id_type}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2.5 rounded-lg border text-gray-600 text-sm ${errors.id_type ? 'border-red-500' : 'border-gray-300'}`}
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
                            {/* )} */}

                            {renderIdFields()}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Selfie Image</label>
                                {selfiePreview ? (
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <img
                                                src={selfiePreview}
                                                alt="Selfie preview"
                                                className="h-24 w-24 object-cover rounded-lg border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelfiePreview('');
                                                    setSelfieImage(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <XMarkIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => startCamera('selfie')}
                                                className="px-4 py-2 bg-[#4CACF0] text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                            >
                                                Take Photo
                                            </button>
                                            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer">
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
                                <CameraModal
                                    onCapture={captureImage}
                                    onCancel={stopCamera}
                                    videoRef={videoRef}
                                    canvasRef={canvasRef}
                                />
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-[#4CACF0] hover:bg-[#3A9BDE] shadow-sm'
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
                                    'Register For Card'
                                )}
                            </button>
                        </form>
                    )}
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