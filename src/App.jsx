import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Ленивая загрузка страниц для оптимизации
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));

// Компонент-обертка для ленивой загрузки
const PageWrapper = ({ children }) => (
  <Suspense fallback={
    <div className="page-loader">
      <LoadingSpinner size="large" text="Загрузка..." />
    </div>
  }>
    {children}
  </Suspense>
);

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                } />
                <Route path="/catalog" element={
                  <PageWrapper>
                    <Catalog />
                  </PageWrapper>
                } />
                <Route path="/product/:id" element={
                  <PageWrapper>
                    <ProductDetail />
                  </PageWrapper>
                } />
                <Route path="/cart" element={
                  <PageWrapper>
                    <Cart />
                  </PageWrapper>
                } />
                <Route path="/checkout" element={
                  <PageWrapper>
                    <Checkout />
                  </PageWrapper>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;