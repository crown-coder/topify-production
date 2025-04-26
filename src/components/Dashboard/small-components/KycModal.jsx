import React, { useState } from 'react';
import { useModal } from '../../ModalContext';
import CardLayout from './Cards/CardLayout';
import { FaUser, FaUpload } from 'react-icons/fa';

const KycModal = ({ onSuccess }) => {
    const { closeModal } = useModal();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [fileName, setFileName] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const errors = {};
        if (!document.getElementById('name').value) errors.name = 'Full name is required';
        if (!selectedMethod) errors.method = 'Please select a KYC method';
        if (!fileName) errors.document = 'Please upload a document';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            console.log("KYC form submitted");
            // Here you would typically submit to your backend
            // await submitKycToBackend(formData);

            // Only proceed if everything was successful
            onSuccess();
            closeModal();
        } catch (error) {
            console.error("KYC submission failed:", error);
            setFormErrors({ submit: 'Submission failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setFormErrors(prev => ({ ...prev, document: '' }));
        } else {
            setFileName('');
        }
    };

    return (
        <CardLayout cardTitle="Please complete your KYC" closeModal={closeModal}>
            <p className='text-sm font-light text-gray-500'>
                To start using our virtual card service, please complete your KYC verification.
            </p>
            {formErrors.submit && (
                <div className="text-red-500 text-sm my-2">{formErrors.submit}</div>
            )}

            <form onSubmit={handleSubmit} className='py-4 flex flex-col gap-3' noValidate>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-sm font-light'>
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={`p-2 rounded-lg border text-[#989898] text-sm font-light ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                        required
                        onChange={() => setFormErrors(prev => ({ ...prev, name: '' }))}
                    />
                    {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-light'>Choose your prepared KYC Method</label>
                    <div className='grid grid-cols-2 gap-3'>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedMethod('nin');
                                setFormErrors(prev => ({ ...prev, method: '' }));
                            }}
                            className={`py-2 border rounded-lg ${selectedMethod === 'nin' ? 'border-blue-500 bg-blue-50 text-blue-500' : 'border-gray-400 bg-gray-100 text-gray-400'}`}
                        >
                            NIN
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedMethod('bvn');
                                setFormErrors(prev => ({ ...prev, method: '' }));
                            }}
                            className={`py-2 border rounded-lg ${selectedMethod === 'bvn' ? 'border-blue-500 bg-blue-50 text-blue-500' : 'border-gray-400 bg-gray-100 text-gray-400'}`}
                        >
                            BVN
                        </button>
                    </div>
                    {formErrors.method && <span className="text-red-500 text-xs">{formErrors.method}</span>}

                    {selectedMethod && (
                        <input
                            type="text"
                            id={selectedMethod}
                            className='p-2 rounded-lg border text-[#989898] text-sm font-light'
                            placeholder={`Enter your ${selectedMethod.toUpperCase()} here`}
                            required
                        />
                    )}
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="document" className='text-sm font-light'>
                        ID Document Upload
                    </label>
                    <label
                        htmlFor="document"
                        className={`relative p-3 rounded-lg border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 ${formErrors.document ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center'>
                            <FaUser className='text-blue-500' />
                        </div>
                        <div className='text-center'>
                            {fileName ? (
                                <p className='text-sm text-gray-700'>{fileName}</p>
                            ) : (
                                <>
                                    <p className='text-sm text-gray-700'>Click to upload your ID document</p>
                                    <p className='text-xs text-gray-500'>Supports: JPG, PNG, PDF</p>
                                </>
                            )}
                        </div>
                        <FaUpload className='text-gray-400' />
                        <input
                            type="file"
                            id="document"
                            className='absolute inset-0 opacity-0 cursor-pointer'
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            required
                        />
                    </label>
                    {formErrors.document && <span className="text-red-500 text-xs">{formErrors.document}</span>}
                </div>

                <button
                    type="submit"
                    className='w-full py-2 text-white font-normal text-lg rounded-lg bg-[#4CACF0] hover:bg-[#3a9bdc] transition-colors disabled:opacity-50'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Submit KYC'}
                </button>
            </form>
        </CardLayout>
    );
};

export default KycModal;