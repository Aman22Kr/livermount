import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useApp();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all duration-200 flex flex-col h-full">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 block">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-[#ff5f15] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            {product.discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-red-50 text-red-500 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:bg-white hover:text-red-500 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Quick Add Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </Link>

      {/* Info Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium text-stone-600 tracking-wide uppercase text-[10px]">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-semibold text-stone-900 hover:text-[#ff5f15] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Subtext info */}
          <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">{product.material}</p>
        </div>

        {/* Pricing & Mobile Cart Button */}
        <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-stone-900 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Free Doorstep Delivery & Assembly</span>
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="sm:hidden p-2 rounded-lg bg-stone-900 text-white hover:bg-[#ff5f15] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
