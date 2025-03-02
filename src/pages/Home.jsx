import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Home/Hero'
import WhyChooseUs from '../components/Home/WhyChooseUs'
import AboutUs from '../components/Home/AboutUs'
import Testimonial from '../components/Home/Testimonial'
import OurServices from '../components/Home/OurServices'
import Pricing from '../components/Home/Pricing'
import Footer from '../components/Home/Footer'
import FAQ from '../components/Home/FAQ'
import Demo from '../components/Home/Demo'

const Home = () => {
    return (
        <div>
            <Hero />
            {/* <Demo /> */}
            <WhyChooseUs />
            <AboutUs />
            <Testimonial />
            <OurServices />
            <Pricing />
            <FAQ />
            <Footer />
            {/* <Link to="/dashboard">Go to User Dashboard</Link>
            <Link to="/admin">Go to Admin Dashboard</Link> */}
        </div>
    )
}

export default Home
Home