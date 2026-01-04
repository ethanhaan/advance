// src/global_components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import advanceLogo from '../../assets/advance.png';
import './Navbar.css';

function LinkItem({ to, text, currentPath, isMobile = false, onClick }) {
  const isActive = currentPath === to;
  const blue = '#1B56BA';

  // Mobile Styling
  if (isMobile) {
    return (
      <Link
        to={to}
        onClick={onClick}
        style={{
          color: '#ffffff',
          textDecoration: 'none',
          fontSize: '1.75rem',
          fontFamily: 'Poly, serif',
          fontWeight: 400,
          display: 'block',
          marginBottom: '2rem',
          textAlign: 'center',
          opacity: isActive ? 1 : 0.7,
        }}
      >
        {text}
      </Link>
    );
  }

  // Desktop Styling
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
        fontWeight: 700,
        backgroundImage: `linear-gradient(${blue}, ${blue})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 100%',
        backgroundSize: isActive ? '100% 2px' : '0% 2px',
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
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <>
      <header
        aria-label="Site navigation"
        style={{
          position: isNavbarFixed ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '1rem 2rem',
          boxSizing: 'border-box',
          color: '#ffffff',
          fontFamily:
            'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
          background: isOpaque || isOpen ? '#060A1B' : 'rgba(6, 10, 27, 0)', // Force opaque if open
          borderBottom:
            isOpaque && !isOpen
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0)',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          transition: 'background 200ms ease, border-color 200ms ease',
        }}
      >
        <nav
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto', // left | center | right
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {/* LEFT: Logo */}
          <Link
            to="/"
            aria-label="Go to Home"
            onClick={closeMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1.125rem',
              position: 'relative',
              zIndex: 1002, // Ensure logo is clickable over mobile overlay
              justifySelf: 'start',
            }}
          >
            <img
              src={advanceLogo}
              alt="Advance Careers Logo"
              style={{ height: '2rem', width: 'auto', display: 'block' }}
            />
            <span>Advance Careers</span>
          </Link>

          {/* CENTER: Desktop Links (hidden on mobile via CSS) */}
          <div className="navbar-center">
            <ul className="nav-desktop-links">
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
          </div>

          {/* RIGHT: Desktop CTA + Mobile Toggle */}
          <div className="navbar-right" style={{ justifySelf: 'end' }}>
            <button
              type="button"
              className="nav-desktop-cta"
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
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-contact', { detail: { source: 'navbar' } }));
              }}
            >
              Contact Us
            </button>

            <button
              className="navbar-mobile-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span
                className="hamburger-line"
                style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}
              />
              <span className="hamburger-line" style={{ opacity: isOpen ? 0 : 1 }} />
              <span
                className="hamburger-line"
                style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#060A1B',
              zIndex: 1001,
              paddingTop: '100px', // Clear header height
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <motion.ul
              variants={containerVariants}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <motion.li variants={itemVariants} style={{ width: '100%' }}>
                <LinkItem
                  to="/"
                  text="Home"
                  currentPath={currentPath}
                  isMobile={true}
                  onClick={closeMenu}
                />
              </motion.li>

              <motion.li variants={itemVariants} style={{ width: '100%' }}>
                <LinkItem
                  to="/about"
                  text="About"
                  currentPath={currentPath}
                  isMobile={true}
                  onClick={closeMenu}
                />
              </motion.li>

              <motion.li variants={itemVariants} style={{ width: '100%' }}>
                <LinkItem
                  to="/programs"
                  text="Our Programs"
                  currentPath={currentPath}
                  isMobile={true}
                  onClick={closeMenu}
                />
              </motion.li>

              <motion.li variants={itemVariants} style={{ marginTop: '2rem' }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#1B56BA',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '1rem 3rem',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                  onClick={() => {
                    closeMenu();
                    window.dispatchEvent(
                      new CustomEvent('open-contact', { detail: { source: 'navbar-mobile' } })
                    );
                  }}
                >
                  Contact Us
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Time complexity: N/A (UI rendering)

