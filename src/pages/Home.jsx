import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CategoryIcons, AdvantageIcons, Icons } from '../assets/icons';
import productsData from '../assets/data/products.json';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  const { products, categories, advantages } = productsData;

  const popularProducts = products.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Маппинг категорий на иконки
  const categoryIconMap = {
    'Ароматы': CategoryIcons.aromas,
    'Декор': CategoryIcons.decor,
    'Аксессуары': CategoryIcons.accessories,
    'Освещение': CategoryIcons.lighting,
    'Plant-коллекция': CategoryIcons.plants
  };

  // Маппинг преимуществ на иконки
  const advantageIconMap = {
    'Премиальное качество': AdvantageIcons.quality,
    'Бесплатная доставка': AdvantageIcons.delivery,
    '30 дней возврата': AdvantageIcons.returns,
    'Экотовары': AdvantageIcons.eco
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text"
            >
              <span className="hero-badge">
                <Icons.stars size={14} /> НОВАЯ КОЛЛЕКЦИЯ
              </span>
              <h1 className="hero-title">
                Создай свою<br />
                <span className="hero-highlight">Ауру</span>
              </h1>
              <p className="hero-description">
                Премиальные аксессуары для дома и стиля жизни. 
                Каждый товар — это энергия и гармония в вашем пространстве.
              </p>
              <div className="hero-buttons">
                <Link to="/catalog" className="btn btn-primary">
                  Узнать больше <Icons.arrowRight size={18} />
                </Link>
                <Link to="/catalog" className="btn btn-secondary">
                  Каталог
                </Link>
              </div>
            </motion.div>

            <div className="hero-floating">
              <motion.div
                className="floating-circle circle-1"
                animate={{
                  y: [-20, 20, -20],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="floating-circle circle-2"
                animate={{
                  y: [20, -20, 20],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="floating-circle circle-3"
                animate={{
                  y: [-10, 30, -10],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Категории
          </motion.h2>
          
          <motion.div 
            className="categories-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => {
              const IconComponent = categoryIconMap[category.name] || Icons.grid;
              return (
                <motion.div
                  key={category.id}
                  className="category-card"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Link to={`/catalog?category=${category.id}`} className="category-link">
                    <div className="category-icon">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="category-name">{category.name}</h3>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="popular-products">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Популярные товары</h2>
            <Link to="/catalog" className="view-all">
              Смотреть все <Icons.arrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="products-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {popularProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Link to={`/product/${product.id}`} className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  {product.isNew && (
                    <span className="product-badge">
                      <Icons.stars size={12} /> Новинка
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="product-sale">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  )}
                </Link>
                
                <div className="product-info">
                  <Link to={`/product/${product.id}`} className="product-name">
                    {product.name}
                  </Link>
                  <div className="product-rating">
                    <Icons.star size={14} fill="#FFB800" color="#FFB800" />
                    {product.rating} ({product.reviews})
                  </div>
                  <div className="product-prices">
                    <span className="product-price">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="product-old-price">{product.oldPrice} ₽</span>
                    )}
                  </div>
                  <button
                    className={`btn btn-primary add-to-cart ${!product.inStock ? 'disabled' : ''}`}
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'В корзину' : 'Нет в наличии'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="advantages">
        <div className="container">
          <motion.div 
            className="advantages-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {advantages.map((advantage) => {
              const IconComponent = advantageIconMap[advantage.title] || Icons.award;
              return (
                <motion.div
                  key={advantage.id}
                  className="advantage-card"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="advantage-icon">
                    <IconComponent size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="advantage-title">{advantage.title}</h3>
                  <p className="advantage-description">{advantage.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;