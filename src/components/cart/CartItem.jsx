import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (delta) => {
    updateQuantity(item.id, item.quantity + delta);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <motion.div 
      className="cart-item"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Изображение и название */}
      <div className="cart-item-product">
        <Link to={`/product/${item.id}`} className="cart-item-image">
          <img src={item.image} alt={item.name} loading="lazy" />
        </Link>
        <div className="cart-item-info">
          <Link to={`/product/${item.id}`} className="cart-item-name">
            {item.name}
          </Link>
          <span className="cart-item-category">{item.category}</span>
        </div>
      </div>

      {/* Цена */}
      <div className="cart-item-price">
        <span className="cart-item-price-value">{item.price} ₽</span>
      </div>

      {/* Количество */}
      <div className="cart-item-quantity">
        <div className="quantity-control">
          <button 
            className="qty-btn"
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
            aria-label="Уменьшить количество"
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button 
            className="qty-btn"
            onClick={() => handleQuantityChange(1)}
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
      </div>

      {/* Итого */}
      <div className="cart-item-total">
        <span className="cart-item-total-value">{itemTotal} ₽</span>
      </div>

      {/* Удалить */}
      <button 
        className="cart-item-remove"
        onClick={handleRemove}
        aria-label="Удалить товар"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default CartItem;