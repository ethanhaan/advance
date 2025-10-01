import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const placeholderImages = [
  "https://picsum.photos/seed/p1/400/400",
  "https://picsum.photos/seed/p2/400/400",
  "https://picsum.photos/seed/p3/400/400",
  "https://picsum.photos/seed/p4/400/400",
  "https://picsum.photos/seed/p5/400/400",
  "https://picsum.photos/seed/p6/400/400",
  "https://picsum.photos/seed/p7/400/400",
  "https://picsum.photos/seed/p8/400/400",
];

/**
 * An Image Pinwheel that snaps to slices with a spring animation and has a center circle.
 * @param {object} props
 * @param {string[]} [props.images=placeholderImages] - An array of image URLs.
 * @param {number} [props.size=500] - The diameter of the pinwheel in pixels.
 */
const ImagePinwheel = ({ images = placeholderImages, size = 500 }) => {
  const numImages = images.length;
  const sliceAngle = 360 / numImages;

  const rotation = useMotionValue(0);
  const dragStart = useRef({ rotation: 0 });

  const clipPathPolygon = useMemo(() => {
    const angleInRad = (sliceAngle * Math.PI) / 180;
    const tanValue = Math.tan(angleInRad / 2);
    const xOffset = 50 * tanValue;
    const p1x = 50 - xOffset;
    const p2x = 50 + xOffset;

    if (sliceAngle >= 179.9) {
      return `polygon(50% 50%, -100% 0%, 300% 0%)`;
    }
    return `polygon(50% 50%, ${p1x}% 0%, ${p2x}% 0%)`;
  }, [sliceAngle]);

  // --- STYLES ---

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
    background: '#f0f0f0',
  };

  // NEW: A wrapper to hold both the pinwheel and the center circle
  const pinwheelWrapperStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `${size}px`,
    height: `${size}px`,
  };
  
  const pinwheelContainerStyle = {
    position: 'absolute', // Positioned within the new wrapper
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'grab',
    userSelect: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 0 10px rgba(255,255,255,0.5)',
  };

  // NEW: Style for the stationary center circle
  const centerCircleStyle = {
    position: 'absolute',
    width: `${size / 2}px`, // Diameter is 50% of the pinwheel's radius (size / 2 * 0.5)
    height: `${size / 2}px`,
    background: '#fff',
    borderRadius: '50%',
    zIndex: 2, // Ensure it's on top of the pinwheel slices
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // A very subtle shadow for definition
  };

  const sliceStyle = (index) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transformOrigin: '50% 50%',
    transform: `rotate(${index * sliceAngle}deg)`,
    clipPath: clipPathPolygon,
    overflow: 'hidden',
  });
  
  const imageHolderStyle = (imageUrl, index) => ({
    width: '100%',
    height: '100%',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: `rotate(${-index * sliceAngle}deg)`,
    transformOrigin: '50% 50%',
  });

  return (
    <div style={wrapperStyle}>
        {/* NEW: Using the wrapper to contain both elements */}
        <div style={pinwheelWrapperStyle}>
            <motion.div
                style={{
                    ...pinwheelContainerStyle,
                    rotate: rotation,
                }}
                onPanStart={(event, info) => {
                  document.body.style.cursor = 'grabbing';
                  rotation.stop();
                  dragStart.current.rotation = rotation.get();
                }}
                onPan={(event, info) => {
                  rotation.set(dragStart.current.rotation + info.offset.x * 0.8);
                }}
                onPanEnd={(event, info) => {
                  document.body.style.cursor = 'default';
                  const currentRotation = rotation.get();
                  const velocity = info.velocity.x;
                  const projectedRotation = currentRotation + velocity * 0.1;
                  const nearestSliceIndex = Math.round(projectedRotation / sliceAngle);
                  const targetRotation = nearestSliceIndex * sliceAngle;

                  animate(rotation, targetRotation, {
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                    mass: 1,
                  });
                }}
            >
                {images.map((img, i) => (
                    <div key={i} style={sliceStyle(i)}>
                        <div style={imageHolderStyle(img, i)} />
                    </div>
                ))}
            </motion.div>
            
            {/* NEW: The stationary white circle element */}
            <div style={centerCircleStyle} />
        </div>
    </div>
  );
};

export default ImagePinwheel;
