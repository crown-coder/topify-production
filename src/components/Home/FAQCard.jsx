import React, { useState } from 'react'
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaCircleArrowUp } from "react-icons/fa6";

const FAQCard = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false)

    const toggleShowAnswer = () => setShowAnswer(!showAnswer)

    return (
        <div className={`p-3 ${showAnswer ? 'bg-[#057DD1] shadow-sm' : 'bg-gray-50 border'} transition-all duration-100 rounded-xl`}>
            <div className='flex justify-between'>
                <h3 className={`text-sm font-bold mr-3 ${showAnswer ? 'text-white' : 'text-[#121212]'}`}>{question}</h3>
                <button onClick={toggleShowAnswer}>
                    <span className={`text-xl ${showAnswer ? 'text-white' : 'text-black'} transition-all duration-100`}>{showAnswer ? <FaCircleArrowUp /> : <FaCircleArrowDown />}</span>
                </button>
            </div>
            <div>
                <p className={`${showAnswer ? 'block text-white' : 'hidden'} font-light text-sm mt-2`}>{answer}</p>
            </div>
        </div>
    )
}

export default FAQCard
