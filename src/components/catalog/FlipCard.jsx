import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import SaleBadge from '../common/SaleBadge';
import './FlipCard.css';

const FlipCard = ({ product }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div 
      className="flip-card"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ 
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      style={{ perspective: 1000 }}
    >
      {/* Передняя сторона */}
      <div className="flip-card-front">
        <div className="flip-card-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name} 
            className="flip-card-image"
            loading="lazy"
          />
          <SaleBadge product={product} />
          {product.isNew && (
            <span className="flip-card-badge new">✨ Новинка</span>
          )}
        </div>
        <div className="flip-card-content">
          <h3 className="flip-card-name">{product.name}</h3>
          <div className="flip-card-rating">
            ⭐ {product.rating} ({product.reviews})
          </div>
          <div className="flip-card-price">
            {product.price} ₽
            {product.oldPrice && (
              <span className="flip-card-old-price">{product.oldPrice} ₽</span>
            )}
          </div>
          <span className="flip-card-hint">👆 Наведи для деталей</span>
        </div>
      </div>

      {/* Задняя сторона */}
      <div className="flip-card-back">
        <div className="flip-card-back-content">
          <h3 className="flip-card-back-name">{product.name}</h3>
          <p className="flip-card-description">{product.description}</p>
          
          <div className="flip-card-tags">
            {product.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="flip-card-tag">#{tag}</span>
            ))}
          </div>

          <div className="flip-card-actions">
            <Link to={`/product/${product.id}`} className="flip-card-link">
              Подробнее →
            </Link>
            <button 
              className="flip-card-add-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? '🛒 В корзину' : 'Нет в наличии'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlipCard;