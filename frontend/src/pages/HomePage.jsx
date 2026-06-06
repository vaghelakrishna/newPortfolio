import React from 'react'
import HeroSection from '../components/MakeSenseLogo'
import AboutMe from '../components/AboutMe'
import CustomCursor from '../components/CustomCursor'
import HeresHowSection from '../components/HeresHowSection'
import Me from '../components/Me'
import CommunityGarden from '../components/CommunityGarden'
import MacWorkWindow from '../components/MacWorkWindow'
import MetricsSection from '../section/MetricsSection';
import LogoMarquee from '../components/LogoMarquee'
import Footer from '../components/Footer'
import WalkingRobot from '../components/WalkingRobot'
import Navbar from '../components/Navbar'
import CatLoader from '../components/CatLoader'
import Folder from '../components/Folder'

// import BookFlip from '../components/BookFlip'
// import ImageScroll from '../components/ImageScroll'
// import Testimonials from '../components/TestimonialSection'

export default function HomePage() {
  return (
    <>
      <CommunityGarden />
      <WalkingRobot />


      <Navbar />
      <HeroSection />
    <Folder/>
      <AboutMe />
      <HeresHowSection />
{/* <CatLoader /> */}
      <Me />
      <MetricsSection />
      {/* <WorkSection /> */}
      {/* <LogoMarquee /> */}
      {/* <FilmStrip /> */}

      {/* <ImageScroll /> */}
      {/* <BookFlip /> */}
      <CustomCursor />
      {/* <Testimonials /> */}
      <Footer />
    </>
  )
}
