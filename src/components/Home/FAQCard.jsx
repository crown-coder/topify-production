import React, { useState } from 'react'

const FAQCard = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false)

    const toggleShowAnswer = () => setShowAnswer(!showAnswer)

    return (
        <div className={`p-3 ${showAnswer ? 'bg-white shadow-sm' : 'bg-gray-100'} transition-all duration-75 rounded-lg border`}>
            <div className='flex justify-between'>
                <h3 className='text-sm font-bold mr-3 text-[#121212]'>{question}</h3>
                <button onClick={toggleShowAnswer}>
                    <span>{showAnswer ? '-' : '+'}</span>
                </button>
            </div>
            <div>
                <p className={`${showAnswer ? 'block' : 'hidden'} text-[#121212] font-light text-sm mt-2`}>{answer}</p>
            </div>
        </div>
    )
}

export default FAQCard
