import React from 'react'
import Card from './Card'
import Cat from '../../assets/home/cat.png'
import Star from '../../assets/home/star2.png'
import Avatar from '../../assets/home/avatar.png'

const Testimonial = () => {
    return (
        <section className='w-full min-h-dvh bg-[#F8FBF8] flex flex-col gap-14 items-center p-20 max-lg:px-2 relative'>
            <h1 className='text-black text-4xl'>Testimonials</h1>
            <img src={Cat} className='absolute top-0 w-[490px] opacity-20' />
            <img src={Star} className='absolute w-[70px] top-[135px] opacity-20 left-[440px] max-lg:hidden' />
            <img src={Star} className='absolute w-[150px] bottom-[40px] opacity-20 left-[50px]' />
            <img src={Star} className='absolute w-[100px] top-[430px] opacity-20 right-[70px]' />
            <div className='grid grid-cols-3 max-lg:grid-cols-1 w-[90%] max-lg:w-[95%] gap-5 z-20'>
                <Card iconStyle="w-12" icon={Avatar} title="Sadiq" rank="Web Developer" content=" I wholeheartedly recommend it for a variety of compelling reasons. Not only does it offer some of the most budget-friendly data plans available, but it also excels in terms of speed, automation, and security." />
                <Card iconStyle="w-12" icon={Avatar} title="Sadiq" rank="Web Developer" content=" I wholeheartedly recommend it for a variety of compelling reasons. Not only does it offer some of the most budget-friendly data plans available, but it also excels in terms of speed, automation, and security." />
                <Card iconStyle="w-12" icon={Avatar} title="Sadiq" rank="Web Developer" content=" Start enjoying this very low rates Data plan for your internet browsing data bundle." />
                <Card iconStyle="w-12" className="col-span-2 max-lg:col-span-1" icon={Avatar} title="Sadiq" rank="Web Developer" content="  In my experience, I wholeheartedly recommend it for a variety of compelling reasons. Not only does it offer some of the most budget-friendly data plans available, but it also excels in terms of speed, automation, and security." />
                <Card iconStyle="w-12" icon={Avatar} title="Sadiq" rank="Web Developer" content=" Start enjoying this very low rates Data plan for your internet browsing data bundle." />
            </div>
        </section>
    )
}

export default Testimonial
