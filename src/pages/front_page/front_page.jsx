import React, { useState, useEffect, useRef } from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';
import Hero from './components/hero';
import Informational from './components/informational';
import RedPage from './components/RedPage';
import { useOnHitTop } from '../../global_components/utils.js';
import './front_page.css';

export default function Frontpage({setIsNavbarFixed, setIsOpaque}) {
  const ref = useOnHitTop({
    onEnter: ()=>{setIsOpaque(true);},
    onLeave: ()=>{setIsOpaque(false);},
  });

  useEffect(() => {
    setIsNavbarFixed(true);
    setIsOpaque(false);
  }, []);

  return (
    <div>
      {/* Wrap Hero and RedPage in a container to scope the sticky effect */}
      <div className="hero-sticky-container">
        <Hero />
        <RedPage />
      </div>
      <div ref={ref}>
        <Informational />
        <Timeline />
      </div>
    </div>
  );
}
