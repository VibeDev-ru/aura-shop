import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SaleBadge = ({ product }) => {
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(product.price);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // 30% шанс что товар участвует в акции
    const hasSale = Math.random() < 0.3;
    
    if (hasSale) {
      // Случайная скидка от 10% до 30%
      const discountPercent = Math.floor(Math.random() * 20) + 10;
      const newPrice = Math.floor(product.price * (1 - discountPercent / 100));
      
      setIsOnSale(true);
      setSalePrice(newPrice);
      setDiscount(discountPercent);
    }
  }, [product.id, product.price]);

  if (!isOnSale) return null;

  return (
    <motion.div 
      className="sale-badge"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 15,
        delay: 0.2
      }}
    >
      <div className="sale-badge-content">
        <span className="sale-discount">-{discount}%</span>
        <span className="sale-price">{salePrice} ₽</span>
        <span className="sale-old-price">{product.price} ₽</span>
      </div>
    </motion.div>
  );
};

export default SaleBadge;