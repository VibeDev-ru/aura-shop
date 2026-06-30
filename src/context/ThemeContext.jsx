import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст
const ThemeContext = createContext();

// Хук для использования темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  // Получаем сохраненную тему или системную тему
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('aura-theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Проверяем системную тему
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Переключение темы
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Сохраняем тему в localStorage и применяем к body
  useEffect(() => {
    localStorage.setItem('aura-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.style.backgroundColor = theme === 'light' ? '#F9F7F4' : '#0D0D0D';
  }, [theme]);

  // Слушаем изменение системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('aura-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;