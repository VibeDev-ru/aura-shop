import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalItems, getTotalPrice, clearCart } = useCart();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const deliveryPrice = totalPrice > 3000 ? 0 : 350;
  const finalPrice = totalPrice + deliveryPrice;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      clearCart();
    }
  };

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        {/* Заголовок */}
        <motion.div 
          className="cart-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="cart-title">Корзина</h1>
          {cartItems.length > 0 && (
            <span className="cart-count">{totalItems} товаров</span>
          )}
        </motion.div>

        {cartItems.length === 0 ? (
          /* Пустая корзина */
          <motion.div 
            className="cart-empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-icon">🛒</div>
            <h2>Корзина пуста</h2>
            <p>Добавьте товары, чтобы создать свою идеальную ауру</p>
            <Link to="/catalog" className="btn btn-primary">
              Перейти в каталог
            </Link>
          </motion.div>
        ) : (
          /* Корзина с товарами */
          <div className="cart-content">
            <div className="cart-grid">
              {/* Список товаров */}
              <motion.div 
                className="cart-items"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Заголовок списка */}
                <div className="cart-items-header">
                  <span className="header-product">Товар</span>
                  <span className="header-price">Цена</span>
                  <span className="header-quantity">Количество</span>
                  <span className="header-total">Итого</span>
                  <span className="header-action"></span>
                </div>

                {/* Товары */}
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      exit={{ 
                        x: -100, 
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                      layout
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Действия с корзиной */}
                <div className="cart-actions">
                  <Link to="/catalog" className="btn btn-secondary">
                    ← Продолжить покупки
                  </Link>
                  <button 
                    className="btn btn-outline"
                    onClick={handleClearCart}
                  >
                    Очистить корзину
                  </button>
                </div>
              </motion.div>

              {/* Сводка заказа */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="cart-summary-wrapper"
              >
                <CartSummary
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                  deliveryPrice={deliveryPrice}
                  finalPrice={finalPrice}
                  onCheckout={handleCheckout}
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;