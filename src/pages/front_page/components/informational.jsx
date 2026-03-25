import './informational.css';
import { useState } from 'react';

import bonnriggLogo from '../assets/school_logos/bonnrigg.jpg';
import homebushboysLogo from '../assets/school_logos/homebushboys.png';
import huntershillLogo from '../assets/school_logos/huntershill.jpg';
import paramattaLogo from '../assets/school_logos/paramatta.jpeg';
import sydneytechLogo from '../assets/school_logos/sydneytech.jpeg';
import advanceImage from '../assets/advance_front.jpg';

const ImageCycler = ({ images, phase = 0 }) => {
  const [idx, setIdx] = useState(0);

  return (
    <div
      className="logo-block"
      style={{ animationDelay: `${phase}s` }}
      onAnimationIteration={() => {
        // advance to next image every full animation cycle (keeps same timing as CSS)
        setIdx((i) => (i + 1) % images.length);
      }}
    >
      <img
        src={images[idx]}
        alt={`School logo ${idx + 1}`}
        className="logo-image"
      />
    </div>
  );
};

const Logos = () => {
  const logoSetOne = [bonnriggLogo, homebushboysLogo, huntershillLogo, paramattaLogo, sydneytechLogo];
  const logoSetTwo = [paramattaLogo, sydneytechLogo, bonnriggLogo, huntershillLogo, homebushboysLogo];

  // Build distinct arrays per tile: each tile cycles through its own list (pairing column-wise)
  const tiles = logoSetOne.map((img1, i) => [img1, logoSetTwo[i]]);

  // Predefined, non-sequential phase offsets (negative = start mid-cycle) to desynchronize switches
  const PHASES = [-2.0, -0.5, -1.7, -3.1, -1.1];

  return (
    <>
      <div className="logos-container">
        {tiles.map((imgs, i) => (
          <ImageCycler key={`tile-${i}`} images={imgs} phase={PHASES[i % PHASES.length]} />
        ))}
      </div>
    </>
  );
};

export default () => {
  return (
    <div style={{
      width: "100%",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px 0 20px",
        backgroundColor: "#fff",
        width: "clamp(50%, 900px, 90%)",
        minHeight: "350px",
        position: "relative"
      }}>
        <p style={{
          fontFamily: "Poly",
          color: "#1B56BA",
          fontSize: "16px",
          fontWeight: "bold",
          margin: "0 0 16px 0",
        }}>
          The Problem
        </p>
        
        <h1 style={{
          fontFamily: "Poly",
          fontSize: "40px",
          fontWeight: 400,
          color: "rgb(43, 43, 43)",
          margin: "0 0 24px 0",
          lineHeight: 1.2,
        }}>
          Current careers education
        </h1>
        <p style={{
          fontSize: "16px",
          color: "rgb(84, 84, 84)",
          lineHeight: 1.6,
          margin: 0,
        }}>
          Students are making high-stakes subject and post-school decisions in an environment dominated by misinformation, social media narratives, and limited real-world exposure.

          Schools are expected to prepare students for a rapidly changing labour market - often without the time, specialist resourcing, or up-to-date industry insight required to do this well.

          The result is confusion, inequity, and decisions made without adequate guidance.

        </p>
        <div style={{
            position: "relative",
            width: "100%",
            height: "150px",
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Logos />
        </div>
      </div>
      <div style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        padding: "80px 0"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          width: "90%",
          maxWidth: "900px",
          padding: "0 20px",
        }}>
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}>
            <p style={{
              fontFamily: "Poly",
              color: "#1B56BA",
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0 0 16px 0",
            }}>
              Our Purpose
            </p>
            <h2 style={{
              fontFamily: "Poly",
              fontSize: "40px",
              fontWeight: 400,
              color: "rgb(43, 43, 43)",
              margin: "0 0 24px 0",
              lineHeight: 1.1,
            }}>
              Why Advance Careers exists
            </h2>
            <p style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              color: "rgb(84, 84, 84)",
              lineHeight: 1.6,
              margin: "0 0 16px 0", // Reduced margin for spacing between paragraphs
            }}>
              Advance Careers was created to bridge the gap between school-based careers education and the realities of modern study, work, and training pathways.
            </p>

            {/* Paragraph 2 */}
            <p style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              color: "rgb(84, 84, 84)",
              lineHeight: 1.6,
              margin: "0 0 16px 0",
            }}>
              We connect students with trained university mentors and young professionals who offer credible, lived-experience insights - delivered through structured programs designed to complement existing school frameworks, not add burden.
            </p>

            {/* Paragraph 3 */}
            <p style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              color: "rgb(84, 84, 84)",
              lineHeight: 1.6,
              margin: "0 0 32px 0", // Original margin for the bottom
            }}>
              Our not-for-profit model ensures advice is unbiased, evidence-based, and focused solely on student wellbeing and informed decision-making.
            </p>            <button style={{
              backgroundColor: "#1A2B4D",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "12px 24px",
              fontSize: "16px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
              Contact Us
            </button>
          </div>
          
          <div style={{
            flex: 1,
          }}>
            <img 
              src={advanceImage}
              alt="Collage of workshop activities in a circular shape" 
              style={{ width: "100%", height: "auto" }} 
            />
          </div>
        </div>
      </div>
    </div>
  ) 
}

