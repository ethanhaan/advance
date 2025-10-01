import React from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';
import Hero from "./components/hero.jsx";

export default function frontpage () {
  return (
    <main>
      <Hero />
      <div>random div here</div>
      <Timeline />
      <CircularCarousel />
    </main>
  )
}
