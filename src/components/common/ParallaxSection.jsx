import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import './ParallaxSection.css';

const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const centerOffset = (center - windowHeight / 2) / windowHeight;
        setOffset(centerOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      ref={ref}
      className={`parallax-section ${className}`}
      style={{
        transform: `translateY(${offset * speed * 30}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        perspective={1000}
        scale={1.02}
        gyroscope={true}
        className="parallax-tilt"
      >
        {children}
      </Tilt>
    </motion.div>
  );
};

export default ParallaxSection;