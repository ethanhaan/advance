import React from 'react';

const TimelineItem = ({ data, index, isActive, onHover }) => {
  return (
    <div 
      className={`timeline-item ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onHover(index)}
    >
      <img className="timeline-item-image" src={data.imageUrl} alt={data.title} />
      <div className="timeline-item-content">
        <h2 className="timeline-item-title">{data.title}</h2>
        <p className="timeline-item-desc">{data.description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;