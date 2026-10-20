import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { BottomAdSection } from '../components/BottomAdSection';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const matchedProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Search Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Search Results</span>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight mt-0.5">
                {query ? `Results for "${query}"` : 'All Products'}
              </h1>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              Found <strong className="text-stone-900">{matchedProducts.length}</strong> items
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {matchedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">No matching pieces found</h2>
            <p className="text-xs sm:text-sm text-stone-500">
              We couldn't find anything matching "{query}". Try searching for broader terms like "sofa", "bed", "teak", or "dining".
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ff5f15] hover:bg-[#e04f0d] text-white text-xs font-semibold rounded-xl transition-colors shadow-md"
              >
                Browse All Furniture <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
