import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import AlertBox from './AlertBox';
import { TiDocumentText } from "react-icons/ti";

const FormField = ({ label, name, value, onChange, placeholder, error, type = 'text', required = true, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2.5 rounded-lg border text-gray-600 text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
            required={required}
            {...props}
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
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const [cardsAvailable, setCardsAvailable] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [fieldRequirements, setFieldRequirements] = useState(null);
    const [isLoadingFields, setIsLoadingFields] = useState(false);
    const [formData, setFormData] = useState({});
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

    const fetchFieldRequirements = async (cardId) => {
        setIsLoadingFields(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/card-types/${cardId}/fields`, {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                },
                withCredentials: true,
            });

            setFieldRequirements(response.data.data);

            const initialFormData = {};
            const requirements = response.data.data.required_fields;

            // Initialize basic fields
            Object.keys(requirements).forEach(field => {
                if (field !== 'id_type' && !['selfie_image', 'front_card', 'back_card', 'passport_image'].includes(field)) {
                    initialFormData[field] = '';
                }
            });

            setFormData(initialFormData);

        } catch (error) {
            console.error("Error fetching field requirements:", error);
            setAlert({
                show: true,
                message: "Failed to load form requirements. Please try again.",
                type: "error"
            });
        } finally {
            setIsLoadingFields(false);
        }
    };

    useEffect(() => {
        fetchAvailableCards();
    }, []);

    const handleCardSelect = async (card) => {
        setSelectedCard(card);
        setErrors({});
        setSelfieImage(null);
        setSelfiePreview('');
        setFrontIdImage(null);
        setFrontIdPreview('');
        setBackIdImage(null);
        setBackIdPreview('');
        await fetchFieldRequirements(card.id);
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'selfie') {
                    setSelfiePreview(reader.result);
                    setSelfieImage(file);
                    if (errors.selfie) setErrors(prev => ({ ...prev, selfie: '' }));
                } else if (type === 'frontId') {
                    setFrontIdPreview(reader.result);
                    setFrontIdImage(file);
                    if (errors.frontId || errors.passport_image) {
                        setErrors(prev => ({
                            ...prev,
                            frontId: '',
                            passport_image: ''
                        }));
                    }
                } else if (type === 'backId') {
                    setBackIdPreview(reader.result);
                    setBackIdImage(file);
                    if (errors.backId) setErrors(prev => ({ ...prev, backId: '' }));
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
            setAlert({
                show: true,
                message: "Could not access camera. Please upload an image instead.",
                type: "error"
            });
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
                    if (errors.selfie) setErrors(prev => ({ ...prev, selfie: '' }));
                } else if (cameraType === 'frontId') {
                    setFrontIdImage(file);
                    setFrontIdPreview(reader.result);
                    if (errors.frontId || errors.passport_image) {
                        setErrors(prev => ({
                            ...prev,
                            frontId: '',
                            passport_image: ''
                        }));
                    }
                } else if (cameraType === 'backId') {
                    setBackIdImage(file);
                    setBackIdPreview(reader.result);
                    if (errors.backId) setErrors(prev => ({ ...prev, backId: '' }));
                }
            };
            reader.readAsDataURL(canvas.toDataURL('image/jpeg'));
            stopCamera();
        }, 'image/jpeg', 0.9);
    };

    const validateForm = () => {
        if (!fieldRequirements) return {};

        const newErrors = {};
        const requirements = fieldRequirements.required_fields;

        // Validate required fields
        if (requirements.date_of_birth === 'required' && !formData.date_of_birth) {
            newErrors.date_of_birth = 'Date of birth is required';
        }

        // Validate ID type specific fields
        if (formData.id_type && requirements.id_type) {
            const idTypeRequirements = requirements.id_type[formData.id_type];

            if (idTypeRequirements) {
                Object.entries(idTypeRequirements).forEach(([field, requirement]) => {
                    if (requirement.includes('required')) {
                        if (field === 'front_card' && !frontIdImage) {
                            newErrors.frontId = 'Front of ID is required';
                        } else if (field === 'back_card' && !backIdImage) {
                            newErrors.backId = 'Back of ID is required';
                        } else if (field === 'passport_image' && !frontIdImage) {
                            newErrors.passport_image = 'Passport image is required';
                        } else if (!formData[field]) {
                            newErrors[field] = `${field.replace(/_/g, ' ')} is required`;
                        }
                    }
                });
            }
        }

        // Validate selfie image
        if (requirements.selfie_image === 'image required' && !selfieImage) {
            newErrors.selfie = 'Selfie image is required';
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

        console.log("🟢 Starting form submission process");

        // Log all data that will be submitted
        console.group("📋 SUBMISSION DATA:");
        console.log("Card Type ID:", selectedCard?.id);
        console.log("Form Fields:", JSON.parse(JSON.stringify(formData)));
        console.log("Selfie Image:", selfieImage ? `File (${selfieImage.name}, ${selfieImage.size} bytes)` : "None");
        console.log("Front ID Image:", frontIdImage ? `File (${frontIdImage.name}, ${frontIdImage.size} bytes)` : "None");
        console.log("Back ID Image:", backIdImage ? `File (${backIdImage.name}, ${backIdImage.size} bytes)` : "None");
        console.groupEnd();

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('card_type_id', selectedCard.id);

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    formDataToSend.append(key, value);
                }
            });

            // Add files based on ID type
            if (selfieImage) formDataToSend.append('selfie_image', selfieImage);

            if (formData.id_type === 'nin') {
                if (frontIdImage) formDataToSend.append('front_card', frontIdImage);
                if (backIdImage) formDataToSend.append('back_card', backIdImage);
            } else if (formData.id_type === 'passport') {
                if (frontIdImage) formDataToSend.append('passport_image', frontIdImage);
            }

            // Log final FormData contents
            console.group("📦 Final FormData Contents:");
            for (let [key, value] of formDataToSend.entries()) {
                if (value instanceof File) {
                    console.log(`${key}:`, value.name, `(File, ${value.size} bytes)`);
                } else {
                    console.log(`${key}:`, value);
                }
            }
            console.groupEnd();

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

            console.log("Server response:", response.data);

            setAlert({
                show: true,
                message: "Virtual Card User Created Successfully!",
                type: "success"
            });

            onCardCreated(response.data);

        } catch (error) {
            console.error("Submission error:", error);

            let errorMessage = "Submission failed. Please try again.";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            setAlert({
                show: true,
                message: errorMessage,
                type: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderDynamicFields = () => {
        if (!fieldRequirements) return null;

        const requirements = fieldRequirements.required_fields;
        const fields = [];

        // Create a map of field names to their configuration
        const dateFields = ['date_of_birth', 'expiry_date', 'issue_date'];

        // Always show date of birth if required
        if (requirements.date_of_birth === 'required') {
            fields.push(
                <FormField
                    key="date_of_birth"
                    label="Date of Birth"
                    name="date_of_birth"
                    value={formData.date_of_birth || ''}
                    onChange={handleChange}
                    placeholder="Enter your date of birth"
                    error={errors.date_of_birth}
                    required={true}
                    type="date"
                />
            );
        }

        // Show ID type dropdown if specified in requirements
        if (requirements.id_type) {
            const idTypeOptions = Object.keys(requirements.id_type);

            fields.push(
                <div key="id_type">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Type
                    </label>
                    <select
                        name="id_type"
                        value={formData.id_type || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border text-gray-600 text-sm border-gray-300"
                    >
                        <option value="">Select ID Type</option>
                        {idTypeOptions.map(option => (
                            <option key={option} value={option}>
                                {option.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        // Show fields based on selected ID type
        if (formData.id_type && requirements.id_type && requirements.id_type[formData.id_type]) {
            const idTypeFields = requirements.id_type[formData.id_type];

            Object.entries(idTypeFields).forEach(([field, requirement]) => {
                if (field === 'front_card' && requirement.includes('required')) {
                    fields.push(
                        <div key="frontId">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Front of ID <span className="text-red-500">*</span>
                            </label>
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
                    );
                } else if (field === 'back_card' && requirement.includes('required')) {
                    fields.push(
                        <div key="backId">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Back of ID <span className="text-red-500">*</span>
                            </label>
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
                    );
                } else if (field === 'passport_image' && requirement.includes('required')) {
                    fields.push(
                        <div key="passportImage">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Passport Image <span className="text-red-500">*</span>
                            </label>
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
                                    {errors.passport_image && (
                                        <p className="mt-1 text-xs text-red-500">{errors.passport_image}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                } else if (requirement.includes('required')) {
                    fields.push(
                        <FormField
                            key={field}
                            label={field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            name={field}
                            value={formData[field] || ''}
                            onChange={handleChange}
                            placeholder={`Enter your ${field.replace(/_/g, ' ')}`}
                            error={errors[field]}
                            required={true}
                            type={dateFields.includes(field) ? 'date' : 'text'}
                        />
                    );
                }
            });
        }

        // Always show selfie image if required
        if (requirements.selfie_image === 'image required') {
            fields.push(
                <div key="selfie">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selfie Image <span className="text-red-500">*</span>
                    </label>
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
            );
        }

        return fields;
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

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Card Application
                        </h2>
                        <p className="text-gray-600 text-sm mb-6">
                            {selectedCard
                                ? `Creating ${selectedCard.name} (${selectedCard.currency})`
                                : "Select a card type to begin"}
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
                                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedCard?.id === card.id ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                                    onClick={() => handleCardSelect(card)}
                                >
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="card_type_id"
                                            value={card.id}
                                            checked={selectedCard?.id === card.id}
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
                            {isLoadingFields ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <>
                                    {renderDynamicFields()}

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
                                </>
                            )}
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