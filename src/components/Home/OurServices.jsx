import React from 'react'
import Card from './Card'
import Cat from '../../assets/home/cat.png'
import Star from '../../assets/home/star2.png'

import CallIcon from '../../assets/home/call.png'
import GlobeIcon from '../../assets/home/global.png';
import CardPrintingIcon from '../../assets/home/card-printing.png'
import UtilityIcon from '../../assets/home/utility.png'
import ProfileIcon from '../../assets/home/profile.png'
import VideoIcon from '../../assets/home/video-play.png'
import AirtimeToCashIcon from '../../assets/home/airtime-to-cash.png'

const OurServices = () => {
    return (
        <section className='w-full min-h-dvh bg-[#057DD1] flex flex-col gap-14 items-center p-20 max-lg:px-2 relative'>
            <h1 className='text-white text-4xl'>Our Services</h1>
            <img src={Cat} className='absolute top-0 w-[490px]' />
            <img src={Star} className='absolute w-[70px] top-[135px] left-[440px] max-lg:hidden' />
            <img src={Star} className='absolute w-[150px] bottom-[40px] left-[160px]' />
            <img src={Star} className='absolute w-[80px] top-[350px] right-[180px]' />
            <div className='grid grid-cols-3 max-lg:grid-cols-1 w-[90%] max-lg:w-[95%] gap-5 z-20'>
                <Card icon={CallIcon} title="Buy Airtime" content="Making online recharges affordable and hassle-free, anytime, day or night." />
                <Card icon={GlobeIcon} title="Buy Data" content="Start enjoying this very low rates Data plan for your internet browsing data bundle." />
                <Card icon={CardPrintingIcon} title="Card Printing" content="Boost your brand with our premium card printing services. We create customized airtime and data cards with eye-catching designs, clear instructions, and robust security features." />
                <Card icon={UtilityIcon} title="Pay Utility Bills" content="We’ve made paying bills and utilities easier because we understand what you need." />
                <Card icon={ProfileIcon} title="Become an Agent" content="Partner with us to earn and empower your community with ICT-driven solutions." />
                <div className='flex flex-col gap-5'>
                    <Card icon={VideoIcon} title="Cable Subscriptions" content="Activate your cable subscription instantly and enjoy unbeatable discounts!" />
                    <Card icon={AirtimeToCashIcon} title="Airtime to Cash" content="Enjoy this service at highly competitive rates. Log in to check the latest conversion rates!" />
                </div>
            </div>
        </section>
    )
}

export default OurServices
