import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import workshopimg from '../assets/hero_image.png';

/**
 * Hero component (reference-matched)
 * - Solid dark background (no image/gradient)
 * - Left-aligned eyebrow/headline/CTA inside .hero__container
 * - Stats + divider live outside the container in a centered belt
 *
 * NOTE: Inline styles only. Framer Motion adds swipe/wipe animations.
 */
export default function Hero({ style }) {
  const COLORS = {
    textMain: "#ffffff",
    textMuted: "#a0a0a0",
    eyebrow: "#dadada",
  };

  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [ctaHover, setCtaHover] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);

  // ======== Swipe / Wipe helpers (Canva-like) ========
  const swipeTransition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };
  const wipeTransition = { duration: 0.9, ease: [0.37, 0, 0.63, 1] };

  const SwipeReveal = ({ children, delay = 0 }) => {
    const wrapperStyle = {
      position: "relative",
      display: "inline-block",
      overflow: "hidden",        // <— clip the wipe so it can't linger
    };
    const wipeStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "28%",
      pointerEvents: "none",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.0) 100%)",
      mixBlendMode: "screen",
      filter: "blur(0.3px)",
    };

    return (
      <motion.span
        style={wrapperStyle}
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        transition={{ ...swipeTransition, delay }}
      >
        {children}
        <motion.span
          aria-hidden="true"
          style={wipeStyle}
          initial={{ x: "-120%", opacity: 1 }}
          animate={{
            x: "150%",            // overshoot beyond right edge
            opacity: 0,           // fade out while exiting
            transitionEnd: { display: "none" }, // then fully remove
          }}
          transition={{ ...wipeTransition, delay: delay + 0.05 }}
        />
      </motion.span>
    );
  };

  // ======== Styles (layout/typography unchanged) ========
  const heroStyle = {
    position: "sticky",
    top: 0,
    color: COLORS.textMain,
    backgroundImage: `url(${workshopimg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    overflow: "clip",
    isolation: "isolate",
    containerType: "inline-size",
    overflowX: "clip",
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    ...(style || {}),
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "none",
    marginInline: 0,
    padding:
      "clamp(9rem, 15vw, 15rem) clamp(1.25rem, 7vw, 6rem) clamp(2rem, 6vw, 6rem) clamp(2rem, 8vw, 8rem)",
    display: "grid",
    gap: "clamp(1rem, 2vw, 2rem)",
    textAlign: "left",
  };

  const contentStyle = {
    maxWidth: "min(840px, 92vw)",
    textAlign: "left",
  };

  const eyebrowStyle = {
    margin: "0 0 0.9rem 0",
    fontFamily: 'Poly, ui-serif, Georgia, Cambria, "Times New Roman", serif',
    fontSize: "0.95rem",
    lineHeight: 1.35,
    fontWeight: 400,
    textTransform: "none",
    letterSpacing: "0.02em",
    color: COLORS.eyebrow,
  };

  const headlineStyle = {
    margin: "0 0 clamp(1.4rem, 3.8vw, 2.4rem) 0",
    fontFamily: 'Poly, ui-serif, Georgia, Cambria, "Times New Roman", serif',
    fontWeight: 400,
    lineHeight: 1.15,
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
    maxWidth: "20ch",
    color: "#fff",
  };

  const italicStyle = {
    fontFamily: 'Poly, ui-serif, Georgia, Cambria, "Times New Roman", serif',
    fontStyle: "italic",
    fontWeight: 400,
    display: vw >= 768 ? "block" : "inline",
  };

  const ctaStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.9rem",
    background: "#ffffff",
    color: "#111111",
    textDecoration: "none",
    border: "1px solid #ffffff",
    borderRadius: "999px",
    padding: "0.2rem 0.20rem 0.20rem 1.25rem",
    minHeight: 30,
    fontWeight: 600,
    lineHeight: 1,
    willChange: "transform, opacity",
    transition: "transform 150ms ease, opacity 150ms ease",
    transform: ctaHover ? "translateY(-1px)" : "none",
    opacity: ctaActive ? 0.96 : 1,
    outline: "none",
    position: "relative",
    overflow: "hidden",
  };

  const ctaTextStyle = {
    display: "inline-block",
    fontFamily:
      'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const ctaIconWrapStyle = {
    marginRight: 5,
    width: 36,
    height: 36,
    borderRadius: "999px",
    background: "#111827",
    color: "#ffffff",
    display: "grid",
    placeItems: "center",
  };

  const ctaIconStyle = { display: "block" };

  const beltStyle = {
    width: "100%",
    background: "transparent",
  };

  const beltInnerStyle = {
    marginInline: "auto",
    padding: "clamp(0.5rem, 2.5vw, 1rem) clamp(1.25rem, 4vw, 2rem)",
  };

  const statsStyle = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: vw >= 768 ? "repeat(4, auto)" : "1fr 1fr",
    gap: "1rem 10rem",
    justifyContent: "center",
    textAlign: "left",
  };

  const statStyle = {
    display: "grid",
    gap: "0.35rem",
    background: "none",
    border: "none",
    borderRadius: 0,
  };

  const statValueStyle = {
    fontFamily:
      'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: 400,
    fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)",
    lineHeight: 1.15,
    color: "#ffffff",
  };

  const statLabelStyle = {
    fontFamily:
      'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: "0.85rem",
    lineHeight: 1.35,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: COLORS.textMuted,
  };

  const dividerStyle = {
    margin: "clamp(1.25rem, 3.5vw, 2.25rem) auto 0",
    height: 1,
    background: "rgba(255, 255, 255, 0.25)",
    width: "90%",
  };

  // ======== Motion variants for staggered entrances ========
  const contentStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const statStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.15 },
    },
  };
  const statItem = {
    hidden: { y: 8, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section style={heroStyle} aria-label="Empowering Youth Hero">
      <div aria-hidden="true" style={{ display: "none" }} />

      <div style={containerStyle}>
        <motion.div
          style={contentStyle}
          role="group"
          aria-label="Hero message"
          variants={contentStagger}
          initial="hidden"
          animate="show"
        >
          <p style={eyebrowStyle}>
            <SwipeReveal delay={0.05}>Empowering Youth</SwipeReveal>
          </p>

          <h1>
            <SwipeReveal delay={0.15}><span style={headlineStyle}>Advancing the careers</span></SwipeReveal>{" "}
            <SwipeReveal delay={0.3}>
              <span style={italicStyle}>of young Australians</span>
            </SwipeReveal>
          </h1>

          <motion.a
            href="#workshops"
            aria-label="Book a workshop"
            style={ctaStyle}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.45 }}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => {
              setCtaHover(false);
              setCtaActive(false);
            }}
            onMouseDown={() => setCtaActive(true)}
            onMouseUp={() => setCtaActive(false)}
            onBlur={() => {
              setCtaHover(false);
              setCtaActive(false);
            }}
          >
            {/* CTA inner swipe shimmer on hover */}
            <motion.span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "22%",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(0,0,0,0.08) 45%, rgba(255,255,255,0.0) 100%)",
                pointerEvents: "none",
                mixBlendMode: "overlay",
              }}
              initial={false}
              animate={{ x: ctaHover ? "115%" : "-115%", opacity: ctaHover ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            <span style={ctaTextStyle}>Book Workshop</span>
            <span style={ctaIconWrapStyle} aria-hidden="true">
              <motion.svg
                style={ctaIconStyle}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                focusable="false"
                initial={false}
                animate={{ x: ctaHover ? 2 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <path
                  d="M5 12h12M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
          </motion.a>
        </motion.div>
      </div>

      <div style={beltStyle} aria-label="Impact statistics section">
        <div style={beltInnerStyle}>
          <motion.ul
            style={statsStyle}
            aria-label="Impact statistics"
            variants={statStagger}
            initial="hidden"
            animate="show"
          >
            <motion.li style={statStyle} variants={statItem}>
              <span style={statValueStyle}>50+</span>
              <span style={statLabelStyle}>STUDENTS REACHED</span>
            </motion.li>
            <motion.li style={statStyle} variants={statItem}>
              <span style={statValueStyle}>100+</span>
              <span style={statLabelStyle}>TEAM OF UNI STUDENTS</span>
            </motion.li>
            <motion.li style={statStyle} variants={statItem}>
              <span style={statValueStyle}>10</span>
              <span style={statLabelStyle}>SCHOOLS ACROSS AUSTRALIA</span>
            </motion.li>
            <motion.li style={statStyle} variants={statItem}>
              <span style={statValueStyle}>$3.5K</span>
              <span style={statLabelStyle}>REVENUE</span>
            </motion.li>
          </motion.ul>

          <div aria-hidden="true" style={dividerStyle} />
        </div>
      </div>
    </section>
  );
}

