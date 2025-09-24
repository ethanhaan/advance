import React from 'react';
import TimelineItem from './TimelineItem';
import './Timeline.css';

const timelineData = [
  {
    date: '2022-01-15',
    title: 'Project Kick-off',
    // Working URL from Unsplash
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    description: 'The official start of our exciting new project. All hands on deck!'
  },
  {
    date: '2022-03-22',
    title: 'First Milestone',
    // Working URL from Unsplash
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Successfully reached our first major goal. A big win for the team!'
  },
  {
    date: '2022-06-10',
    title: 'User Testing',
    // Working URL from Unsplash
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Gathering valuable feedback from our beta testers.'
  },
  {
    date: '2022-09-30',
    title: 'Product Launch',
    // Working URL from Unsplash
    imageUrl: 'https://images.unsplash.com/photo-1579389083395-4507e9d162c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Our product is now live and available to the public!'
  }
];

export default function timeline() {
  return (
    <div className="timeline-container">
      {timelineData.map((data, idx) => (
        <TimelineItem data={data} key={idx} />
      ))}
    </div>
  );
};
