import React from 'react'

const TvCard = ({ className, title, amount, duration, txt, onClick }) => {
    return (
        <div onClick={onClick} className={`${className} text-center text-white rounded-md px-2 py-4 cursor-pointer`}>
            <h2 className={`font-bold text-lg max-lg:text-sm ${txt}`}>{title}</h2>
            <p className={`text-sm`}>{amount}</p>
            <p className={`text-sm`}>{duration}</p>
        </div>
    )
}

export default TvCard
