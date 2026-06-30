import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import productsData from '../assets/data/products.json';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Загрузка товара
  useEffect(() => {
    setIsLoading(true);
    // Имитация загрузки
    setTimeout(() => {
      const found = productsData.products.find(p => p.id === parseInt(id));
      if (found) {
        setProduct(found);
        // Похожие товары (из той же категории)
        const related = productsData.products
          .filter(p => p.id !== found.id && p.category === found.category)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        // Товар не найден - редирект на 404
        navigate('/catalog');
      }
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);

  // Обработчики
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Анимация кнопки
      const btn = document.querySelector('.add-to-cart-btn');
      if (btn) {
        btn.classList.add('added');
        setTimeout(() => btn.classList.remove('added'), 1500);
      }
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  if (isLoading) {
    return (
      <div className="product-detail-loading">
        <div className="container">
          <div className="loading-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images = product.images || [product.image];

  return (
    <div className="product-detail">
      <div className="container">
        {/* Хлебные крошки */}
        <motion.div 
          className="breadcrumbs"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/">Главная</Link>
          <span className="separator">/</span>
          <Link to="/catalog">Каталог</Link>
          <span className="separator">/</span>
          <span className="current">{product.category}</span>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </motion.div>

        <div className="product-detail-grid">
          {/* Галерея */}
          <motion.div 
            className="product-gallery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="main-image-wrapper">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="main-image"
              />
              {product.isNew && (
                <span className="product-badge">Новинка</span>
              )}
              {!product.inStock && (
                <span className="product-badge out-of-stock">Нет в наличии</span>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="thumbnails">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => handleImageChange(index)}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Информация о товаре */}
          <motion.div 
            className="product-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="product-meta">
              <span className="product-category">{product.category}</span>
              <div className="product-rating">
                ⭐ {product.rating} ({product.reviews} отзывов)
              </div>
            </div>

            <h1 className="product-name">{product.name}</h1>

            <div className="product-price-block">
              <span className="product-price">{product.price} ₽</span>
              {product.oldPrice && (
                <span className="product-old-price">{product.oldPrice} ₽</span>
              )}
            </div>

            <div className="product-status">
              <span className={`status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '✅ В наличии' : '❌ Нет в наличии'}
              </span>
            </div>

            <div className="product-description">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>

            {product.details && (
              <div className="product-details">
                <h3>Характеристики</h3>
                <div className="details-list">
                  {product.details.split('\n').map((detail, index) => (
                    <div key={index} className="detail-item">
                      <span className="detail-label">{detail.split(':')[0]}</span>
                      <span className="detail-value">{detail.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.tags && (
              <div className="product-tags">
                {product.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            )}

            {/* Управление количеством и добавление */}
            <div className="product-actions">
              <div className="quantity-control">
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>

              <button
                className={`btn btn-primary add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'В корзину' : 'Нет в наличии'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Похожие товары */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Похожие товары
            </motion.h2>

            <motion.div 
              className="related-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {relatedProducts.map((related) => (
                <motion.div
                  key={related.id}
                  className="related-card"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Link to={`/product/${related.id}`} className="related-image-wrapper">
                    <img 
                      src={related.image} 
                      alt={related.name}
                      className="related-image"
                      loading="lazy"
                    />
                  </Link>
                  <div className="related-info">
                    <Link to={`/product/${related.id}`} className="related-name">
                      {related.name}
                    </Link>
                    <div className="related-price">{related.price} ₽</div>
                    <button
                      className="btn btn-secondary related-add"
                      onClick={() => addToCart(related)}
                    >
                      В корзину
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;