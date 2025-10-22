import { useEffect } from 'react';
import Hero from './components/hero';
import Quote from './components/Quote';
import Values from './components/Values';
import Testimonial from './components/Testimonial';
import Timeline from './components/Timeline';
import Profiles from "./components/Profiles";
import CTA from '../../global_components/CTA/CTA';
import { useOnHitTop } from '../../global_components/utils.js';

export default function AboutPage({ setIsNavbarFixed, setIsOpaque }) {
  const quoteRef = useOnHitTop({
    onEnter: () => {
      setIsNavbarFixed(true);
      setIsOpaque(true);
    },
    onLeave: () => {
      setIsNavbarFixed(false);
      setIsOpaque(false);
    },
  });

  useEffect(() => {
    setIsNavbarFixed(false);
    setIsOpaque(false);
  }, []);


  return (
    <>
      <Hero />
      <div ref={quoteRef}>
        <Quote />
      </div>
      <Values />
      <Testimonial />
      <Profiles />
      <Timeline />
      <CTA />
    </>
  );
}
