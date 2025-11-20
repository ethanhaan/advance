// ./src/pages/workshops_page/components/workshop_content.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  blue: "#1B56BA",
  textMain: "rgb(43, 43, 43)",
  textMuted: "rgb(84, 84, 84)",
  border: "#e5e7eb",
  chip: "#eef2ff",
};

// --- Animation Variants ---

// The wrapper that controls the exit/enter slide direction
const wrapperVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1], // Professional "Quart" ease
      when: "beforeChildren", // Animate wrapper before staggering children
      staggerChildren: 0.1,
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};

// Individual items (Title, Text, Button) fade up
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// The blue bar grows vertically
const barVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

// The Grid on the right needs its own stagger context
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2, // Wait for left column to start
    },
  },
};

// Feature cards: each one animates in with its own slight personality
const cardItemVariants = {
  hidden: (index) => ({
    opacity: 0,
    y: 24,
    scale: 0.96,
    rotate: index % 2 === 0 ? 1.5 : -1.5, // tiny alternating tilt
  }),
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 20,
    },
  }),
};

export default function WorkshopContent({
  eyebrow = "Our Workshops",
  title = "Workshop Overview",
  lead = "Description goes here...",
  features = [],
  workshopIndex = 0,
  direction = 0,
}) {
  const sectionStyle = {
    backgroundColor: "#ffffff",
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: "clamp(140px, 15vw, 240px)", // Increased top padding to account for overlay
    paddingBottom: "100px",
    fontFamily: "Montserrat, system-ui, sans-serif",
    overflow: "hidden", // Prevent scrollbars during slide
  };

  const containerStyle = {
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "0 clamp(24px, 5vw, 40px)",
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "clamp(24px, 5vw, 60px)",
    alignItems: "center",
  };

  const leftCol = { position: "relative", paddingLeft: 0, maxWidth: 720 };

  const eyebrowStyle = {
    fontFamily: "Poly, serif",
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 12px 0",
    display: "block",
  };

  const h2Style = {
    fontFamily: "Poly, serif",
    fontWeight: 400,
    fontSize: "clamp(32px, 4vw, 48px)",
    color: COLORS.textMain,
    lineHeight: 1.1,
    margin: "0 0 20px 0",
  };

  const blueBar = {
    position: "absolute",
    left: "-24px",
    top: 130,
    bottom: 80,
    width: 6,
    background: COLORS.blue,
    borderRadius: 4,
  };

  const leadP = {
    margin: 0,
    color: COLORS.textMuted,
    fontSize: "1.05rem",
    lineHeight: 1.7,
  };

  const ctaBtn = {
    background: COLORS.blue,
    color: "#fff",
    border: `1px solid ${COLORS.blue}`,
    borderRadius: "50px", // Pill shape
    padding: "14px 32px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: 40,
    fontFamily: "Montserrat, sans-serif",
  };

  const cardGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  };

  const cardBase = {
    position: "relative",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "20px",
    background: "#fafafa",
    overflow: "hidden",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  return (
    <section
      style={sectionStyle}
      id="workshop-overview"
      aria-label="Workshop overview"
    >
      {/* AnimatePresence handles the unmounting of old content and mounting of new */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={workshopIndex}
          custom={direction}
          variants={wrapperVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ width: "100%" }}
        >
          <div style={containerStyle}>
            <div style={rowStyle} className="content-row">
              {/* --- LEFT COLUMN: Text --- */}
              <div style={leftCol}>
                <motion.span variants={itemVariants} style={eyebrowStyle}>
                  {eyebrow}
                </motion.span>

                {/* 
                    WRAPPER: Holds the Bar and Title together.
                    Relative positioning allows the bar (absolute) 
                    to stick to the height of this div.
                */}
                <div style={{ position: "relative", marginBottom: "20px" }}>
                  <motion.div
                    variants={barVariants}
                    style={{
                      position: "absolute",
                      left: "-24px", // Offset to left
                      top: 0,
                      bottom: 0,     // Stretches to match height of H2
                      width: 6,
                      background: COLORS.blue,
                      borderRadius: 4,
                    }}
                  />
                  <motion.h2 variants={itemVariants} style={h2Style}>
                    {title}
                  </motion.h2>
                </div>

                <motion.p variants={itemVariants} style={leadP}>
                  {lead}
                </motion.p>

                <motion.button
                  style={ctaBtn}
                  variants={itemVariants}
                  whileHover={{
                    y: -3,
                    backgroundColor: "#fff",
                    color: COLORS.blue,
                    boxShadow: "0 12px 24px rgba(27, 86, 186, 0.15)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-contact", {
                        detail: { source: "workshop-content" },
                      })
                    )
                  }
                >
                  Book a Workshop
                </motion.button>
              </div>

              {/* --- RIGHT COLUMN: Features Grid --- */}
              <motion.div
                style={cardGrid}
                className="feature-cards"
                variants={gridContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {features.map((f, i) => (
                  <motion.article
                    key={i}
                    custom={i}
                    style={cardBase}
                    variants={cardItemVariants}
                    whileHover={{
                      y: -5,
                      borderColor: "rgba(27,86,186,0.3)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: COLORS.chip,
                          color: COLORS.blue,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <h3
                        style={{
                          fontFamily: "Poly",
                          fontSize: 18,
                          margin: 0,
                          color: COLORS.textMain,
                        }}
                      >
                        {f.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: COLORS.textMuted,
                      }}
                    >
                      {f.body}
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .content-row { 
            grid-template-columns: 1fr !important; 
            gap: 40px !important; 
          }
          .feature-cards { 
            grid-template-columns: 1fr !important; 
          }
        }
      `}</style>
    </section>
  );
}

