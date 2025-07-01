import React, { useState } from "react";

const Form = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="flex max-lg:flex-col items-start gap-10">
            {/* Step Indicator */}
            <div className="flex flex-col max-lg:flex-row items-center max-lg:justify-center">
                {/* Step 1 */}
                <div className="flex flex-col text-center items-center gap-4">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold 
                        ${step >= 1 ? "bg-[#4CACF0]" : "bg-gray-300"}`}
                    >
                        1
                    </div>
                    <span className={`text-[10px] font-semibold ${step >= 1 ? "text-[#4CACF0]" : "text-gray-500"}`}>
                        User Tag
                    </span>
                </div>

                {/* Dynamic Dotted Line */}
                <div
                    className={`border-dotted ${step >= 2 ? "border-[#4CACF0]" : "border-gray-400"}
                    max-lg:w-60 max-lg:h-[2px] w-[2px] h-52 border-l-2 max-lg:border-t-2 max-lg:border-l-0`}
                ></div>

                {/* Step 2 */}
                <div className="flex flex-col text-center items-center gap-4">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold 
                        ${step >= 2 ? "bg-[#4CACF0]" : "bg-gray-300"}`}
                    >
                        2
                    </div>
                    <span className={`text-[10px] font-semibold ${step >= 2 ? "text-[#4CACF0]" : "text-gray-500"}`}>
                        Transfer Details
                    </span>
                </div>
            </div>

            {/* Form */}
            <form className="w-full">
                <div className="grid grid-cols-1 gap-10 max-lg:gap-3">
                    {/* Step 1: User Tag */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#1E1E1E] font-light">User Tag*</label>
                        <input
                            className="p-3 border rounded-lg"
                            type="text"
                            placeholder="jefftherealdeal"
                            name="usertag"
                            required
                        />
                    </div>

                    {/* Step 2: Amount & Narration */}
                    <div className="mt-32 max-lg:mt-0 grid grid-cols-2 max-lg:grid-cols-1 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#1E1E1E] font-light">Amount*</label>
                            <input
                                className="p-3 border rounded-lg"
                                type="number"
                                name="amount"
                                required
                                onFocus={() => setStep(2)} // Move to step 2 when focused
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#1E1E1E] font-light">Narration</label>
                            <input
                                className="p-3 border rounded-lg"
                                type="text"
                                placeholder="Optional"
                                name="narration"
                                onFocus={() => setStep(2)} // Move to step 2 when focused
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full my-6 py-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]"
                >
                    Proceed
                </button>
            </form>
        </div>
    );
};

export default Form;
