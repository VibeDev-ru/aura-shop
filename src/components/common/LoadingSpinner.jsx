import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary', text = '' }) => {
  const sizes = {
    small: '30px',
    medium: '48px',
    large: '64px',
  };

  const spinnerSize = sizes[size] || sizes.medium;

  return (
    <div className="loading-spinner-container">
      <motion.div
        className={`loading-spinner ${color}`}
        style={{ width: spinnerSize, height: spinnerSize }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <div className="spinner-circle">
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
        </div>
      </motion.div>
      
      {text && (
        <motion.p 
          className="loading-spinner-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;