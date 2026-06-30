import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import TelegramPayment from '../components/checkout/TelegramPayment';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const totalPrice = getTotalPrice();
  const deliveryPrice = totalPrice > 3000 ? 0 : 350;
  const finalPrice = totalPrice + deliveryPrice;

  // Проверка наличия товаров в корзине
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderComplete]);

  // Обработчик отправки заказа
  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);
    
    // Имитация отправки на сервер
    setTimeout(() => {
      const order = {
        id: `AURA-${Date.now()}`,
        items: cartItems,
        total: finalPrice,
        delivery: deliveryPrice,
        customer: formData,
        date: new Date().toISOString()
      };
      
      setOrderData(order);
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  // Если корзина пуста
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h2>Корзина пуста</h2>
            <p>Добавьте товары, чтобы оформить заказ</p>
            <Link to="/catalog" className="btn btn-primary">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Заголовок */}
        <motion.div 
          className="checkout-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="checkout-title">Оформление заказа</h1>
          <p className="checkout-subtitle">
            Заполните форму и оплатите через Telegram
          </p>
        </motion.div>

        {orderComplete ? (
          /* Страница успеха */
          <motion.div 
            className="checkout-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="success-icon">🎉</div>
            <h2>Заказ успешно оформлен!</h2>
            <p className="success-message">
              Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.
            </p>
            {orderData && (
              <div className="order-details">
                <div className="order-number">
                  <span>Номер заказа:</span>
                  <strong>{orderData.id}</strong>
                </div>
                <div className="order-total">
                  <span>Сумма:</span>
                  <strong>{orderData.total} ₽</strong>
                </div>
              </div>
            )}
            <div className="success-actions">
              <Link to="/" className="btn btn-primary">
                На главную
              </Link>
              <Link to="/catalog" className="btn btn-secondary">
                Продолжить покупки
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Форма оформления */
          <div className="checkout-grid">
            {/* Левая колонка - форма */}
            <motion.div 
              className="checkout-form-wrapper"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CheckoutForm 
                onSubmit={handleOrderSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>

            {/* Правая колонка - сводка и оплата */}
            <motion.div 
              className="checkout-summary-wrapper"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="checkout-summary">
                <h3>Ваш заказ</h3>
                
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item-info">
                        <span className="summary-item-name">{item.name}</span>
                        <span className="summary-item-quantity">×{item.quantity}</span>
                      </div>
                      <span className="summary-item-price">
                        {item.price * item.quantity} ₽
                      </span>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row">
                  <span>Товары</span>
                  <span>{totalPrice} ₽</span>
                </div>
                <div className="summary-row">
                  <span>Доставка</span>
                  <span className={deliveryPrice === 0 ? 'free' : ''}>
                    {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Итого</span>
                  <span className="total-price">{finalPrice} ₽</span>
                </div>

                {/* Telegram оплата */}
                <TelegramPayment 
                  totalAmount={finalPrice}
                  onPaymentComplete={() => {
                    // После успешной оплаты отправляем форму
                    const form = document.querySelector('form');
                    if (form) {
                      form.dispatchEvent(new Event('submit'));
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;