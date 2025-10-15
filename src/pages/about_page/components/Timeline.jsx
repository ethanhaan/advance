// src/pages/about_page/components/Timeline.jsx
import React from 'react';

const timeline = [
  {
    time: '2023',
    title: 'Foundation & First Workshop',
    body: 'Advance Careers was founded with the mission to bridge the gap between high school education and real-world career knowledge. We held our first-ever workshop at Sydney Technical High School.',
  },
  {
    time: '2024',
    title: 'Expansion Across Sydney',
    body: 'We expanded our reach, partnering with 10 schools across the Sydney metropolitan area and impacting over 500 students with our tailored career programs.',
  },
  {
    time: 'Present',
    title: 'Growing Our Impact',
    body: 'Today, we continue to grow our team of passionate university students and expand our offerings, committed to empowering the next generation of Australian leaders.',
  },
];

export default function Timeline() {
  const sectionStyle = {
    backgroundColor: '#ffffff',
    fontFamily: '"Montserrat", sans-serif',
    padding: '80px 24px',
    borderTop: '1px solid #e2e8f0',
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const eyebrowStyle = {
    fontFamily: "Poly",
    color: "#1B56BA",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 16px 0",
  };

  const headingStyle = {
    fontFamily: "Poly",
    fontSize: "40px",
    fontWeight: 400,
    color: "rgb(43, 43, 43)",
    margin: "0 0 24px 0",
    lineHeight: 1.2,
    marginTop: '12px',
  };

  const timelineContainerStyle = {
    marginTop: '48px',
    position: 'relative',
    maxWidth: '720px', // Constrain width for readability
    margin: '48px auto 0', // Center the timeline itself
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    textAlign: 'left', // Align text to the left for readability
  };

  const listItemStyle = {
    position: 'relative',
    paddingLeft: '32px', // Space for the dot and line
  };

  const dotStyle = {
    position: 'absolute',
    left: '0',
    top: '2px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: '#1B56BA', // Use accent color for the dot
    opacity: '60%',
    border: '2px solid #ffffff',
    zIndex: 1,
  };

  const timeStyle = {
    fontSize: '0.875rem',
    color: '#64748B', // Muted grey for the date
    fontWeight: 500,
    margin: 0,
  };

  const titleStyle = {
    fontFamily: "Poly",
    fontSize: '1.4rem',
    fontWeight: 700, // Bolder title
    color: '#1a202c',
    margin: '4px 0',
  };

  const bodyStyle = {
    fontSize: '1rem',
    color: '#4a5568',
    lineHeight: 1.6,
    margin: 0,
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>Our Journey</p>
        <h2 style={headingStyle}>Milestones</h2>
        <div style={timelineContainerStyle}>
          <ol style={listStyle}>
            {timeline.map((t, i) => (
              <li key={i} style={listItemStyle}>
                <span style={dotStyle} aria-hidden="true" />
                <p style={timeStyle}>{t.time}</p>
                <p style={titleStyle}>{t.title}</p>
                <p style={bodyStyle}>{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
