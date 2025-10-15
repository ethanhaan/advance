// src/pages/about_page/components/Values.jsx
import React, { useState, useEffect } from 'react';

const values = [
  {
    title: 'Empowerment',
    body: 'We empower students with the knowledge and skills to take control of their financial futures and make informed career decisions.',
  },
  {
    title: 'Accessibility',
    body: 'Our programs are designed to be accessible to all young Australians, regardless of their background or location.',
  },
  {
    title: 'Integrity',
    body: 'We operate with the highest level of integrity, ensuring our content is unbiased, accurate, and trustworthy.',
  },
  {
    title: 'Innovation',
    body: 'We continuously innovate our teaching methods and curriculum to stay relevant and engaging for the next generation.',
  },
];

export default function Values() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGridColumns = () => {
    if (windowWidth >= 1024) {
      return 'repeat(4, 1fr)'; // lg:grid-cols-4
    }
    if (windowWidth >= 640) {
      return 'repeat(2, 1fr)'; // sm:grid-cols-2
    }
    return '1fr'; // Default to one column
  };

  const sectionStyle = {
    backgroundColor: '#ffffff',
    fontFamily: '"Montserrat", sans-serif',
    borderTop: '1px solid #e2e8f0', // Light gray border
    paddingBottom: '50px',
  };

  const containerStyle = {
    maxWidth: '1152px', // max-w-6xl
    margin: '0 auto',
    padding: '64px 24px', // py-16 px-6
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
  };

  const gridContainerStyle = {
    display: 'grid',
    gap: '24px',
    marginTop: '32px',
    gridTemplateColumns: getGridColumns(),
  };

  const cardStyle = {
    backgroundColor: '#f7fafc', // A very light gray background
    border: '1px solid #e2e8f0',
    borderRadius: '16px', // rounded-2xl
    padding: '20px', // p-5
  };

  const cardTitleStyle = {
    fontSize: '1.125rem', // text-lg
    fontWeight: 500, // font-medium
    color: '#1a202c',
  };

  const cardBodyStyle = {
    marginTop: '8px',
    fontSize: '0.875rem', // text-sm
    color: '#4a5568', // A medium gray for body text
    lineHeight: 1.6,
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>Our Values</p>
        <h2 style={headingStyle}>What we stand for</h2>
        <div style={gridContainerStyle}>
          {values.map((v) => (
            <div key={v.title} style={cardStyle}>
              <p style={cardTitleStyle}>{v.title}</p>
              <p style={cardBodyStyle}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
