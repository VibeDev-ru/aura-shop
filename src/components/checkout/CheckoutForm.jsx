import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CheckoutForm.css';

const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\d\s-+()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес доставки';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Удаляем ошибку при вводе
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
      // Прокрутка к первому полю с ошибкой
      const firstError = document.querySelector('.form-input.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4
      }
    })
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Контактная информация</h3>
      
      <motion.div 
        className="form-group"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={inputVariants}
      >
        <label className="form-label" htmlFor="name">
          Имя *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="Введите ваше имя"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span className="form-error">{errors.name}</span>
        )}
      </motion.div>

      <motion.div 
        className="form-group"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={inputVariants}
      >
        <label className="form-label" htmlFor="phone">
          Телефон *
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className={`form-input ${errors.phone ? 'error' : ''}`}
          placeholder="+7 (999) 123-45-67"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <span className="form-error">{errors.phone}</span>
        )}
      </motion.div>

      <motion.div 
        className="form-group"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={inputVariants}
      >
        <label className="form-label" htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="example@mail.ru"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.email && (
          <span className="form-error">{errors.email}</span>
        )}
      </motion.div>

      <motion.div 
        className="form-group"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={inputVariants}
      >
        <label className="form-label" htmlFor="address">
          Адрес доставки *
        </label>
        <input
          id="address"
          type="text"
          name="address"
          className={`form-input ${errors.address ? 'error' : ''}`}
          placeholder="Город, улица, дом, квартира"
          value={formData.address}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.address && (
          <span className="form-error">{errors.address}</span>
        )}
      </motion.div>

      <motion.div 
        className="form-group"
        custom={4}
        initial="hidden"
        animate="visible"
        variants={inputVariants}
      >
        <label className="form-label" htmlFor="comment">
          Комментарий к заказу
        </label>
        <textarea
          id="comment"
          name="comment"
          className="form-textarea"
          placeholder="Дополнительные пожелания..."
          value={formData.comment}
          onChange={handleChange}
          rows="3"
          disabled={isSubmitting}
        />
      </motion.div>

      <div className="form-footer">
        <p className="form-required">* Поля обязательны для заполнения</p>
      </div>
    </form>
  );
};

export default CheckoutForm;