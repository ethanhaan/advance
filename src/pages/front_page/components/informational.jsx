import { useState, useEffect } from 'react';

// --- Import all the school logos from the path you provided ---
import bonnriggLogo from '../assets/school_logos/bonnrigg.png';
import homebushboysLogo from '../assets/school_logos/homebushboys.png';
import huntershillLogo from '../assets/school_logos/huntershill.jpg';
import paramattaLogo from '../assets/school_logos/paramatta.jpeg';
import sydneytechLogo from '../assets/school_logos/sydneytech.jpeg';

// --- Here is the new Logos component ---
const Logos = () => {
  // --- Group all imported logos into an array for easier management ---
  const allLogoSets = [
    // You can create multiple sets if you have more logos
    [bonnriggLogo, homebushboysLogo, huntershillLogo, paramattaLogo, sydneytechLogo],
    [huntershillLogo, paramattaLogo, sydneytechLogo],
  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (allLogoSets.length <= 1) return; // Don't start the animation if there's only one set

    const intervalId = setInterval(() => {
      // 1. Start fading out
      setOpacity(0);

      // 2. After the fade-out transition is complete (500ms), swap the logos
      setTimeout(() => {
        setCurrentSetIndex(prevIndex => (prevIndex + 1) % allLogoSets.length);
        // 3. Start fading in the new logos
        setOpacity(1);
      }, 500); // This duration must match the CSS transition duration

    }, 2000); // Change logos every 4 seconds

    // Cleanup function to stop the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty array [] means this effect runs only once on mount

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '40px',
      width: '100%',
      padding: '40px 0',
      transition: 'opacity 0.5s ease-in-out', // The fade animation
      opacity: opacity, // Controlled by state
    }}>
      {allLogoSets[currentSetIndex].map((logoSrc, index) => (
        <img
          key={index}
          src={logoSrc}
          alt={`School logo ${index + 1}`}
          style={{
            height: '55px', // Sets a uniform height for all logos
            width: 'auto',   // Allows width to adjust to maintain aspect ratio
            objectFit: 'contain',
            filter: 'grayscale(100%)', // Makes them uniform
            opacity: 0.8,
          }}
        />
      ))}
    </div>
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
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
        backgroundColor: "#fff",
        width: "clamp(50%, 900px, 90%)"
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
        <Logos />
      </div>
      <div style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        padding: "80px 0" // Added padding for spacing
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
          {/* Left Column: Text Content */}
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
          
          {/* Right Column: Image */}
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
