import React from 'react'

const Card = ({ title, amount, button, className, btn, content, justify, icon }) => {
    return (
        <div className={`flex justify-between p-3 bg-slate-100 dark:bg-gray-600 dark:text-white rounded-xl ${className} ${justify}`}>
            <div>
                <h4 className='text-lg font-normal'>{title}</h4>
                <h2 className={`text-[#434343] dark:text-white text-3xl font-bold my-1 ${className}`}>{amount}</h2>
                <button className={`${btn} flex gap-1 items-center text-[#434343] dark:text-white text-sm font-light mt-2`}>{icon}{button}</button>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default Card
