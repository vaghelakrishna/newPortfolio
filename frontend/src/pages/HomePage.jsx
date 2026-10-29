import React, { useRef, useEffect } from 'react'
import ScrollRevealHero from '../components/ScrollRevealHero'
import AboutMe from '../components/AboutMe'
import CustomCursor from '../components/CustomCursor'
import HeresHowSection from '../components/HeresHowSection'
import Me from '../components/Me'
import CommunityGarden from '../components/CommunityGarden'
import PhotoStrip from '../components/PhotoStrip'
import FilmStripSection from '../components/FilmStripSection'
import VisitorPassScroll from '../components/VisitorPassScroll'
// import MetricsSection from '../section/MetricsSection';
import LogoMarquee from '../components/LogoMarquee'
import Footer from '../components/Footer'
import WalkingRobot from '../components/WalkingRobot'
import Navbar from '../components/Navbar'
import CatLoader from '../components/CatLoader'
import ProjectsSection from '../section/ProjectsSection'

import HeroBoard from '../components/HeroBoard'
// import BookFlip from '../components/BookFlip'
// import ImageScroll from '../components/ImageScroll'
// import Testimonials from '../components/TestimonialSection'
import MacWorkWindow from "../components/MacWorkWindow";
import MacProjectsDesktop from "../components/MacProjectsDesktop";
import ProjectShowcase from "../components/ProjectShowcase";
import WorkSection from "../components/WorkSection";
import MonthlyRecapSection from "../components/MonthlyRecapSection";

export default function HomePage() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash;
      const el = document.querySelector(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <>
      <CommunityGarden />
      <Navbar />
      <ScrollRevealHero />

      <AboutMe />
      <WalkingRobot/>
      {/* <PhotoStrip /> */}
      {/* <FilmStripSection /> */}
      {/* <VisitorPassScroll /> */}
      <HeresHowSection />
      <ProjectShowcase />
      <WorkSection />
      <MonthlyRecapSection />
      {/* <MacProjectsDesktop /> */}
      {/* <CatLoader /> */}
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
