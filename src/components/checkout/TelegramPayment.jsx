import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TelegramPayment.css';

const TelegramPayment = ({ totalAmount, onPaymentComplete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode] = useState(`AURA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      setIsModalOpen(false);
      setIsSuccess(false);
    }
  };

  const handlePaymentConfirm = () => {
    setIsLoading(true);
    
    // Имитация обработки оплаты
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Закрываем модалку через 1.5 секунды и вызываем callback
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      }, 1500);
    }, 2500);
  };

  // Генерация случайного кода для отображения
  const displayCode = orderCode;

  return (
    <>
      {/* Кнопка оплаты */}
      <div className="telegram-payment">
        <button
          className="btn telegram-btn payment-btn"
          onClick={handleOpenModal}
        >
          <span className="telegram-icon">✈️</span>
          Оплатить через Telegram
        </button>
        <p className="payment-hint">
          Нажмите для оплаты через Telegram бот
        </p>
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={handleCloseModal}
                disabled={isLoading}
              >
                ✕
              </button>

              <div className="modal-header">
                <span className="modal-icon">✈️</span>
                <h2>Оплата через Telegram</h2>
              </div>

              <div className="modal-body">
                {isSuccess ? (
                  <motion.div 
                    className="success-state"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <div className="success-check">✅</div>
                    <h3>Оплата успешно подтверждена!</h3>
                    <p>Ваш заказ будет обработан в ближайшее время.</p>
                  </motion.div>
                ) : isLoading ? (
                  <div className="loading-state">
                    <div className="loading-spinner">
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                    </div>
                    <p>Обработка платежа...</p>
                  </div>
                ) : (
                  <>
                    <div className="payment-instructions">
                      <div className="instruction-step">
                        <span className="step-number">1</span>
                        <p>Перейдите в наш Telegram бот <strong>@AuraBot</strong></p>
                      </div>
                      <div className="instruction-step">
                        <span className="step-number">2</span>
                        <p>Введите код для подтверждения заказа:</p>
                      </div>
                      <div className="code-display">
                        <span className="code-label">Код заказа:</span>
                        <strong className="code-value">{displayCode}</strong>
                      </div>
                      <div className="instruction-step">
                        <span className="step-number">3</span>
                        <p>Сумма к оплате: <strong>{totalAmount} ₽</strong></p>
                      </div>
                      <div className="instruction-step">
                        <span className="step-number">4</span>
                        <p>После оплаты нажмите кнопку ниже</p>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary confirm-btn"
                      onClick={handlePaymentConfirm}
                    >
                      Я оплатил (Тест)
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TelegramPayment;