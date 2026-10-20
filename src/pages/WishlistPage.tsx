import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { BottomAdSection } from '../components/BottomAdSection';

export const WishlistPage: React.FC = () => {
  const { wishlist, addToCart, toggleWishlist } = useApp();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, 1);
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#ff5f15] fill-[#ff5f15]" />
              My Saved Wishlist ({wishlistedProducts.length} Items)
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Your favorite furniture and decor pieces saved across sessions
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Move All to Cart
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">Your Wishlist is Empty</h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Save pieces you love while browsing to compare finishes, check prices, or purchase later.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ff5f15] hover:bg-[#e04f0d] text-white text-xs font-semibold rounded-xl transition-colors shadow-md"
              >
                Explore Furniture <ArrowRight className="w-4 h-4" />
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
