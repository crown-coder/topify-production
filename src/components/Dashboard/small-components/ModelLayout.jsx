import React from 'react'


const ModelLayout = ({ children }) => {
    return (
        <div className='absolute w-full h-full bg-gray-400/50 z-50 flex justify-center items-center'>
            <div className="bg-white p-4 rounded shadow-lg">
                {children}
            </div>
        </div>
    )
}

export default ModelLayout
