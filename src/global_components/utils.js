import { useRef, useEffect } from 'react';

/**
 * A hook that returns a ref. Attach this ref to an element to track
 * its intersection with the top of the viewport.
 * @param {object} options - The callback options.
 * @param {function} [options.onEnter] - Called when the element's top edge scrolls up past the viewport's top edge.
 * @param {function} [options.onLeave] - Called when the element's top edge scrolls down into the viewport from the top.
 */
export const useOnHitTop = ({ onEnter, onLeave } = {}) => {
  const elementRef = useRef(null);
  const isIntersectingRef = useRef(false); // Tracks if the element is currently "entered"

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) {
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const isCurrentlyIntersecting = rect.top <= 0;

      // State changed from NOT intersecting to IS intersecting
      if (isCurrentlyIntersecting && !isIntersectingRef.current) {
        if (typeof onEnter === 'function') {
          onEnter();
        }
        isIntersectingRef.current = true;
      }
      // State changed from IS intersecting to NOT intersecting
      else if (!isCurrentlyIntersecting && isIntersectingRef.current) {
        if (typeof onLeave === 'function') {
          onLeave();
        }
        isIntersectingRef.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Run on mount to set the initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onEnter, onLeave]); // Rerun effect if callbacks change

  // You tether this to an element by attaching the returned ref
  return elementRef;
};
