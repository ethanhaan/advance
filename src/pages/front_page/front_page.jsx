import React, { useState, useEffect, useRef } from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';
import Hero from './components/hero';
import Informational from './components/informational';
import RedPage from './components/RedPage';
import './front_page.css';

export default function Frontpage({setIsNavbarFixed}) {
  const stickyContainerRef = useRef(null);

  return (
    <div>
      {/* Wrap Hero and RedPage in a container to scope the sticky effect */}
      <div className="hero-sticky-container" ref={stickyContainerRef}>
        <Hero />
        <RedPage />
      </div>
      <Informational />
      <Timeline />
    </div>
  );
}
