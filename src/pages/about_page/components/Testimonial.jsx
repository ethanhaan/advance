// src/pages/about_page/components/Testimonial.jsx
import React, { useState, useEffect } from 'react';

// Google Drive video embed URLs
const LEFT_VIDEO_URL = 'https://drive.google.com/file/d/14E7JHSsNL3V7fdxfOsWR0USXSl8BR_o6/preview';
const RIGHT_VIDEO_URL = 'https://drive.google.com/file/d/12DZrHXn9ujmzQG7H3VbUHyLJAOFzRzwj/preview';

// SVG Play Icon Component
const PlayIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="39" stroke="white" strokeWidth="2" />
    <path d="M53 40L33.5 51.2583L33.5 28.7417L53 40Z" fill="white" />
  </svg>
);

// SVG Close Icon Component
const CloseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="6" x2="22" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="6" x2="6" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Video Modal Component
function VideoModal({ isOpen, onClose, videoUrl }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          zIndex: 10000,
        }}
        onClick={onClose}
        aria-label="Close video"
      >
        <CloseIcon />
      </button>

      <div
        style={{
          width: '90%',
          maxWidth: '900px',
          aspectRatio: '16 / 9',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={videoUrl}
          title="Testimonial video"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

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
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

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
            “I would highly recommend you all get Advance Careers into your schools, the impact they make is everlasting. They are engaging and they will work to fit things in for your students!”
          </p>
          <button
            onClick={() => setActiveVideoUrl(LEFT_VIDEO_URL)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
            aria-label="Play testimonial video"
          >
            <PlayIcon />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={!!activeVideoUrl} onClose={() => setActiveVideoUrl(null)} videoUrl={activeVideoUrl} />

      {/* Right Panel: Testimonial Quote */}
      <div style={quotePanelStyle}>
        <div style={quoteContentStyle}>
          <p style={mainQuoteStyle}>
            "The workshops were fabulous today, I was very excited to see 12 fantastic university students coming to give their time to our kids, and they related really well because their age difference is not so much. I hope we can do this a lot."
          </p>
          <p style={authorStyle}>
            — Michelle I. Careers Adviser from Parramatta High School
          </p>
          <button
            onClick={() => setActiveVideoUrl(RIGHT_VIDEO_URL)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
            aria-label="Play testimonial video"
          >
            <div style={iconWrapperStyle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="#374151" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
