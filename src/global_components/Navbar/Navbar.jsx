import React from 'react';
import { Link } from 'react-router-dom';
import advanceLogo from '../../assets/advance.svg';

export default function Navbar({ isNavbarFixed = false, isOpaque = true }) {
  // Header (outer) styles
  const headerStyle = {
    // layout & positioning
    position: isNavbarFixed ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 5,
    padding: '1rem 2rem',
    boxSizing: 'border-box',

    // text
    color: '#ffffff',
    fontFamily: 'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',

    // background states (only the background changes transparency)
    background: `rgba(11, 15, 20, ${isOpaque ? 0.8 : 0})`,
    borderBottom: isOpaque ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)',
    backdropFilter: isOpaque ? 'blur(8px)' : 'none',
    WebkitBackdropFilter: isOpaque ? 'blur(8px)' : 'none',

    // smooth transitions between states
    transition: 'background 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const logoLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '1.125rem',
  };

  const logoImgStyle = {
    height: '2rem',
    width: 'auto',
    display: 'block',
  };

  const linksListStyle = {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    gap: '4rem',
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '0.5rem 0',
  };

  const contactBtnStyle = {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '1px solid #ffffff',
    borderRadius: '6px',
    padding: '0.4rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    fontFamily: 'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  return (
    <header style={headerStyle} aria-label="Site navigation">
      <nav style={navStyle}>
        <Link to="/" style={logoLinkStyle} aria-label="Go to Home">
          <img src={advanceLogo} alt="Advance Careers Logo" style={logoImgStyle} />
          <span>Advance Careers</span>
        </Link>

        <ul style={linksListStyle}>
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/about" style={linkStyle}>About</Link></li>
          <li><Link to="/programs" style={linkStyle}>Our Programs</Link></li>
        </ul>

        <button
          type="button"
          style={contactBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#000000';
          }}
        >
          Contact Us
        </button>
      </nav>
    </header>
  );
}

