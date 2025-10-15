// src/pages/about_page/components/Testimonial.jsx
import React, { useState, useEffect } from 'react';

// SVG Play Icon Component
const PlayIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="39" stroke="white" strokeWidth="2" />
    <path d="M53 40L33.5 51.2583L33.5 28.7417L53 40Z" fill="white" />
  </svg>
);

// SVG Quote Icon Component - Updated as per user request
const QuoteIcon = ({ size = 28, color = '#374151', ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"/>
        <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"/>
    </svg>

);


export default function Testimonial() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Main Styles ---
  const sectionStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    width: '100%',
    minHeight: '300px',
    backgroundColor: '#F3F4F6', // Light beige for the right panel background
    fontFamily: '"Montserrat", sans-serif',
  };

  // --- Left Panel (Image) Styles ---
  const imagePanelStyle = {
    width: isMobile ? '100%' : '50%',
    height: isMobile ? '300px' : 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '2rem',
    boxSizing: 'border-box',
    textAlign: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  };

  const imageContentStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  };
  
  const imageQuoteStyle = {
    fontFamily: '"Poly", serif',
    fontSize: '1.5rem',
    fontStyle: 'italic',
    maxWidth: '500px',
  };

  // --- Right Panel (Quote) Styles ---
  const quotePanelStyle = {
    width: isMobile ? '100%' : '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
  };

  const quoteContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '450px',
    gap: '1.5rem',
  };

  const mainQuoteStyle = {
    fontFamily: '"Poly", serif',
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    fontStyle: 'italic',
    lineHeight: 1.5,
    color: '#374151', // Dark Gray
    margin: 0,
  };

  const authorStyle = {
    fontFamily: "Poly",
    fontWeight: 600,
    color: '#1B56BA', // Site's accent blue
    fontSize: '0.875rem',
    margin: 0,
  };

  const iconWrapperStyle = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: '1px solid #E5E7EB', // Light grey border
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <section style={sectionStyle}>
      {/* Left Panel: Image/Video Mock */}
      <div style={imagePanelStyle}>
        <div style={overlayStyle}></div>
        <div style={imageContentStyle}>
          <p style={imageQuoteStyle}>
            "Advance Careers showed me the pathways I never knew existed."
          </p>
          <PlayIcon />
        </div>
      </div>

      {/* Right Panel: Testimonial Quote */}
      <div style={quotePanelStyle}>
        <div style={quoteContentStyle}>
          <p style={mainQuoteStyle}>
            "We envision a future where economics is no longer a subject reserved for the privileged or the elite."
          </p>
          <p style={authorStyle}>
            — CHAE J. YEAR 12 STUDENT
          </p>
          <div style={iconWrapperStyle}>
            <QuoteIcon color="#374151" />
          </div>
        </div>
      </div>
    </section>
  );
}
