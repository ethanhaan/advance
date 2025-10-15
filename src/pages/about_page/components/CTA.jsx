// src/pages/about_page/components/CTA.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Using Link for internal navigation

export default function CTA() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const sectionStyle = {
    backgroundColor: '#060A1B', // Dark background as requested
    fontFamily: '"Montserrat", sans-serif',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
  };

  const containerStyle = {
    maxWidth: '1152px', // max-w-6xl
    margin: '0 auto',
    padding: 'clamp(64px, 10vw, 80px) clamp(24px, 5vw, 40px)', // Responsive padding
    textAlign: 'center',
  };

  const eyebrowStyle = {
    fontFamily: "Poly",
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#94A3B8', // text-slate-400
  };

  const headingStyle = {
    fontFamily: "Poly",
    marginTop: '12px',
    fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', // Responsive font size
    fontWeight: 600,
  };

  const bodyStyle = {
    marginTop: '16px',
    color: '#CBD5E1', // text-slate-300
    maxWidth: '672px', // max-w-2xl
    margin: '16px auto 0',
    lineHeight: 1.6,
  };

  const buttonContainerStyle = {
    marginTop: '32px',
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap', // Allow buttons to wrap on smaller screens
  };

  const baseButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '9999px',
    padding: '12px 24px',
    textDecoration: 'none',
    color: '#FFFFFF',
    fontWeight: 500,
    transition: 'background-color 150ms ease-in-out',
  };

  const primaryButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: isHovered1 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
  };

  const secondaryButtonStyle = {
    ...baseButtonStyle,
    border: '1px solid rgba(255, 255, 255, 0.15)',
    backgroundColor: isHovered2 ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>Get involved</p>
        <h2 style={headingStyle}>Bring Advance Careers to your school</h2>
        <p style={bodyStyle}>
          Book a workshop, invite us to speak, or partner with us to reach more students.
        </p>
        <div style={buttonContainerStyle}>
          <Link
            to="/book"
            style={primaryButtonStyle}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            Book a Workshop <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/contact"
            style={secondaryButtonStyle}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
