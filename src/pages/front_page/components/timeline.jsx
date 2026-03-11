// src/components/Timeline.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import TimelineItem from './timelineitem';
import './timeline.css';
import milestone1img from "../assets/P1023293.jpg";
import milestone2img from "../assets/P1050130.jpg";
import milestone3img from "../assets/Panel Wideshot.jpg";
import milestone4img from "../assets/Xerxes Students.jpg";

const timelineData = [
  { date: 'December 13, 2023', title: 'Advance Careers’ Inaugural Workshop',
    imageUrl: milestone1img,
    description: 'We delivered our first careers guidance workshops with over 300 students at Parramatta High School. The first of many!' },
  { date: 'August 26, 2024', title: 'First Careers Insights Panel',
    imageUrl: milestone2img,
    description: 'We launched our careers insights panels, starting with Baulkham Hills High School, where we directly connected with hundreds of year 12 students about to embark on their tertiary studies. ' },
  { date: 'End of 2024', title: 'Over 2000 students and growing!',
    imageUrl: milestone3img,
    description: 'With over 50 workshops delivered across 10 schools, our impact continues to grow!' },
  { date: '2025', title: 'Building strong relationships with local schools',
    imageUrl: milestone4img,
    description: 'Annual recurring workshops with Baulkham Hills High School, Willoughby Girls High School and Hunters Hill High School' },
];

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [centersPct, setCentersPct] = useState([]);
  const rafRef = useRef(null);

  const measureCenters = () => {
    const el = containerRef.current;
    if (!el) return;
    const crect = el.getBoundingClientRect();
    const next = itemRefs.current.map((node) => {
      if (!node) return 0;
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2 - crect.left; // px from container left
      return (cx / crect.width) * 100;              // %
    });
    setCentersPct(next);
  };

  // Track positions every frame for a short window so marker moves WITH the card
  const trackDuringTransition = (ms = 650) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();

    const step = (t) => {
      measureCenters();
      if (t - start < ms) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useLayoutEffect(() => {
    measureCenters();

    const onResize = () => measureCenters();
    window.addEventListener('resize', onResize);

    const ro = new ResizeObserver(() => measureCenters());
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Whenever focus changes, start the synced tracking loop
  useEffect(() => {
    measureCenters();
    trackDuringTransition(700); // a hair longer than CSS transition for safety
  }, [activeIndex]);

  return (
    <div className="timeline-section">
      <h1 className="main-title">Our Core Curriculum</h1>

      <div
        className="timeline-items-container"
        ref={containerRef}
        onMouseLeave={() => setActiveIndex(-1)}   // unhover: collapse
      >
        {timelineData.map((data, index) => (
          <TimelineItem
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            data={data}
            index={index}
            isActive={index === activeIndex}
            onHover={(i) => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* Bottom track — marker left is bound to the live card centers */}
      <div className="timeline-track-container" aria-label="Timeline dates">
        <div className="timeline-track" aria-hidden="true" />
        {timelineData.map((d, i) => (
          <div
            key={i}
            className={`track-item ${i === activeIndex ? 'active' : ''}`}
            style={{ left: `${centersPct[i] ?? 0}%` }}
            onMouseEnter={() => setActiveIndex(i)}
          >
            <div className="track-marker" />
            <div className="track-date">{d.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

