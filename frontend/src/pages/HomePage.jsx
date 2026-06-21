import React, { useRef } from 'react'
import HeroSection from '../components/MakeSenseLogo'
import AboutMe from '../components/AboutMe'
import CustomCursor from '../components/CustomCursor'
import HeresHowSection from '../components/HeresHowSection'
import Me from '../components/Me'
import CommunityGarden from '../components/CommunityGarden'
import PhotoStrip from '../components/PhotoStrip'
import MetricsSection from '../section/MetricsSection';
import LogoMarquee from '../components/LogoMarquee'
import Footer from '../components/Footer'
import WalkingRobot from '../components/WalkingRobot'
import Navbar from '../components/Navbar'
import CatLoader from '../components/CatLoader'

import HeroBoard from '../components/HeroBoard'
// import BookFlip from '../components/BookFlip'
// import ImageScroll from '../components/ImageScroll'
// import Testimonials from '../components/TestimonialSection'

export default function HomePage() {
  const footerRef = useRef(null);
  return (
    <>
      <CommunityGarden />
      <WalkingRobot footerRef={footerRef} />


      <Navbar />
      <HeroSection />

      <AboutMe />
      <PhotoStrip />
      <HeresHowSection />
      {/* <CatLoader /> */}
      <Me/>
      <HeroBoard />
      <MetricsSection />
      {/* <WorkSection /> */}
      {/* <LogoMarquee /> */}
      {/* <FilmStrip /> */}

      {/* <ImageScroll /> */}
      {/* <BookFlip /> */}
      <CustomCursor />
      {/* <Testimonials /> */}
      <Footer ref={footerRef} />
    </>
  )
}
