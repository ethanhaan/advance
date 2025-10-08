import React from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';
import Hero from './components/hero';
import Navbar from '../../global_components/Navbar/Navbar';
import RedPage from './components/RedPage';
import './front_page.css';

export default function frontpage () {
  return (
    <div>
      <Navbar />
      {/* Wrap Hero and RedPage in a container to scope the sticky effect */}
      <div className="hero-sticky-container">
        <Hero />
        <RedPage />
      </div>
      <CircularCarousel />
      <Timeline />
    </div>
  )
}
