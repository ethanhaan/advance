// src/components/Timeline.jsx

import React, { useState } from 'react';
import TimelineItem from './TimelineItem'; // Make sure the path is correct
import './Timeline.css'; // Import the CSS file

// Data for the timeline
const timelineData = [
  {
    date: 'August 21, 2024',
    title: 'Career Panel Event',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Hosted our annual career panel, connecting students with industry professionals.'
  },
  {
    date: 'October 15, 2024',
    title: '2,000 Students and Growing!',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    description: 'Our impact continues to grow! Workshops at local high schools take us past 2,000 students.'
  },
  {
    date: 'November 5, 2024',
    title: 'Leadership Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'A special workshop focusing on building leadership skills for the next generation.'
  },
  {
    date: 'December 1, 2024',
    title: 'End of Year Celebration',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Celebrating a successful year of impact and growth with our team and volunteers.'
  }
];

const Timeline = () => {
  // State to track the active (hovered) item. Initialize to the second item.
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="timeline-section">
      <h1 className="main-title">Our History</h1>
      
      {/* Container for the image cards */}
      <div className="timeline-items-container">
        {timelineData.map((data, index) => (
          <TimelineItem 
            data={data}
            index={index}
            key={index}
            isActive={index === activeIndex}
            onHover={setActiveIndex}
          />
        ))}
      </div>

      {/* Container for the bottom timeline track */}
      <div className="timeline-track-container">
        <div className="timeline-track"></div>
        {timelineData.map((data, index) => (
          <div key={index} className={`track-item ${index === activeIndex ? 'active' : ''}`}>
            <div className="track-marker"></div>
            <div className="track-date">{data.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;