import React from 'react';
import { motion } from 'framer-motion';

// --- Data ---
// You can replace these with your own images.
// Photo credits: Pexels.com
const items = [
  {
    src: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Woman in an orange top and skirt lying on a white gridded floor',
  },
  {
    src: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Woman in a white hat and sunglasses taking a selfie against a pink background',
  },
  {
    src: 'https://images.pexels.com/photos/373918/pexels-photo-373918.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Sunset view over a dark mountain silhouette',
  },
  {
    src: 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Colorful rainbow popsicles against a background of palm leaves',
  },
  {
    src: 'https://images.pexels.com/photos/3404200/pexels-photo-3404200.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Person swimming underwater in clear blue water',
  },
];


export default () => {
  // --- Carousel Configuration ---
  const carouselRadius = 350; // The radius of the circle (in pixels)
  const itemWidth = 140;       // The width of each item (in pixels)
  const itemHeight = 180;      // The height of each item (in pixels)
  const centralAngle = 180;    // The total angle span of the arc (in degrees)

  const totalItems = items.length;
  // Calculate the angle for each item in the arc
  const anglePerItem = totalItems > 1 ? centralAngle / (totalItems - 1) : 0;
  // The starting angle to center the arc at the top
  const startAngle = -centralAngle / 2;

  // --- Styles ---

  /** @type {React.CSSProperties} */
  const wrapperStyle = {
    position: 'relative',
    width: '100%',
    height: `${carouselRadius * 1.1}px`, // Height to hide the bottom part
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden', // This clips the bottom part of the carousel
    // background: '#f0f0f0', // Optional: for visualization
  };
  
  /** @type {React.CSSProperties} */
  const containerStyle = {
    position: 'relative',
    width: '1px',
    height: '1px',
    // Position the center of the circle at the bottom of the wrapper
    top: `${carouselRadius}px`, 
  };
  
  /** @type {React.CSSProperties} */
  const rotatorBaseStyle = {
    position: 'absolute',
    // Set the origin for rotation to be the center of the carousel container
    transformOrigin: 'center', 
    top: 0,
    left: 0,
  };
  
  /** @type {React.CSSProperties} */
  const itemStyle = {
    width: `${itemWidth}px`,
    height: `${itemHeight}px`,
    backgroundColor: '#ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    // This clip-path creates the trapezoid/wedge shape
    clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)',
  };
  
  /** @type {React.CSSProperties} */
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        {items.map((item, index) => {
          const rotateAngle = startAngle + index * anglePerItem;

          return (
            // This div handles the rotation to place the item on the arc
            <motion.div
              key={index}
              style={{
                ...rotatorBaseStyle,
                transform: `rotate(${rotateAngle}deg)`,
              }}
            >
              {/* This div handles the outward translation and the hover animation */}
              <motion.div
                style={{
                  ...itemStyle,
                  // Translate item outwards from the center along its new Y-axis
                  transform: `translateY(-${carouselRadius}px)`, 
                }}
                whileHover={{
                  scale: 1.15,
                  y: -carouselRadius - 25, // Move it further out on hover
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src={item.src} alt={item.alt} style={imageStyle} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

