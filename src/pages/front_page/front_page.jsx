import React from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';
import Hero from './components/hero';

export default function frontpage () {
  return (
    <div style={{
      width: "100vw"
    }}>
      <Hero />
      <CircularCarousel />
      <Timeline />
    </div>
  )
}
