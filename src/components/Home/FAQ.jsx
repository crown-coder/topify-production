import React from 'react'
import FAQCard from './FAQCard'

const FAQ = () => {
    return (
        <section className='w-full min-h-dvh bg-[#F8FBF8] grid grid-cols-2 max-lg:grid-cols-1 gap-5 p-28 max-lg:px-2 relative'>
            <div>
                <h2 className='text-2xl font-extrabold'>Frequently Asked<br /> Questions</h2>
                <p className='text-xl font-light text-[#6C747D] my-5'>Feel free to reach out to us if you have more<br /> questions for us.</p>
                <button className='flex gap-1 items-center p-2 rounded-lg text-white bg-[#006CB8]'>Contact us</button>
            </div>
            <div className='flex flex-col gap-3'>
                <FAQCard question="How do I know if my account is activated and I can make a purchase?" answer="Once you can access your dashboard, you have successfully registered (Welcome on Board)" />
                <FAQCard question="How will I check if the transaction is successful?" answer="Once you can access your dashboard, you have successfully registered (Welcome on Board)" />
                <FAQCard question="If the transaction fails, what will I do?" answer="Once you can access your dashboard, you have successfully registered (Welcome on Board)" />
                <FAQCard question="How Secure is my transaction History and can I access them anytime?" answer="Once you can access your dashboard, you have successfully registered (Welcome on Board)" />
                <FAQCard question="After registration, what will I do next?" answer="Once you can access your dashboard, you have successfully registered (Welcome on Board)" />
            </div>
        </section>
    )
}

export default FAQ
