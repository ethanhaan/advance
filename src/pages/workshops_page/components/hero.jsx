// ./src/pages/workshops_page/components/hero.jsx
import React from "react";
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

  return (
    <div
      className="ws-hero"
      style={{
        width: "100vw",
        height: "70vh",
        position: "relative",
        backgroundImage: `url(${canterburyworkshopimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Mobile-only overrides (desktop remains EXACTLY as before) */}
      <style>{`
        @media (max-width: 900px) {
          .ws-hero {
            height: 70vh !important; /* keep your original height */
          }
          .ws-hero-inner {
            max-width: 100% !important;
            padding-right: 0px !important; /* prevent off-screen clipping */
            padding-left: 24px !important;
            padding-right: 24px !important; /* comfortable gutters */
          }
          .ws-hero-title {
            font-size: 48px !important; /* scale down from 64px on smaller screens */
            line-height: 1.0 !important;  /* keep original line-height */
          }
          .ws-hero-lead-wrap {
            gap: 14px !important;
            margin-top: 18px !important;
            margin-bottom: 56px !important;
            max-width: 100% !important;
          }
          .ws-hero-lead {
            font-size: 16px !important; /* slightly smaller for mobile */
          }
        }

        @media (max-width: 480px) {
          .ws-hero-inner {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .ws-hero-title {
            font-size: 42px !important;
          }
          .ws-hero-lead-wrap {
            margin-bottom: 46px !important;
          }
        }
      `}</style>

      <div
        className="ws-hero-inner"
        style={{
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1000px",
          paddingRight: "200px",
        }}
      >
        {/* Heading: Poly */}
        <div
          className="ws-hero-title"
          style={{
            fontFamily: "Poly, serif",
            color: "#FFFFFF",
            fontWeight: 400,
            fontSize: "64px",
            lineHeight: 1.0,
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          <SwipeReveal delay={0.05}>
            <span style={{ fontFamily: "Poly" }}>Our Programs</span>
          </SwipeReveal>
        </div>

        {/* Paragraph with accent bar: Montserrat */}
        <div
          className="ws-hero-lead-wrap"
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "18px",
            marginTop: "28px",
            marginBottom: "80px",
            maxWidth: "980px",
          }}
        >
          {/* Blue accent bar – grow in */}
          <motion.div
            style={{
              width: "8px",
              backgroundColor: "#1B56BA",
              alignSelf: "stretch",
              transformOrigin: "top left",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.18,
            }}
          />
          <div
            className="ws-hero-lead"
            style={{
              fontFamily:
                'Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: "#FFFFFF",
              fontSize: "18px",
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            <SwipeReveal delay={0.2}>{`Advance Careers offers a range of sessions, each aiming to help students navigate their uncertain next chapter of tertiary education.`}</SwipeReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

