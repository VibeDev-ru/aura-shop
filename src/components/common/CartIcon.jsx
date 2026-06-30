import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../../assets/icons';
import './CartIcon.css';

const CartIcon = ({ count = 0 }) => {
  return (
    <Link to="/cart" className="cart-icon-wrapper" aria-label="Корзина">
      <div className="cart-icon">
        <Icons.cart size={22} />
        
        <AnimatePresence mode="wait">
          {count > 0 && (
            <motion.span
              key={count}
              className="cart-badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 15,
                duration: 0.3
              }}
            >
              {count > 99 ? '99+' : count}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};

export default CartIcon;