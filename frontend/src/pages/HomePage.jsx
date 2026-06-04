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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CommunityGarden />
      <AboutMe />

      <Me />
      <MetricsSection />
      {/* <WorkSection /> */}
      {/* <LogoMarquee /> */}
      {/* <FilmStrip /> */}
      <CustomCursor />
      <HeresHowSection />
      <Footer />
    </>
  )
}
