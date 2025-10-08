import React, { useState, useEffect, useRef } from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';
import Hero from './components/hero';
import Navbar from '../../global_components/Navbar/Navbar';
import RedPage from './components/RedPage';
import './front_page.css';

export default function Frontpage() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const stickyContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyContainerRef.current) {
        // Trigger when the top of the viewport scrolls past the bottom of the container
        const containerBottom = stickyContainerRef.current.offsetTop + stickyContainerRef.current.offsetHeight;
        if (window.scrollY > containerBottom) {
          setIsNavbarFixed(true);
        } else {
          setIsNavbarFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <Navbar isFixed={isNavbarFixed} />
      {/* Wrap Hero and RedPage in a container to scope the sticky effect */}
      <div className="hero-sticky-container" ref={stickyContainerRef}>
        <Hero />
        <RedPage />
      </div>
      <CircularCarousel />
      <Timeline />
    </div>
  );
}
