import React from 'react'
import DemoVideo from '../../assets/home/demo.mp4'

const Demo = () => {
    return (
        <section className='w-full min-h-dvh bg-[#F8FBF8] flex flex-col gap-16 items-center relative'>
            {/* Video Section */}
            <div className='rounded-xl overflow-hidden shadow-lg mt-5'>
                <video autoPlay loop muted className='w-[200px] h-[400px] object-cover'>
                    <source src={DemoVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    )
}

export default Demo
