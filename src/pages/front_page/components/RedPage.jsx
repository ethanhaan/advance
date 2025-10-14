import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './RedPage.css';

export default function RedPage() {
  const prefersReducedMotion = useReducedMotion();

  // Container + child variants
  const container = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
      filter: prefersReducedMotion ? 'none' : 'blur(6px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: prefersReducedMotion ? 'tween' : 'spring',
        duration: prefersReducedMotion ? 0.4 : 0.8,
        bounce: prefersReducedMotion ? 0 : 0.25,
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 16,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: prefersReducedMotion ? 'tween' : 'spring',
        duration: prefersReducedMotion ? 0.35 : 0.6,
        bounce: prefersReducedMotion ? 0 : 0.25,
      },
    },
  };

  return (
    <section className="red-page-section">
      {/* Animated content wrapper */}
      <motion.div
        className="red-page-content"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.45 }}
      >
        <motion.h2 className="red-page-title" variants={item}>
          Matt Ng is a Gronk
        </motion.h2>

        <motion.p className="red-page-description" variants={item}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequa
        </motion.p>

        <motion.button
          className="red-page-cta"
          variants={item}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          Contact Us
        </motion.button>
      </motion.div>
    </section>
  );
}
