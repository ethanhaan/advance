import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import canterburyworkshopimg from "../assets/canterbury_workshop.png";

export default () => {
  // ======== Swipe / Wipe helpers (Canva-like) ========
  const swipeTransition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };
  const wipeTransition = { duration: 0.9, ease: [0.37, 0, 0.63, 1] };

  const SwipeReveal = ({ children, delay = 0 }) => {
    const wrapperStyle = {
      position: "relative",
      display: "inline-block",
      overflow: "hidden", // ensure the wipe never lingers outside
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
            x: "150%",
            opacity: 0,
            transitionEnd: { display: "none" },
          }}
          transition={{ ...wipeTransition, delay: delay + 0.05 }}
        />
      </motion.span>
    );
  };

  // ======== Mobile responsiveness (keep desktop EXACT same) ========
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 768;

  return (
    <div
      style={{
        width: "100vw",
        height: isMobile ? "50svh" : "60vh", // mobile-friendly height, desktop unchanged
        position: "relative",
        backgroundImage: `url(${canterburyworkshopimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Content overlay (no dark overlay per your instruction) */}
      <div
        style={{
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1000px",
          paddingRight: isMobile ? "24px" : "200px", // reduce right padding on mobile
          paddingLeft: isMobile ? "24px" : "0px", // add left padding on mobile so text doesn't hug edge
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* Heading: Poly */}
        <div
          style={{
            fontFamily: "Poly, serif",
            color: "#FFFFFF",
            fontWeight: 400,
            fontSize: isMobile ? "44px" : "64px", // scale down on mobile
            lineHeight: 1.0,
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          <SwipeReveal delay={0.05}>
            <span style={{ fontFamily: "Poly" }}>About</span>
          </SwipeReveal>
        </div>

        {/* Paragraph with accent bar: Montserrat */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: isMobile ? "14px" : "18px",
            marginTop: isMobile ? "18px" : "28px",
            maxWidth: isMobile ? "560px" : "980px", // prevent over-wide copy on mobile
          }}
        >
          {/* Blue accent bar – grow in */}
          <motion.div
            style={{
              width: isMobile ? "6px" : "8px", // slightly slimmer on mobile
              backgroundColor: "#1B56BA",
              alignSelf: "stretch",
              transformOrigin: "top left",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          />

          <div
            style={{
              fontFamily:
                'Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: "#FFFFFF",
              fontSize: isMobile ? "16px" : "18px", // mobile readable
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            <SwipeReveal delay={0.2}>{`Advance Careers was founded to address the challenges faced by 
Australian youth struggling to navigate their post‐high school life and career paths. `}</SwipeReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

// Time complexity: N/A (UI rendering)

