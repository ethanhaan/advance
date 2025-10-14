import './Informational.css';
import { useState } from 'react';

import bonnriggLogo from '../assets/school_logos/bonnrigg.png';
import homebushboysLogo from '../assets/school_logos/homebushboys.png';
import huntershillLogo from '../assets/school_logos/huntershill.jpg';
import paramattaLogo from '../assets/school_logos/paramatta.jpeg';
import sydneytechLogo from '../assets/school_logos/sydneytech.jpeg';

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
          Our impact
        </p>
        
        <h1 style={{
          fontFamily: "Poly",
          fontSize: "40px",
          fontWeight: 400,
          color: "rgb(43, 43, 43)",
          margin: "0 0 24px 0",
          lineHeight: 1.2,
        }}>
          Who we've helped
        </h1>
        <p style={{
          fontSize: "16px",
          color: "rgb(84, 84, 84)",
          lineHeight: 1.6,
          margin: 0,
        }}>
          From workshops delivered to careers launched, see how Advance Careers is making a measurable difference in the lives of young Australians. Join us in celebrating our achievements and learn how you can help drive further success.
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
              Our Offerings
            </p>
            <h2 style={{
              fontFamily: "Poly",
              fontSize: "40px",
              fontWeight: 400,
              color: "rgb(43, 43, 43)",
              margin: "0 0 24px 0",
              lineHeight: 1.1,
            }}>
              What do we do?
            </h2>
            <p style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              color: "rgb(84, 84, 84)",
              lineHeight: 1.6,
              margin: "0 0 32px 0",
            }}>
              Random filler text goes here workshops in sydney filler text goes here random filler text
            </p>
            <button style={{
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
              src="https://i.imgur.com/2y043yT.png" 
              alt="Collage of workshop activities in a circular shape" 
              style={{ width: "100%", height: "auto" }} 
            />
          </div>
        </div>
      </div>
    </div>
  ) 
}

