import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { Icons } from '../../assets/icons';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const totalItems = getTotalItems();

  const navLinks = [
    { to: '/catalog', label: 'Каталог' },
    { to: '/catalog?category=aromas', label: 'Ароматы' },
    { to: '/catalog?category=decor', label: 'Декор' },
    { to: '/about', label: 'О нас' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${theme}`}>
      <div className="container header-container">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          <div className="aura-circle">◉</div>
          <span className="logo-text">AURA</span>
        </Link>

        <nav className="header-nav hide-mobile">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="header-link" onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button 
            className="header-search hide-mobile"
            onClick={() => navigate('/catalog')}
            aria-label="Поиск"
          >
            <Icons.search size={20} />
          </button>

          <CartIcon count={totalItems} />
          <ThemeToggle />

          <button 
            className="header-burger show-mobile"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="header-mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container">
            <nav className="mobile-nav">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="mobile-link" onClick={closeMenu}>
                  {link.label}
                </Link>
              ))}
              <Link to="/cart" className="mobile-link" onClick={closeMenu}>
                Корзина ({totalItems})
              </Link>
              <div className="mobile-search">
                <input 
                  type="text" 
                  placeholder="Поиск товаров..." 
                  className="mobile-search-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      navigate('/catalog');
                      closeMenu();
                    }
                  }}
                />
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;