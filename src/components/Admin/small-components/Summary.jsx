import React from 'react'

const Summary = ({ title, number, className, textColor }) => {
    return (
        <div className={`flex justify-between items-center py-7 px-4 ${className} rounded-xl`}>
            <p className={`${textColor} text-lg`}>{title}</p>
            <h1 className={`${textColor} font-bold text-2xl`}>{number}</h1>
        </div>
    )
}

export default Summary
