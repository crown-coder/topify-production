import React from 'react'

const ResultCard = ({ className, imageUrl, onClick }) => {
    return (
        <div onClick={onClick} className={`${className} border flex justify-center items-center rounded-lg cursor-pointer`}>
            <img src={imageUrl} alt="Result" className="object-cover w-[200px] h-[200px] max-lg:w-[150px] max-lg:h-[150px] max-lg:py-2" />
        </div>
    )
}

export default ResultCard
