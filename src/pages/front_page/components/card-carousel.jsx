import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Inlined CSS styles from your original style.css, with MUI button styles added
const carouselStyles = `
  .carousel {
    position: relative;
    perspective: 500px;
    transform-style: preserve-3d;
  }

  .card-container {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: 
      rotateY(calc(var(--offset) * 50deg))
      scaleY(calc(1 + var(--abs-offset) * -0.3))
      translateZ(calc(var(--abs-offset) * -165px))
      translateX(calc(var(--direction) * -14px));
    transition: all 0.3s ease-out;
  }

  .card {
    background-color: hsl(0deg, 0%, calc(100% - 0.5 * var(--abs-offset) * 7.5%));
    border-radius: 1rem;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
    transition: all 0.3s ease-out;
    padding: 42px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box; /* Ensures padding is included in height calculation */
  }

  .nav {
    color: white;
    font-size: 5rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    border: none;
    
    /* Replicating MUI Button variant="light-circular" styles */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 1px 1px 4px 4px rgba(0,0,0,0.05);
    padding: 0;
  }

  .nav:hover {
    background-color: #f3f2f7;
  }

  .nav.left {
    transform: translateX(-100%) translateY(-50%);
  }

  .nav.right {
    right: 0;
    transform: translateX(100%) translateY(-50%);
  }

  .nav svg {
    margin: auto;
    width: 12px;
    height: 12px;
    fill: #A4A4A4;
  }
`;

// Inlined SVG components to avoid external file dependencies
const LeftArrow = () => (
  <svg viewBox="0 0 320 512">
    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
  </svg>
);

const RightArrow = () => (
  <svg viewBox="0 0 320 512">
    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8-12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
  </svg>
);

/**
 * Self-contained Card component for the Carousel.
 * Replaces MUI Box with standard divs and inline styles.
 */
export const Card = ({ iconImg, name, from, content, heading }) => (
  <div className="card">
    <div>
      <div style={{ fontSize: "16px", fontWeight: 500, color: "#3b3b3b", marginBottom: "12px" }}>
        <span style={{ fontWeight: 600 }}>"</span>
        {heading}
        <span style={{ fontWeight: 600 }}>"</span>
      </div>
      <div style={{ fontSize: "12px", color: "#3b3b3baa" }}>
        {content}
      </div>
    </div>
    <div style={{ height: "64px", display: "flex", gap: "12px", alignItems: "center" }}>
      <div style={{
        height: "100%",
        aspectRatio: "1",
        backgroundImage: `url(${iconImg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "50%"
      }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ fontSize: "14px", fontWeight: 500 }}>
          {name}
        </div>
        <div style={{ fontSize: "11px", fontWeight: 400, fontStyle: "italic", color: "#3b3b3baa", marginTop: "1px" }}>
          {from}
        </div>
      </div>
    </div>
  </div>
);

const MAX_VISIBILITY = 2;

/**
 * Self-contained Carousel component.
 * Replaces MUI components with standard elements and uses an injected style tag.
 * @param {React.ReactNode} children - The Card components to display.
 * @param {object} style - Standard React inline styles to apply to the main carousel container (replaces `sx`).
 */
const Carousel = ({ children, style }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <>
      <style>{carouselStyles}</style>
      <div className="carousel" style={style}>
        {active > 0 && (
          <motion.button
            className="nav left"
            onClick={() => setActive((i) => i - 1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LeftArrow />
          </motion.button>
        )}
        {React.Children.map(children, (child, i) => (
          <div
            className="card-container"
            style={{
              '--active': i === active ? 1 : 0,
              '--offset': (active - i) / 3,
              '--direction': Math.sign(active - i),
              '--abs-offset': Math.abs(active - i) / 3,
              pointerEvents: active === i ? 'auto' : 'none',
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
              display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
            }}
          >
            {child}
          </div>
        ))}
        <AnimatePresence>
          {active < count - 1 && (
            <motion.button
              className="nav right"
              onClick={() => setActive((i) => i + 1)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RightArrow />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Carousel;
