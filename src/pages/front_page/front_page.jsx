import React from 'react';
import Timeline from './components/timeline';
import CircularCarousel from './components/circular-carousel';

export default function frontpage () {
  return (
    <div style={{
      width: "100vw"
    }}>
      <CircularCarousel />
    </div>
  )
}
