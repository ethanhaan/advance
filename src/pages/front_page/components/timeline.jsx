// src/components/Timeline.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import './Timeline.css';

const timelineData = [
  { date: 'August 21, 2024', title: 'Career Panel Event',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80',
    description: 'Hosted our annual career panel, connecting students with industry professionals.' },
  { date: 'October 15, 2024', title: '2,000 Students and Growing!',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80',
    description: 'Our impact continues to grow! Workshops at local high schools take us past 2,000 students.' },
  { date: 'November 5, 2024', title: 'Leadership Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1470&q=80',
    description: 'A special workshop focusing on building leadership skills for the next generation.' },
  { date: 'December 1, 2024', title: 'End of Year Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1470&q=80',
    description: 'Celebrating a successful year of impact and growth with our team and volunteers.' },
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
      <h1 className="main-title">Our History</h1>

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

