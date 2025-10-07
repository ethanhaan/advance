import React from "react";
import "./hero.css";

/**
 * Hero component (reference-matched)
 * - Solid dark background (no image/gradient)
 * - Left-aligned at all breakpoints
 * - Serif headline with italic phrase forced to new line on ≥768px
 * - Taller CTA with dark circular icon container
 * - Clean, unboxed stats row with divider
 */

export default function Hero({ style }) {
  return (
    <section className="hero" style={style} aria-label="Empowering Youth Hero">
      {/* Decorative layer intentionally hidden via CSS */}
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__content" role="group" aria-label="Hero message">
          <p className="hero__eyebrow">Empowering Youth</p>

          <h1 className="hero__headline">
            Advancing the careers{" "}
            <span className="hero__headline-italic">of young Australians</span>
          </h1>

          <a className="hero__cta" href="#workshops" aria-label="Book a workshop">
            <span className="hero__cta-text">Book Workshop</span>
            <span className="hero__cta-iconwrap" aria-hidden="true">
              <svg
                className="hero__cta-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                focusable="false"
              >
                <path
                  d="M5 12h12M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div> {/* closes .hero__container */}

      {/* Centered stats + divider outside the padded hero__container */}
      <div className="hero__belt" aria-label="Impact statistics section">
        <div className="hero__belt-inner">
          <ul className="hero__stats" aria-label="Impact statistics">
            <li className="hero__stat">
              <span className="hero__stat-value">50+</span>
              <span className="hero__stat-label">STUDENTS REACHED</span>
            </li>
            <li className="hero__stat">
              <span className="hero__stat-value">100+</span>
              <span className="hero__stat-label">TEAM OF UNI STUDENTS</span>
            </li>
            <li className="hero__stat">
              <span className="hero__stat-value">10</span>
              <span className="hero__stat-label">SCHOOLS ACROSS AUSTRALIA</span>
            </li>
            <li className="hero__stat">
              <span className="hero__stat-value">$3.5K</span>
              <span className="hero__stat-label">REVENUE</span>
            </li>
          </ul>

          <div className="hero__stats-divider" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

