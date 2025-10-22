// ./src/pages/workshops_page/components/workshop_content.jsx
import React from "react";

export default function WorkshopContent() {
  const COLORS = {
    blue: "#1B56BA",
    textMain: "rgb(43, 43, 43)",
    textMuted: "rgb(84, 84, 84)",
    border: "#e5e7eb",
    chip: "#eef2ff",
  };

  const features = [
    {
      title: "Master Proven Techniques",
      body:
        "Learn and apply methods like Active Recall and Spaced Repetition for long-term memory retention.",
    },
    {
      title: "Boost Productivity",
      body:
        "Implement time-management systems like the Pomodoro Technique to reduce procrastination and increase focus.",
    },
    {
      title: "Reduce Exam Stress",
      body:
        "Use effective note-taking, spaced reviews, and exam frameworks to build confidence and lower anxiety.",
    },
    {
      title: "Personalized Action Plan",
      body:
        "Leave with a tailored study plan that fits individual learning styles, subjects, and weekly schedules.",
    },
  ];

  const sectionStyle = {
    backgroundColor: "#ffffff",
    borderTop: `1px solid ${COLORS.border}`,
    padding: "clamp(56px, 8vw, 84px) 0",
    fontFamily:
      'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const containerStyle = {
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "0 clamp(24px, 5vw, 40px)",
  };

  const eyebrowStyle = {
    fontFamily: "Poly, ui-serif, Georgia, Cambria, Times New Roman, serif",
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
  };

  const h2Style = {
    fontFamily: "Poly, ui-serif, Georgia, Cambria, Times New Roman, serif",
    fontWeight: 400,
    fontSize: "clamp(28px, 4vw, 40px)",
    color: COLORS.textMain,
    lineHeight: 1.2,
    margin: "10px 0 16px",
  };

  // Two-column row: vertically center both sides
  const leadRow = {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "clamp(18px, 4vw, 48px)",
    alignItems: "center", // center-align left & right content vertically
  };

  // Left paragraph block: keep text perfectly aligned with the title start.
  const leadParaWrap = {
    position: "relative", // anchor for the blue bar
    paddingLeft: 0,       // no indent — aligns with the title above
  };

  // Blue accent bar that sits *outside* the paragraph without shifting text.
  const blueBar = {
    position: "absolute",
    left: "-24px", // place bar just outside the left edge so text alignment remains
    top: 2,
    bottom: 2,
    width: 8,
    background: COLORS.blue,
    borderRadius: 2,
  };

  const leadP = {
    margin: 0,
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 1.7,
  };

  const cardGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  };

  const card = {
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "18px 18px",
    background: "#fafafa",
  };

  const cardHead = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  };

  const iconWrap = {
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
    margin: "8px 0 0",
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 1.7,
  };

  const ctaRow = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginTop: "28px",
  };

  const primaryBtn = {
    background: COLORS.blue,
    color: "#fff",
    border: `1px solid ${COLORS.blue}`,
    borderRadius: 6,
    padding: "10px 18px",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <section style={sectionStyle} id="workshop-overview" aria-label="Workshop overview">
      <div style={containerStyle}>
        <p style={eyebrowStyle}>Our Workshops</p>
        <h2 style={h2Style}>Workshop Overview</h2>

        <div style={leadRow}>
          {/* Overview text with accent bar — aligned to title */}
          <div style={leadParaWrap}>
            <div style={blueBar} aria-hidden="true" />
            <p style={leadP}>
              Presented by high-achieving university students who have succeeded through the same
              process, this workshop delivers the study techniques and strategies that helped us
              thrive in university. We move beyond theory to provide practical, actionable advice
              that students can implement immediately to improve learning efficiency, retention,
              and academic performance in a small, interactive group setting.
            </p>
          </div>

          {/* Feature cards */}
          <div style={cardGrid}>
            {features.map((f, i) => (
              <article key={i} style={card}>
                <div style={cardHead}>
                  <span style={iconWrap} aria-hidden="true">
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
                  </span>
                  <h3 style={cardTitle}>{f.title}</h3>
                </div>
                <p style={cardBody}>{f.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Primary CTA only */}
        <div style={ctaRow}>
          <button
            style={primaryBtn}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-contact", { detail: { source: "workshop-content" } })
              )
            }
          >
            Book a Workshop
          </button>
        </div>
      </div>

      {/* Small, inline responsive CSS (no external file) */}
      <style>{`
        @media (max-width: 900px) {
          #workshop-overview .cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

