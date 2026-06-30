import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { name: 'Instagram', icon: '📸', url: '#' },
    { name: 'Telegram', icon: '✈️', url: '#' },
    { name: 'Pinterest', icon: '📌', url: '#' },
    { name: 'YouTube', icon: '▶️', url: '#' },
  ];

  return (
    <footer className={`footer ${theme}`}>
      <div className="container">
        <div className="footer-grid">
          {/* Колонка 1: Бренд */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="aura-circle">◉</div>
              <span className="logo-text">AURA</span>
            </Link>
            <p className="footer-description">
              Создай свою ауру с премиальными аксессуарами для дома и стиля жизни.
              Каждый товар — это энергия и гармония в вашем пространстве.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  className="footer-social-link"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Колонка 2: Каталог */}
          <div className="footer-column">
            <h4 className="footer-title">Каталог</h4>
            <ul className="footer-links">
              <li><Link to="/catalog?category=aromas">Ароматы</Link></li>
              <li><Link to="/catalog?category=decor">Декор</Link></li>
              <li><Link to="/catalog?category=accessories">Аксессуары</Link></li>
              <li><Link to="/catalog?category=lighting">Освещение</Link></li>
              <li><Link to="/catalog?category=plants">Plant-коллекция</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Информация */}
          <div className="footer-column">
            <h4 className="footer-title">Информация</h4>
            <ul className="footer-links">
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/delivery">Доставка</Link></li>
              <li><Link to="/returns">Возврат</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div className="footer-column">
            <h4 className="footer-title">Контакты</h4>
            <ul className="footer-contacts">
              <li>📧 info@aura-shop.ru</li>
              <li>📞 +7 (999) 123-45-67</li>
              <li>⏰ Пн-Пт: 10:00 - 20:00</li>
              <li>📍 Москва, ул. Ауры, д. 1</li>
            </ul>
            <div className="footer-payment">
              <span>💳</span>
              <span>🔒</span>
              <span>📱</span>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 AURA. Все права защищены.
          </p>
          <p className="footer-copyright">
            Сделано с ❤️ для создания уюта
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;