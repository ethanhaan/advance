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

const DEFAULT_LEAD =
  "Presented by high-achieving university students who have succeeded through the same process, this workshop delivers the study techniques and strategies that helped us thrive in university. We move beyond theory to provide practical, actionable advice that students can implement immediately to improve learning efficiency, retention, and academic performance in a small, interactive group setting.";

const DEFAULT_FEATURES = [
  {
    title: "Master Proven Techniques",
    body: "Learn and apply methods like Active Recall and Spaced Repetition for long-term memory retention.",
  },
  {
    title: "Boost Productivity",
    body: "Implement time-management systems like the Pomodoro Technique to reduce procrastination and increase focus.",
  },
  {
    title: "Reduce Exam Stress",
    body: "Use effective note-taking, spaced reviews, and exam frameworks to build confidence and lower anxiety.",
  },
  {
    title: "Personalised Action Plan",
    body: "Leave with a tailored study plan that fits individual learning styles, subjects, and weekly schedules.",
  },
];

const contentVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: 16,
    x: direction > 0 ? 10 : direction < 0 ? -10 : 0,
  }),
  center: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    opacity: 0,
    y: -6,
    x: direction > 0 ? -10 : direction < 0 ? 10 : 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function WorkshopContent({
  eyebrow = "Our Workshops",
  title = "Workshop Overview",
  lead = DEFAULT_LEAD,
  features = DEFAULT_FEATURES,
  workshopIndex = 0,
  direction = 0,
}) {
  const sectionStyle = {
    backgroundColor: "#ffffff",
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: "clamp(96px, 12vw, 200px)",
    paddingBottom: "100px",
    fontFamily:
      'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const containerStyle = {
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "0 clamp(24px, 5vw, 40px)",
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "clamp(18px, 4vw, 40px)",
    alignItems: "center",
  };

  const leftCol = { position: "relative", paddingLeft: 0, maxWidth: 720 };

  const eyebrowStyle = {
    fontFamily: "Poly, ui-serif, Georgia, Cambria, Times New Roman, serif",
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 6px 0",
  };

  const h2Style = {
    fontFamily: "Poly, ui-serif, Georgia, Cambria, Times New Roman, serif",
    fontWeight: 400,
    fontSize: "clamp(28px, 4vw, 40px)",
    color: COLORS.textMain,
    lineHeight: 1.2,
    margin: "0 0 40px 0",
  };

  const blueBar = {
    position: "absolute",
    left: "-20px",
    top: 120,
    bottom: 75,
    width: 8,
    background: COLORS.blue,
    borderRadius: 2,
  };

  const leadP = {
    margin: 0,
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 1.6,
  };

  const ctaBtn = {
    background: COLORS.blue,
    color: "#fff",
    border: `1px solid ${COLORS.blue}`,
    borderRadius: 6,
    padding: "10px 18px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 35,
  };

  const cardGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "14px",
  };

  const cardBase = {
    position: "relative",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "16px",
    background: "#fafafa",
    overflow: "hidden",
    cursor: "default",
  };

  const cardHead = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  };

  const iconWrapBase = {
    width: 28,
    height: 28,
    borderRadius: 999,
    background: COLORS.chip,
    color: COLORS.blue,
    display: "grid",
    placeItems: "center",
    flex: "0 0 28px",
  };

  const cardTitle = {
    fontFamily: "Poly, ui-serif, Georgia, Cambria, Times New Roman, serif",
    fontSize: 18,
    color: COLORS.textMain,
    margin: 0,
    fontWeight: 600,
    lineHeight: 1.2,
  };

  const cardBody = {
    margin: "6px 0 0",
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 1.6,
  };

  const cardVariants = {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      borderColor: COLORS.border,
      backgroundColor: "#fafafa",
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
    hover: {
      y: -6,
      scale: 1.02,
      boxShadow: "0 16px 32px rgba(0,0,0,0.16)",
      borderColor: "rgba(27,86,186,0.45)",
      backgroundColor: "#ffffff",
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const iconVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 220, damping: 18 },
    },
    hover: {
      scale: 1.07,
      rotate: 6,
      transition: { type: "spring", stiffness: 220, damping: 18 },
    },
  };

  const sheenVariants = {
    rest: { x: "-120%", opacity: 0 },
    hover: {
      x: "120%",
      opacity: 0.35,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <section
      style={sectionStyle}
      id="workshop-overview"
      aria-label="Workshop overview"
    >
      {/* Only inner content block animates; white section stays fixed */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={workshopIndex}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
        >
          <div style={containerStyle}>
            <div style={rowStyle}>
              {/* LEFT: eyebrow + title + paragraph + CTA */}
              <div style={leftCol}>
                <p style={eyebrowStyle}>{eyebrow}</p>
                <h2 style={h2Style}>{title}</h2>

                <div style={blueBar} aria-hidden="true" />
                <p style={leadP}>{lead}</p>

                <motion.button
                  style={ctaBtn}
                  whileHover={{
                    y: -2,
                    filter: "brightness(0.95)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
                  }}
                  whileTap={{
                    y: 0,
                    scale: 0.98,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.10)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
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

              {/* RIGHT: feature cards with hover animations */}
              <div style={cardGrid}>
                {features.map((f, i) => (
                  <motion.article
                    key={i}
                    style={cardBase}
                    variants={cardVariants}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.span
                      variants={sheenVariants}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: "35%",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0))",
                        pointerEvents: "none",
                        filter: "blur(2px)",
                      }}
                    />
                    <div style={cardHead}>
                      <motion.span
                        style={iconWrapBase}
                        variants={iconVariants}
                        aria-hidden="true"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </motion.span>
                      <h3 style={cardTitle}>{f.title}</h3>
                    </div>
                    <p style={cardBody}>{f.body}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          #workshop-overview article { padding: 14px; }
          #workshop-overview .cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

