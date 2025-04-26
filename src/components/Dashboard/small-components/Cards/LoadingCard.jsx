import React from 'react'

const LoadingCard = () => {
    return (
        <div className="bg-white py-3 px-8 rounded-lg flex flex-col items-center gap-4 text-center">
            <span class="loader my-7 text-3xl"></span>
            <p className="text-lg text-[#434343] font-light">
                Processing your transaction...
            </p>
        </div>
    )
}

export default LoadingCard
