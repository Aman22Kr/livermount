import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { StudiosPage } from './pages/StudiosPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { AccountPage } from './pages/AccountPage';
import { SearchPage } from './pages/SearchPage';
import { OffersPage } from './pages/OffersPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search]);

  return null;
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#ff5f15]/20 selection:text-[#ff5f15]">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<CategoryPage />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/studios" element={<StudiosPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
