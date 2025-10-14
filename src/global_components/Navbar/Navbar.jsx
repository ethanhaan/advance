import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import advanceLogo from '../../assets/advance.svg';

function LinkItem({ to, text, currentPath }) {
  const isActive = currentPath === to;
  const blue = '#1B56BA';

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      style={{
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.5rem 0',
        display: 'inline',
        fontWeight: 700, // always 700
        backgroundImage: `linear-gradient(${blue}, ${blue})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 100%',
        backgroundSize: isActive ? '100% 2px' : '0% 2px', // permanent underline on active page
        transition: 'background-size 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundSize = '100% 2px';
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.backgroundSize = '0% 2px';
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundSize = '100% 2px';
      }}
      onBlur={(e) => {
        if (!isActive) e.currentTarget.style.backgroundSize = '0% 2px';
      }}
    >
      {text}
    </Link>
  );
}

export default function Navbar({ isNavbarFixed = false, isOpaque = true }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header
      aria-label="Site navigation"
      style={{
        position: isNavbarFixed ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 5,
        padding: '1rem 2rem',
        boxSizing: 'border-box',
        color: '#ffffff',
        fontFamily:
          'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
        background: `rgba(11, 15, 20, ${isOpaque ? 0.8 : 0})`,
        borderBottom: isOpaque
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0)',
        backdropFilter: isOpaque ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: isOpaque ? 'blur(8px)' : 'none',
        transition:
          'background 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease',
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <Link
          to="/"
          aria-label="Go to Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.125rem',
          }}
        >
          <img
            src={advanceLogo}
            alt="Advance Careers Logo"
            style={{ height: '2rem', width: 'auto', display: 'block' }}
          />
          <span>Advance Careers</span>
        </Link>

        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            margin: 0,
            padding: 0,
            gap: '4rem',
          }}
        >
          <li style={{ margin: 0, padding: 0 }}>
            <LinkItem to="/" text="Home" currentPath={currentPath} />
          </li>
          <li style={{ margin: 0, padding: 0 }}>
            <LinkItem to="/about" text="About" currentPath={currentPath} />
          </li>
          <li style={{ margin: 0, padding: 0 }}>
            <LinkItem to="/programs" text="Our Programs" currentPath={currentPath} />
          </li>
        </ul>

        <button
          type="button"
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #ffffff',
            borderRadius: 0,
            padding: '0.4rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            fontFamily:
              'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
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

