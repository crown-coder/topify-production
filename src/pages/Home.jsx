import { useAuth } from '../hooks/useAuth'
import Hero from '../components/Home/Hero'
import WhyChooseUs from '../components/Home/WhyChooseUs'
import AboutUs from '../components/Home/AboutUs'
import Testimonial from '../components/Home/Testimonial'
import OurServices from '../components/Home/OurServices'
import Pricing from '../components/Home/Pricing'
import Footer from '../components/Home/Footer'
import FAQ from '../components/Home/FAQ'

const Home = () => {
    useAuth({ middleware: 'guest', redirectIfAuthenticated: '/dashboard' })

    return (
        <div>
            <Hero />
            <WhyChooseUs />
            <AboutUs />
            <Testimonial />
            <OurServices />
            <Pricing />
            <FAQ />
            <Footer />
        </div>
    )
}

export default Home
