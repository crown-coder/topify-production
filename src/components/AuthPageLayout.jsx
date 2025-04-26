import React from 'react'
import Pana from '../assets/home/pana.png'

const AuthPageLayout = ({ children }) => {
    return (
        <section className='h-dvh w-full relative flex items-center justify-center'>
            <img src={Pana} className='w-full h-dvh object-contain absolute top-0 left-0 -z-10' />
            {children}
        </section>
    )
}

export default AuthPageLayout
