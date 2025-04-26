import React from 'react';

const ElectricityBillForm = ({
    formData,
    handleInputChange,
    handleSubmit,
    isValidating,
    validationMessage
}) => {
    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Meter Number</label>
                    <input
                        type='text'
                        name="meterNumber"
                        value={formData.meterNumber || ''} // Ensure controlled component
                        onChange={handleInputChange}
                        placeholder='Enter meter number'
                        className='w-full p-3 rounded-lg border text-sm font-light focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        required
                        disabled={isValidating}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                    <input
                        type='tel'
                        name="phoneNumber"
                        value={formData.phoneNumber || ''}
                        onChange={handleInputChange}
                        placeholder='Enter phone number'
                        className='w-full p-3 rounded-lg border text-sm font-light focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        required
                        pattern="[0-9]{11}"
                        title="Please enter a valid 11-digit phone number"
                        disabled={isValidating}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Amount (₦)</label>
                    <input
                        type='number'
                        name="amount"
                        value={formData.amount || ''}
                        onChange={handleInputChange}
                        placeholder='Enter amount'
                        className='w-full p-3 rounded-lg border text-sm font-light focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        required
                        min="100"
                        disabled={isValidating}
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full p-3 rounded-lg text-white bg-[#4CACF0] hover:bg-[#3A9BDE] transition-colors font-medium ${isValidating ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isValidating}
                >
                    {isValidating ? 'Validating...' : 'Validate & Pay'}
                </button>

                {validationMessage && (
                    <p className={`text-sm text-center mt-2 font-medium ${validationMessage.includes("✅") ? "text-green-600" : "text-red-600"}`}>
                        {validationMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ElectricityBillForm;