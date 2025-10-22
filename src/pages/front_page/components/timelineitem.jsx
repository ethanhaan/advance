import React, { forwardRef } from 'react';

const TimelineItem = forwardRef(({ data, index, isActive, onHover }, ref) => (
  <div
    ref={ref}
    className={`timeline-item ${isActive ? 'active' : ''}`}
    onMouseEnter={() => onHover(index)}
    role="group"
    aria-label={data.title}
  >
    <img
      className="timeline-item-image"
      src={data.imageUrl}
      alt={data.title}
      draggable="false"
    />
    <div className="timeline-item-content">
      <h2 className="timeline-item-title">{data.title}</h2>
      <p className="timeline-item-desc">{data.description}</p>
    </div>
  </div>
));

export default TimelineItem;

