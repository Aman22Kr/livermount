import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  MapPin,
  Menu,
  X,
  Phone,
  Truck,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Clock,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockData';

export const Navbar: React.FC = () => {
  const { cartItemsCount, wishlist, searchHistory, addSearchQuery, clearSearchHistory } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    addSearchQuery(searchQuery);
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSearchSuggestionClick = (query: string) => {
    setSearchQuery(query);
    addSearchQuery(query);
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Live matching products
  const matchingProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-200">
      {/* 1. Top Utility Header */}
      <div className="bg-[#242424] text-stone-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#ff7d42] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Festive Home Days: Up to 60% Off + Free Assembly
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-stone-300">
            <Link to="/studios" className="hover:text-white flex items-center gap-1 transition-colors">
              <MapPin className="w-3 h-3 text-[#ff5f15]" />
              Find a Studio (100+)
            </Link>
            <span className="text-stone-600" aria-hidden="true">|</span>
            <Link to="/track-order" className="hover:text-white flex items-center gap-1 transition-colors">
              <Truck className="w-3 h-3 text-[#ff5f15]" />
              Track Order
            </Link>
            <span className="text-stone-600" aria-hidden="true">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact & Support
            </Link>
            <span className="text-stone-600" aria-hidden="true">|</span>
            <a href="tel:18004196666" className="hover:text-white flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3" />
              1800-419-6666
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile Menu Button & Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="md:hidden p-1.5 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-1.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-[#ff5f15] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-[#e04f0d] transition-colors">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-stone-900 flex items-baseline">
                Liver<span className="text-[#ff5f15]">Mount</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold -mt-1 hidden sm:block">
                Inspiring Living
              </span>
            </div>
          </Link>
        </div>

        {/* Global Live Search Bar */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search sofas, solid teak beds, dining sets, lamps..."
              className="w-full pl-10 pr-10 py-2.5 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 rounded-full border border-stone-200/80 focus:border-[#ff5f15] focus:outline-none focus:ring-2 focus:ring-[#ff5f15]/20 transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Live Search Popup */}
          {searchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-50 p-4">
              {searchQuery.trim() ? (
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    Matching Products
                  </div>
                  {matchingProducts.length > 0 ? (
                    <div className="divide-y divide-stone-100 mb-3">
                      {matchingProducts.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 py-2 px-1 hover:bg-stone-50 rounded-lg transition-colors group"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-md bg-stone-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-stone-900 truncate group-hover:text-[#ff5f15]">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-stone-500 font-semibold tabular-nums">
                              ₹{p.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#ff5f15] shrink-0" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-xs text-stone-500">
                      No exact product match found for "{searchQuery}". Press Enter to view all results.
                    </div>
                  )}

                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2 bg-stone-100 hover:bg-[#ff5f15] hover:text-white text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    View all results for "{searchQuery}" <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div>
                  {searchHistory.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Recent Searches
                        </span>
                        <button
                          onClick={clearSearchHistory}
                          className="text-stone-400 hover:text-red-500 flex items-center gap-1 lowercase text-[11px]"
                        >
                          <Trash2 className="w-3 h-3" /> clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {searchHistory.map((term, i) => (
                          <button
                            key={i}
                            onClick={() => handleSearchSuggestionClick(term)}
                            className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                      Popular Categories
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.slice(0, 4).map((c) => (
                        <Link
                          key={c.id}
                          to={`/category/${c.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-stone-50 text-xs font-medium text-stone-700 hover:text-[#ff5f15] transition-colors"
                        >
                          <div className="w-6 h-6 rounded bg-[#ff5f15]/10 text-[#ff5f15] flex items-center justify-center text-[10px] font-bold shrink-0">
                            {c.name.slice(0, 1)}
                          </div>
                          <span className="truncate">{c.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons: Studios, Wishlist, Cart, Account */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            to="/studios"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 hover:text-[#ff5f15] hover:bg-stone-100 transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#ff5f15]" />
            <span>Studios</span>
          </Link>

          <Link
            to="/wishlist"
            className="relative p-2 text-stone-700 hover:text-[#ff5f15] hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff5f15] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 p-2 text-stone-700 hover:text-[#ff5f15] hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </Link>

          <Link
            to="/account"
            className="p-2 text-stone-700 hover:text-[#ff5f15] hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* 3. Category Bar (Mega-Menu Links) */}
      <nav className="hidden md:block bg-stone-50/70 border-t border-stone-200/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1 overflow-x-auto py-2 text-xs font-semibold text-stone-700">
          <Link
            to="/products"
            className="px-3 py-1 hover:text-[#ff5f15] transition-colors whitespace-nowrap shrink-0"
          >
            All Products
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="px-3 py-1 hover:text-[#ff5f15] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 group"
            >
              <span>{cat.name}</span>
            </Link>
          ))}
          <Link
            to="/studios"
            className="px-3 py-1 text-stone-700 hover:text-[#ff5f15] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-[#ff5f15]" />
            <span>Studio LiverMount</span>
          </Link>
          <Link
            to="/offers"
            className="px-3 py-1 text-[#ff5f15] hover:text-[#d94b0d] font-bold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festive Deals</span>
          </Link>
        </div>
      </nav>

      {/* 4. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-7 h-7 rounded bg-[#ff5f15] text-white flex items-center justify-center font-bold">
                    L
                  </div>
                  <span className="font-extrabold text-stone-900 text-lg">
                    Liver<span className="text-[#ff5f15]">Mount</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category List */}
              <div className="py-4 space-y-1">
                <div className="text-[11px] uppercase font-bold text-stone-400 tracking-wider mb-2">
                  Shop By Category
                </div>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
                >
                  Explore All Furniture
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-[#ff5f15]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Utility Links */}
              <div className="py-4 border-t border-stone-100 space-y-2 text-sm text-stone-700 font-medium">
                <div className="text-[11px] uppercase font-bold text-stone-400 tracking-wider mb-2">
                  Customer Services
                </div>
                <Link
                  to="/studios"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-stone-50"
                >
                  <MapPin className="w-4 h-4 text-[#ff5f15]" />
                  Find a Studio Near You
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-stone-50"
                >
                  <Truck className="w-4 h-4 text-[#ff5f15]" />
                  Track Your Order
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 rounded-lg hover:bg-stone-50"
                >
                  About LiverMount Craft
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 rounded-lg hover:bg-stone-50"
                >
                  Help & FAQs
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 rounded-lg hover:bg-stone-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <a
                href="tel:18004196666"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Toll-Free: 1800-419-6666
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
