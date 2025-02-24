import React from 'react'
import ThemeSelector from '../../../ThemeSelector'

const WebsiteSettings = () => {
    return (
        <div className='w-full my-2 rounded-xl bg-white p-3'>
            <form>
                <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-3'>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="site-name" className='text-sm text-[#1E1E1E] font-light'>Site Name</label>
                        <input type="text" id="site-name" name="site-name" placeholder='Topify' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="welcome" className='text-sm text-[#1E1E1E] font-light'>Welcome Notification</label>
                        <input type="text" id="welcome" name="welcome" placeholder='Welcome to Topify' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="hero-title" className='text-sm text-[#1E1E1E] font-light'>Hero Title</label>
                        <input type="text" id="welcome" name="hero-title" placeholder='Data is Life' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    {/* Hero Title color */}
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="hero-title-colour" className='text-sm text-[#1E1E1E] font-light'>Hero Title Colour</label>
                        <ThemeSelector />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="hero-subtitle" className='text-sm text-[#1E1E1E] font-light'>Hero Subtitle</label>
                        <input type="text" id="welcome" name="hero-subtitle" placeholder='Oya register and buy data nah!!' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    {/* About us */}
                    <div className='flex flex-col gap-1 row-span-2'>
                        <label htmlfor="about-us" className='text-sm text-[#1E1E1E] font-light resize-none'>About Us</label>
                        <textarea id="about-us" name="about-us" placeholder='Topify is a data-driven platform that connects businesses with data-driven consumers. We help businesses unlock their potential and drive growth.' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' rows='5' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="contact-address" className='text-sm text-[#1E1E1E] font-light'>Contact Address</label>
                        <input type="text" id="welcome" name="contact-address" placeholder='No.5 Kobi Street' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="contact-email" className='text-sm text-[#1E1E1E] font-light'>Contact Email</label>
                        <input type="text" id="welcome" name="contact-email" placeholder='topify@mail.com' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="contact-phone" className='text-sm text-[#1E1E1E] font-light'>Contact Phone number</label>
                        <input type="text" id="welcome" name="contact-phone" placeholder='+234812345678' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="playstore" className='text-sm text-[#1E1E1E] font-light'>Playstore Link</label>
                        <input type="text" id="welcome" name="playstore" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="apple-store" className='text-sm text-[#1E1E1E] font-light'>Apple store Link</label>
                        <input type="text" id="welcome" name="apple-store" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    {/* Web Theme Colour */}
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="web-theme-colour" className='text-sm text-[#1E1E1E] font-light'>Web Theme Colour</label>
                        <ThemeSelector />
                    </div>
                    <div className='flex'></div>
                    {/* Buttons */}
                    <div className='flex flex-col gap-1'>
                        <button className='w-full py-3 rounded-lg border text-[#434343] font-bold cursor-pointer'>Back</button>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <button type="submit" className='w-full py-3 rounded-lg border border-[#4CACF0] bg-[#4CACF0] hover:bg-[#39a2ed] transition-all duration-75 text-[#FFFFFF] font-bold cursor-pointer'>Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default WebsiteSettings
