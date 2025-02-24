import React from 'react'
import Pana from '../../assets/home/pana.png'

const AboutUs = () => {
    return (
        <section className='w-full min-h-dvh bg-[#F8FBF8] flex flex-col gap-20 max-lg:gap-10 items-center p-20 max-lg:px-5'>
            <h1 className='text-black text-4xl'>About Us</h1>
            <div className='w-full grid grid-cols-2 max-lg:gri  max-lg:grid-cols-1 gap-3 max-lg:gap-4'>
                <div className='max-lg:order-2'>
                    <img src={Pana} className='w-full' />
                </div>
                <div className='max-lg:order-1'>
                    <p className='text-3xl max-lg:text-2xl font-extralight leading-relaxed'>With Smart Data Links, you can easily buy mobile data, airtime, pay electricity bills, and manage TV subscriptions—all from one platform. Our goal is to help you save money while ensuring quick, secure, and seamless transactions. Our data plans are compatible with all devices, from Android and iPhone to computers and modems, and you can roll over unused data if you renew before it expires.</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
