import React, { useEffect } from 'react'
import Footer from '../components/LandingPage/Footer'

import Header from '../components/LandingPage/Header'
import Testimonial from '../components/LandingPage/Testimonial'
import ParallaxBanner1 from '../components/LandingPage/ParallaxBanner1'
import FaqSection from '../components/LandingPage/FaqSection'
import Pricing from '../components/LandingPage/Pricing'
import AboutPage from '../components/LandingPage/AboutPage'
import IntroductionSection from '../components/LandingPage/IntroductionSection'

function LandingPage() {


    return (
        <div className='landing-page'>
            <Header />

            <IntroductionSection />
            <ParallaxBanner1 />
            <AboutPage />

            <Testimonial />
            <Pricing />

            <FaqSection />
            <Footer />
        </div>
    )
}

export default LandingPage