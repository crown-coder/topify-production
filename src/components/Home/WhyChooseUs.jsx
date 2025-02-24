import React from 'react'
import Card from './Card'

import Lock from '../../assets/home/lock.png';
import Shild from '../../assets/home/shield-tick.png'
import Bolt from '../../assets/home/share.png'

import Cat from '../../assets/home/cat.png'
import Star from '../../assets/home/star2.png'

const WhyChooseUs = () => {
    return (
        <section className='w-full min-h-dvh bg-[#057DD1] flex flex-col gap-14 items-center p-20 max-lg:px-2 relative'>
            <h1 className='text-white text-4xl'>Why Choose Us</h1>
            <img src={Cat} className='absolute top-0 w-[490px]' />
            <img src={Star} className='absolute w-[70px] top-[135px] left-[440px] max-lg:hidden' />
            <img src={Star} className='absolute w-[150px] bottom-[40px] left-[160px]' />
            <img src={Star} className='absolute w-[80px] top-[350px] right-[180px]' />
            <div className='grid grid-cols-3 max-lg:grid-cols-1 w-[70%] max-lg:w-[95%] gap-7 z-20'>
                <Card className="row-span-2 max-lg:row-span-1" icon={Bolt} title="Quick Delivery" content="Experience effortless airtime and data top-ups with Smart Data Links. Enjoy fast, reliable delivery whenever you need it! Convenience and speed, right at your fingertips." />
                <Card className="col-span-2 max-lg:col-span-1" icon={Shild} title="We are Reliable" content="Smart Data Links delivers 100% value for every transaction. Count on us for a platform that’s trusted, dependable, and always optimized for your needs." />
                <Card className="col-span-2 max-lg:col-span-1" icon={Lock} title="Concrete Security" content="Your funds are protected by your e-wallet PIN and securely stored for as long as you choose. Enjoy the freedom to withdraw anytime you need." />
            </div>
        </section>
    )
}

export default WhyChooseUs
