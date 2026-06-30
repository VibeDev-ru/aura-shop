import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import FlipCard from '../components/catalog/FlipCard';
import SmartSearch from '../components/catalog/SmartSearch';
import FlyingItem from '../components/cart/FlyingItem';
import productsData from '../assets/data/products.json';
import './Catalog.css';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { flyingItem, setFlyingItem } = useCart();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);

  const { categories } = productsData;

  // Загрузка товаров
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(productsData.products);
      setFilteredProducts(productsData.products);
      setIsLoading(false);
    }, 500);
  }, []);

  // Чтение параметров из URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const categoryMap = {
        'aromas': 'Ароматы',
        'decor': 'Декор',
        'accessories': 'Аксессуары',
        'lighting': 'Освещение',
        'plants': 'Plant-коллекция'
      };
      setSelectedCategory(categoryMap[categoryParam] || 'all');
    }
  }, [searchParams]);

  // Фильтрация и сортировка
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      const categoryMap = {
        'Ароматы': 'aromas',
        'Декор': 'decor',
        'Аксессуары': 'accessories',
        'Освещение': 'lighting',
        'Plant-коллекция': 'plants'
      };
      searchParams.set('category', categoryMap[category] || '');
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="catalog">
      <div className="container">
        {/* Летающий товар */}
        {flyingItem && (
          <FlyingItem 
            product={flyingItem} 
            onComplete={() => setFlyingItem(null)}
          />
        )}

        <motion.div 
          className="catalog-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="catalog-title">Каталог</h1>
          <p className="catalog-subtitle">
            {filteredProducts.length} товаров
          </p>
        </motion.div>

        {/* Умный поиск */}
        <div className="catalog-controls">
          <SmartSearch 
            products={products} 
            onSearch={handleSearch}
          />

          <div className="sort-wrapper">
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">По популярности</option>
              <option value="new">По новизне</option>
              <option value="price-asc">По цене (возрастание)</option>
              <option value="price-desc">По цене (убывание)</option>
            </select>
          </div>
        </div>

        {/* Категории */}
        <div className="categories-chips">
          <button
            className={`chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Все
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`chip ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Сетка товаров с Flip Cards */}
        {isLoading ? (
          <div className="catalog-loading">
            <div className="loading-spinner">
              <div className="spinner-dot"></div>
              <div className="spinner-dot"></div>
              <div className="spinner-dot"></div>
            </div>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <motion.div 
                className="catalog-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="empty-icon">🔍</span>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска</p>
              </motion.div>
            ) : (
              <motion.div 
                className="catalog-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={containerVariants}
                      layout
                    >
                      <FlipCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;