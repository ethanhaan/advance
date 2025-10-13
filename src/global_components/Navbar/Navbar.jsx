import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import advanceLogo from '../../assets/advance.svg';

export default function Navbar({ isFixed }) {
  // Conditionally add the 'fixed-nav' class based on the isFixed prop
  const navbarClasses = `navbar-header ${isFixed ? 'fixed-nav' : ''}`;

  return (
    <header className={navbarClasses}>
      <nav className="navbar">
        {/* Use Link instead of a for the logo */}
        <Link to="/" className="navbar-logo">
          <img src={advanceLogo} alt="Advance Careers Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">Advance Careers</span>
        </Link>
        <ul className="navbar-links">
          {/* Use Link instead of a for navigation */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/programs">Our Programs</Link></li>
        </ul>
        <button className="navbar-contact-btn">Contact Us</button>
      </nav>
    </header>
  );
}
