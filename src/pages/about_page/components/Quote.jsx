// src/pages/about_page/components/Quote.jsx
import React from 'react';
/* in index.css or your HTML <head> */


export default function Quote() {
  const sectionStyle = {
    backgroundColor: 'white',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
  };

  const quoteStyle = {
    // fontFamily: '"Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamily: '"Lora", Georgia, "Times New Roman", serif',
    color: '#4b5563', // subtle, professional grey
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    textAlign: 'center',
    maxWidth: '800px',
    lineHeight: 1.5,
    fontStyle: 'italic',
  };

  return (
    <section style={sectionStyle}>
      <blockquote style={quoteStyle}>
        "Economics is not just a subject - it’s a tool for agency."
      </blockquote>
    </section>
  );
}
