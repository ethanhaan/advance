// src/TimelineItem.js

import React from 'react';

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    {/* This title is for the IDLE, vertical state */}
    <h2 className="timeline-item-title-idle">{data.title}</h2>

    {/* This block is for the EXPANDED, hover state */}
    <div className="timeline-item-content">
      <time className="timeline-item-date">{data.date}</time>
      <h2 className="timeline-item-title">{data.title}</h2>
      <p className="timeline-item-desc">{data.description}</p>
    </div>

    {/* The image is in the background */}
    <img className="timeline-item-image" src={data.imageUrl} alt={data.title} />
  </div>
);

export default TimelineItem;