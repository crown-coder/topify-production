import React from 'react'
import Logo from '../../assets/logo.png'
import Heart from '../../assets/home/heart.png'

const Footer = () => {
    return (
        <footer className='bg-[#FFFDFD]'>
            <div className='w-full grid grid-cols-4 max-lg:grid-cols-1 p-20 max-lg:p-5'>
                <div className='flex gap-2 items-center'>
                    <img src={Logo} className='w-7 h-7' alt="smart data links logo" />
                    <h2 className='font-semibold text-gray-500'>Smartdatalinks</h2>
                </div>
                <div>
                    <h3 className='font-semibold mb-2'>Legal</h3>
                    <ul>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>Privacy Policy</a></li>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>Terms of use</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className='font-semibold mb-2'>Product</h3>
                    <ul>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>Sign Up</a></li>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>Log In</a></li>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className='font-semibold mb-2'>Resources</h3>
                    <ul>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>Docs</a></li>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>FAQs / Support</a></li>
                        <li className='mb-2'><a href='#' className='text-gray-400 font-semibold'>Contact us</a></li>
                    </ul>
                </div>
            </div>
            <div className='p-7 border-t-2 border-gray-100 flex max-lg:flex-col justify-between items-center max-lg:items-start max-lg:gap-2'>
                <p className='text-[#535353] flex items-center gap-1'>
                    <span>Build with</span>
                    <img src={Heart} alt="heart icon" />
                </p>
                <p className='text-[#535353]'>@2025 Smartdatalinks. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
