import React, { useEffect, useRef, useState } from "react";

export default function WorkshopsCarousel({
  images = [],
  aspect = 16 / 9,
}) {
  const [active, setActive] = useState(0);
  const count = images.length;
  const containerRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);

  const relIndex = (i) => {
    let r = i - active;
    const half = Math.floor(count / 2);
    if (r > half) r -= count;
    if (r < -half) r += count;
    return r;
  };

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "96px 0 70px",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <style>{`
        .ws-carousel { 
          position: relative; 
          margin: 0 auto; 
          width: min(1100px, 92vw); 
          user-select: none;
        }
        .ws-viewport {
          position: relative;
          width: 100%;
          overflow: visible;
        }
        .ws-slide {
          position: absolute; 
          top: 50%; 
          left: 50%;
          width: 70%;
          aspect-ratio: var(--ar);
          transform: translate(-50%, -50%);
          transition: 
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 360ms ease,
            opacity 360ms ease,
            box-shadow 360ms ease;
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
          box-shadow: 0 12px 30px rgba(0,0,0,0.18);
          border-radius: 14px;
          overflow: hidden;
          background: #0b0f14;
        }
        .ws-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Center slide: crisp */
        .ws-slide[data-pos="0"] {
          opacity: 1;
          filter: none;
          box-shadow: 0 16px 36px rgba(0,0,0,0.22);
          z-index: 3;
        }

        /* Neighbor slides (peek): slightly smaller, faded & blurred */
        .ws-slide[data-pos="-1"],
        .ws-slide[data-pos="1"] {
          width: 62%;
          opacity: 0.72;                         /* fade */
          filter: brightness(0.85) saturate(0.9) blur(2px); /* dim + blur */
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          z-index: 2;
          cursor: pointer;
        }

        /* Hide slides beyond immediate neighbors */
        .ws-slide[data-abspos="2"],
        .ws-slide[data-abspos="3"] {
          opacity: 0;
          pointer-events: none;
        }

        .ws-fade-edge {
          position: absolute;
          top: 0; bottom: 0; width: 9%;
          pointer-events: none;
          z-index: 5;
        }
        .ws-fade-edge.left {
          left: -2%;
          background: linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%);
        }
        .ws-fade-edge.right {
          right: -2%;
          background: linear-gradient(270deg, #fff 0%, rgba(255,255,255,0) 100%);
        }

        .ws-dots {
          margin: 18px 0 0;
          display: flex; gap: 8px; justify-content: center; align-items: center;
        }
        .ws-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: #c7d2fe;
          opacity: 0.45;
          transition: all 200ms ease;
        }
        .ws-dot.active {
          width: 24px;
          opacity: 1;
          background: #1B56BA;
        }

        /* Respect reduced motion: avoid blur animation jumps */
        @media (prefers-reduced-motion: reduce) {
          .ws-slide { transition: transform 320ms ease, opacity 200ms ease; }
        }
      `}</style>

      <div className="ws-carousel" ref={containerRef} aria-label="Workshops carousel">
        <div
          className="ws-viewport"
          style={{ paddingTop: `${100 / aspect}%` }}
        >
          <div className="ws-fade-edge left" aria-hidden="true" />
          <div className="ws-fade-edge right" aria-hidden="true" />

          {images.map((src, i) => {
            if (!src) return null;
            const pos = relIndex(i);
            const abspos = Math.abs(pos);
            const translatePercent = pos * (abspos === 1 ? 30 : 52); // was 52 for all
            const scale = pos === 0 ? 1 : 0.9;

            return (
              <div
                key={i}
                className="ws-slide"
                data-pos={pos}
                data-abspos={abspos}
                style={{
                  ["--ar"]: String(aspect),
                  transform: `translate(-50%, -50%) translateX(${translatePercent}%) scale(${scale})`,
                  zIndex: 10 - abspos,
                }}
                onClick={() => {
                  if (pos !== 0) setActive(i);
                }}
              >
                <img src={src} alt={`Workshop ${i + 1}`} draggable="false" />
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <div className="ws-dots" role="tablist" aria-label="Slide indicators">
            {images.map((_, i) => (
              <div
                key={`dot-${i}`}
                className={`ws-dot ${i === active ? "active" : ""}`}
                role="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

