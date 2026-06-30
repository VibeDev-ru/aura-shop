import React from 'react';
import { motion } from 'framer-motion';
import './CartSummary.css';

const CartSummary = ({ 
  totalItems, 
  totalPrice, 
  deliveryPrice, 
  finalPrice, 
  onCheckout 
}) => {
  return (
    <motion.div 
      className="cart-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="summary-title">Итого</h3>
      
      <div className="summary-row">
        <span>Товары ({totalItems})</span>
        <span>{totalPrice} ₽</span>
      </div>
      
      <div className="summary-row">
        <span>Доставка</span>
        <span className={deliveryPrice === 0 ? 'free-delivery' : ''}>
          {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}
        </span>
      </div>

      {deliveryPrice > 0 && (
        <div className="summary-hint">
          🚚 Бесплатная доставка при заказе от 3000 ₽
        </div>
      )}
      
      <div className="summary-divider"></div>
      
      <div className="summary-total">
        <span>К оплате</span>
        <span className="total-price">{finalPrice} ₽</span>
      </div>

      <button 
        className="btn btn-primary checkout-btn"
        onClick={onCheckout}
        disabled={totalItems === 0}
      >
        Оформить заказ →
      </button>

      <p className="summary-security">
        🔒 Безопасная оплата через Telegram
      </p>
    </motion.div>
  );
};

export default CartSummary;