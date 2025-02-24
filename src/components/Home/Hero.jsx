import React from 'react'
import NavBar from './NavBar'
import ScrollingLogos from './ScrollingLogos';
import { MdOutlineDownload } from "react-icons/md";
import UsersIcon from '../../assets/home/users.png'
import Partner from '../../assets/home/partner.png'

import Spring from '../../assets/home/spring.png'
import Star from '../../assets/home/star.png'
import Bolt from '../../assets/home/bolt.png'
import Kite from '../../assets/home/kite.png'



const Hero = () => {
    return (
        <section className='w-full min-h-dvh bg-[#F8FBF8] flex flex-col gap-16 items-center'>
            <NavBar />
            <div className=' w-full text-center flex flex-col items-center gap-5 max-lg:gap-7'>
                <div className='relative max-lg:w-[90%]'>
                    <img src={Spring} className='w-[50px] max-lg:w-[40px] absolute -top-5 -left-20 max-lg:-left-3 max-lg:-top-7' />
                    <img src={Star} className='w-[73px] max-lg:w-[45px] absolute -top-1 -right-20 max-lg:-right-3 max-lg:-top-9' />
                    <img src={Kite} className='w-[73px] max-lg:w-[55px] absolute -bottom-10 -right-10 max-lg:right-3 max-lg:-bottom-5' />
                    <img src={Bolt} className='w-[73px] max-lg:w-[50px] absolute -bottom-10 -left-16 max-lg:-left-1 max-lg:-bottom-7' />
                    <h1 className='text-5xl max-lg:text-2xl font-medium leading-[70px]'>The <span className='text-[#057DD1]'>Best</span> choice for your<br />
                        Virtual <span className='text-[#057DD1]'>Top-Up</span> Services</h1>
                    <p className='text-lg max-lg:text-sm text-[#000000D9] mt-7'>
                        We offer a wide range of mobile network services, enabling users to<br className='max-lg:hidden' /> recharge airtime and data across various networks with ease.
                    </p>
                </div>
                <button className='flex max-lg:mt-5 gap-2 text-white bg-[#057DD1] p-3 rounded-lg font-normal text-lg'>
                    <span>Download Now</span>
                    <MdOutlineDownload size={25} />
                </button>
                <img src={UsersIcon} className='w-[350px] max-lg:w-[300px]' />
                <ScrollingLogos />
            </div>
        </section>
    )
}

export default Hero