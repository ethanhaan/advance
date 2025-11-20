// ./src/pages/workshops_page/workshops_page.jsx
import React, { useEffect, useState } from "react";
import Hero from "./components/hero.jsx";
import WorkshopsCarousel from "./components/workshops_carousel.jsx";
import WorkshopContent from "./components/workshop_content.jsx";
import CTA from "./components/CTA.jsx";
import Offerings, { offeringsData } from "./components/offerings.jsx";
import { useOnHitTop } from "../../global_components/utils.js";

export default function WorkshopsPage({ setIsNavbarFixed, setIsOpaque }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // +1 = next, -1 = previous

  const scrollRef = useOnHitTop({
    onEnter: () => {
      setIsNavbarFixed(true);
      setIsOpaque(true);
    },
    onLeave: () => {
      setIsNavbarFixed(false);
      setIsOpaque(false);
    },
  });

  const activeWorkshop = offeringsData[activeIndex];

  useEffect(() => {
    setIsNavbarFixed(false);
    setIsOpaque(false);
  }, []);

  const handleChangeWorkshop = (newIndex) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  return (
    <>
      <Hero />

      {/* Offerings overlayed under hero */}
      <div
        style={{
          position: "absolute",
          width: "100vw",
          transform: "translateY(-140px)",
        }}
      >
        <Offerings
          activeIndex={activeIndex}
          setActiveIndex={handleChangeWorkshop}
        />
      </div>

      {/* Content: inner block animates, white section stays fixed */}
      <WorkshopContent
        eyebrow={activeWorkshop.overviewEyebrow}
        title={activeWorkshop.overviewTitle}
        lead={activeWorkshop.overviewLead}
        features={activeWorkshop.overviewFeatures}
        workshopIndex={activeIndex}
        direction={direction}
      />

      <div ref={scrollRef}>
        {/* Carousel: only inner content animates, background section stays fixed */}
        <WorkshopsCarousel
          images={activeWorkshop.carouselImages}
          aspect={16 / 9}
          workshopIndex={activeIndex}
          direction={direction}
        />
      </div>

      <CTA />
    </>
  );
}
