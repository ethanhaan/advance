import React, { useEffect } from "react";
import Hero from "./components/hero.jsx";
import WorkshopsCarousel from "./components/workshops_carousel.jsx";
import WorkshopContent from "./components/workshop_content.jsx";
import Offerings from "./components/offerings.jsx";

import img1 from "./assets/canterbury_workshop.png";
import img2 from "./assets/canterbury_workshop.png";
import img3 from "./assets/canterbury_workshop.png";

export default function WorkshopsPage({ setIsNavbarFixed }) {
  useEffect(() => {
    // keep navbar fixed like your front page hero behavior
    setIsNavbarFixed?.(true);
  }, [setIsNavbarFixed]);

  return (
    <>
      <Hero />
      <div style={{position: "absolute", width: "100vw", transform: "translateY(-140px)"}}>
        <Offerings />
      </div>
      <WorkshopsCarousel
        images={[img1, img2, img3]}
        aspect={16 / 9} // change if you prefer 4/3 etc.
      />
      <WorkshopContent />
    </>
  );
}

