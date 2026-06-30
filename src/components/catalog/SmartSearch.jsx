import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from 'react-use';
import { Icons } from '../../assets/icons';
import './SmartSearch.css';

const SmartSearch = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Дебаунс для поиска
  useDebounce(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setSuggestions(filtered.slice(0, 8));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, 300, [searchTerm]);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Клавиатурная навигация
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        const selected = suggestions[selectedIndex];
        if (selected) {
          onSearch(selected.name);
          setSearchTerm(selected.name);
          setIsOpen(false);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [suggestions, selectedIndex, onSearch]);

  const handleSelect = (product) => {
    setSearchTerm(product.name);
    setIsOpen(false);
    onSearch(product.name);
  };

  return (
    <div className="smart-search" ref={searchRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="smart-search-input"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setSuggestions.length > 0 && setIsOpen(true)}
        />
        {searchTerm && (
          <button 
            className="search-clear"
            onClick={() => {
              setSearchTerm('');
              setSuggestions([]);
              setIsOpen(false);
            }}
          >
            ✕
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div 
            className="search-suggestions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((product, index) => (
              <motion.div
                key={product.id}
                className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => handleSelect(product)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.1 }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="suggestion-image"
                  loading="lazy"
                />
                <div className="suggestion-info">
                  <span className="suggestion-name">{product.name}</span>
                  <span className="suggestion-price">{product.price} ₽</span>
                </div>
                <span className="suggestion-category">{product.category}</span>
              </motion.div>
            ))}
            
            <Link 
              to={`/catalog?search=${encodeURIComponent(searchTerm)}`}
              className="suggestion-view-all"
              onClick={() => {
                onSearch(searchTerm);
                setIsOpen(false);
              }}
            >
              <Icons.arrowRight size={16} />
              Все результаты ({suggestions.length})
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearch;