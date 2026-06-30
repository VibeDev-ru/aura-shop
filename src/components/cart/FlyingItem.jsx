import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlyingItem = ({ product, onComplete }) => {
  if (!product) return null;

  // Получаем позицию корзины
  const cartIcon = document.querySelector('.cart-icon-wrapper');
  const cartRect = cartIcon?.getBoundingClientRect();
  
  // Стартовая позиция - центр экрана
  const startX = window.innerWidth / 2 - 50;
  const startY = window.innerHeight / 2 - 50;

  return (
    <AnimatePresence>
      <motion.div
        className="flying-item"
        initial={{ 
          x: startX, 
          y: startY,
          scale: 1,
          opacity: 1,
          rotate: 0
        }}
        animate={{ 
          x: cartRect?.left || 0,
          y: cartRect?.top || 0,
          scale: 0.2,
          opacity: 0,
          rotate: 360
        }}
        transition={{ 
          duration: 0.8,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100
        }}
        onAnimationComplete={onComplete}
      >
        <div className="flying-item-content">
          <img src={product.image} alt={product.name} />
          <span className="flying-item-price">+{product.price} ₽</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlyingItem;