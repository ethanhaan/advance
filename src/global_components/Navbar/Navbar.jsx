import React from 'react';
import './Navbar.css';
import advanceLogo from '../../assets/advance.svg';

export default function Navbar({ isFixed }) {
  // Conditionally add the 'fixed-nav' class based on the isFixed prop
  const navbarClasses = `navbar-header ${isFixed ? 'fixed-nav' : ''}`;

  return (
    <header className={navbarClasses}>
      <nav className="navbar">
        <a href="/" className="navbar-logo">
          <img src={advanceLogo} alt="Advance Careers Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">Advance Careers</span>
        </a>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/programs">Our Programs</a></li>
        </ul>
        <button className="navbar-contact-btn">Contact Us</button>
      </nav>
    </header>
  );
}
