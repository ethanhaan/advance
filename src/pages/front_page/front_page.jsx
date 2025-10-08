import React from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';
import Hero from './components/hero';
import Navbar from '../../global_components/Navbar/Navbar';
import RedPage from './components/RedPage';

export default function frontpage () {
  return (
    <div>
      <Navbar />
      <Hero />
      <RedPage />
      <CircularCarousel />
      <Timeline />
    </div>
  )
}
