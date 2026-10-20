import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';
import { BottomAdSection } from '../components/BottomAdSection';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between">
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-5 my-auto">
        <span className="text-6xl sm:text-7xl font-extrabold text-[#ff5f15] font-mono block">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
          The furniture piece or room page you are looking for may have been moved, renamed, or is temporarily out of stock.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Home className="w-3.5 h-3.5" /> Return to Homepage
          </Link>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-[#ff5f15] hover:bg-[#e04f0d] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <BottomAdSection />
    </div>
  );
};
