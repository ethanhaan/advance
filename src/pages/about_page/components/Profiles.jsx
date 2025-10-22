import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Components & Data ---

// LinkedIn Icon SVG
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: '1rem', height: '1rem' }}
  >
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.1 1.16 3.1 3.99z"></path>
  </svg>
);

import mattImg from '../assets/headshots/matt.jpg';
import ethanImg from '../assets/headshots/ethan.jpeg';
import maggieImg from '../assets/headshots/maggie.jpeg';
import harrisonImg from '../assets/headshots/harry.jpg';
import akifImg from '../assets/headshots/akif.jpg';
import callumImg from '../assets/headshots/callum.jpeg';
import carolImg from '../assets/headshots/carol.jpeg';
import hazelImg from '../assets/headshots/hazel.jpg';
import jamieImg from '../assets/headshots/jamie.jpeg';
import jessicaImg from '../assets/headshots/jessica.png';
import jonathanImg from '../assets/headshots/jono.png';
import jordonImg from '../assets/headshots/jordon.jpeg';
import joselynImg from '../assets/headshots/joselyn.png';
import michaelgImg from '../assets/headshots/michaelg.jpg';
import mikhailImg from '../assets/headshots/mikhail.jpg';
import reenaImg from '../assets/headshots/reena.jpeg';
import pamelaImg from '../assets/headshots/pamela.jpeg';
import victorImg from '../assets/headshots/victor.jpeg';
import winstonImg from '../assets/headshots/winston.jpeg';

const teamData = {
  Directors: [
    { name: 'Matt Ng', role: 'Director', img: mattImg, linkedin: '#' },
    { name: 'Jonathan Yi', role: 'Director', img: jonathanImg, linkedin: '#' },
    { name: 'Maggie Du', role: 'Director', img: maggieImg, linkedin: '#' },
    { name: 'Ethan Han', role: 'Director', img: ethanImg, linkedin: '#' },
  ],
  Executives: [
    { name: 'Joselyn Singh', role: 'Marketing Manager', img: joselynImg, linkedin: '#' },
    { name: 'Michael Girgis', role: 'Outreach Manager', img: michaelgImg, linkedin: '#' },
    { name: 'Reena Chen', role: 'Workshops Manager', img: reenaImg, linkedin: '#' },
    { name: 'Winston Li', role: 'Curriculum Lead', img: winstonImg, linkedin: '#' },
  ],
  General: [
    { name: 'Akif Kazi', role: 'Training Lead', img: akifImg, linkedin: '#' },
    { name: 'Jamie C.', role: 'Communications Consultant', img: jamieImg, linkedin: '#' },
    { name: 'Callum Li', role: 'General Volunteer', img: callumImg, linkedin: '#' },
    { name: 'Carol Newman', role: 'Facilitator', img: carolImg, linkedin: '#' },
    { name: 'Hazel Li', role: 'Marketing', img: hazelImg, linkedin: '#' },
    { name: 'Jessica Yoon', role: 'General Volunteer', img: jessicaImg, linkedin: '#' },
    { name: 'Jordon Zhong', role: 'General Volunteer', img: jordonImg, linkedin: '#' },
    { name: 'Harrison Andrews', role: 'Marketing', img: harrisonImg, linkedin: '#' },
    { name: 'Victor Zhang', role: 'General Volunteer', img: victorImg, linkedin: '#' },
    { name: 'Mikhail Savkin', role: 'General Volunteer', img: mikhailImg, linkedin: '#' },
    { name: 'Pamela Pang', role: 'General Volunteer', img: pamelaImg, linkedin: '#' },
  ],
};


export default function Profiles() {
  const [selectedCategory, setSelectedCategory] = useState('Directors');
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const scrollContainerRef = useRef(null);
  const categories = Object.keys(teamData);

  const scrollBy = (distance) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section style={{
      width: '100%',
      padding: '6rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#FFFFFF',
      color: '#0B0F14',
      boxSizing: "border-box",
    }}>
      {/* --- Titles --- */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          margin: 0,
          color: '#1B56BA',
          fontSize: '1rem',
          fontWeight: 700,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Our Team
      </motion.h3>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          margin: '0.5rem 0 1.5rem 0',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 600,
          fontFamily: "'Source Serif 4', serif",
        }}
      >
        Meet Our Team
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          margin: '0 auto 2.5rem auto',
          maxWidth: '700px',
          fontSize: '1.125rem',
          lineHeight: 1.6,
          color: '#555',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        We're a team of selfless, hardworking university students, once in your shoes as high school students, united by a fervent passion to empower change and inspire the leaders of tomorrow.
      </motion.p>

      {/* --- Category Selector --- */}
      <nav style={{ display: 'flex', gap: '2.5rem', marginBottom: '3rem' }}>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const blue = '#1B56BA';

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: isActive ? '#0B0F14' : '#888',
                background: 'none',
                border: 'none',
                borderRadius: 0,
                outline: 'none',
                padding: '0.5rem 0',
                cursor: 'pointer',
                backgroundImage: `linear-gradient(${blue}, ${blue})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 100%',
                backgroundSize: isActive ? '100% 2px' : '0% 2px',
                transition: 'color 0.2s ease, background-size 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundSize = '100% 2px';
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundSize = '0% 2px';
                }
              }}
            >
              {category}
            </button>
          );
        })}
      </nav>

      {/* --- Carousel --- */}
      <div
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Scroll Arrows */}
        {['left', 'right'].map((dir) => (
          <motion.button
            key={dir}
            onClick={() => scrollBy(dir === 'left' ? -350 : 350)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isCarouselHovered ? 1 : 0,
              scale: isCarouselHovered ? 1 : 0.8,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              [dir]: '0.5rem',
              zIndex: 10,
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              border: '1px solid #e0e0e0',
              background: '#ffffff',
              color: '#0B0F14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{transform: "scale(100%)", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b3b3b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'left' ? 'rotate(180deg)' : '' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        ))}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '2rem 0.5rem',
            width: '100%',
            scrollbarWidth: 'none', /* For Firefox */
          }}
        >
          <AnimatePresence mode="popLayout">
            {teamData[selectedCategory].map((member, i) => (
              <motion.div
                key={member.name}
                layout
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  flex: '0 0 300px',
                  scrollSnapAlign: 'start',
                }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1.1',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                  }}
                >
                  <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                  {/* Info Box */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '1rem',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{member.name}</h4>
                      <p style={{ margin: '0.125rem 0 0 0', fontSize: '0.875rem', color: '#555' }}>{member.role}</p>
                    </div>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: '50%',
                      background: '#fff',
                      color: '#0B0F14',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                     onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

