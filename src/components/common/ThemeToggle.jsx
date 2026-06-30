import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Icons } from '../../assets/icons';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <motion.div
        className="theme-toggle-icons"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        {isDark ? (
          <Icons.moon size={20} />
        ) : (
          <Icons.sun size={20} />
        )}
      </motion.div>
      
      <span className="theme-toggle-ripple"></span>
    </motion.button>
  );
};

export default ThemeToggle;