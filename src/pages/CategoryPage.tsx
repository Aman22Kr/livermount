import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
  Star,
  Check,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, Product } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { BottomAdSection } from '../components/BottomAdSection';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  // Determine current category
  const currentCategory = categorySlug
    ? CATEGORIES.find((c) => c.slug === categorySlug)
    : null;

  // Filters State
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(3);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      if (currentCategory && item.category !== currentCategory.id) {
        return false;
      }
      // Price
      if (item.price > maxPrice) return false;
      // Rating
      if (minRating > 0 && item.rating < minRating) return false;
      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) return false;
      // Material (rough substring match)
      if (selectedMaterials.length > 0) {
        const hasMaterial = selectedMaterials.some((mat) =>
          item.material.toLowerCase().includes(mat.toLowerCase())
        );
        if (!hasMaterial) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discount - a.discount;
      return 0; // recommended
    });
  }, [currentCategory, maxPrice, minRating, selectedBrands, selectedMaterials, sortBy]);

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedMaterials([]);
    setSelectedBrands([]);
    setMinRating(0);
    setMaxPrice(100000);
    setSortBy('recommended');
  };

  const hasActiveFilters =
    selectedMaterials.length > 0 ||
    selectedBrands.length > 0 ||
    minRating > 0 ||
    maxPrice < 100000;

  const title = currentCategory ? currentCategory.name : 'All Furniture & Home Decor';
  const subtitle = currentCategory
    ? currentCategory.description
    : 'Discover handcrafted solid wood creations, designer living solutions, and plush seating for your sanctuary.';

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* 1. Header Banner & Breadcrumbs */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-stone-900 transition-colors">Catalog</Link>
            {currentCategory && (
              <>
                <span>/</span>
                <span className="text-stone-900 font-semibold">{currentCategory.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">{subtitle}</p>
            </div>

            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
              Showing <span className="text-stone-900 font-bold">{filteredProducts.length}</span> curated pieces
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Content: Sidebar Filters & Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200/80 md:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#ff5f15]" />}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Filter Sidebar (Desktop) */}
          <aside className="hidden md:block space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff5f15]" /> Filters
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#ff5f15] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-2">
                  Max Price: <span className="tabular-nums text-[#ff5f15]">₹{maxPrice.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#ff5f15] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                  <span>₹5,000</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 mb-2.5">Material & Timber</h4>
                <div className="space-y-2">
                  {['Teak Wood', 'Sheesham', 'Fabric', 'Oak', 'Marble', 'Brass'].map((mat) => (
                    <label
                      key={mat}
                      className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer hover:text-stone-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="rounded border-stone-300 text-[#ff5f15] focus:ring-[#ff5f15] accent-[#ff5f15]"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 mb-2.5">Brand / Studio</h4>
                <div className="space-y-2">
                  {['LiverMount Studio', 'LiverMount Artisan', 'Nirvana Woodworks', 'Amber Craft'].map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer hover:text-stone-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-stone-300 text-[#ff5f15] focus:ring-[#ff5f15] accent-[#ff5f15]"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 mb-2.5">Minimum Customer Rating</h4>
                <div className="space-y-1.5">
                  {[4.5, 4.0, 0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        minRating === rating
                          ? 'bg-[#ff5f15]/10 text-[#ff5f15] font-bold'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {rating > 0 ? (
                          <>
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{rating} & above</span>
                          </>
                        ) : (
                          <span>All Ratings</span>
                        )}
                      </div>
                      {minRating === rating && <Check className="w-3.5 h-3.5 text-[#ff5f15]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="md:col-span-3">
            {/* Desktop Sort & Grid Mode controls */}
            <div className="hidden md:flex items-center justify-between pb-4 mb-6 border-b border-stone-200/80">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#ff5f15]"
                >
                  <option value="recommended">Recommended & Trending</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="discount">Biggest Discount (%)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setColumns(3)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    columns === 3 ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-300'
                  }`}
                  aria-label="3 Columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setColumns(4)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    columns === 4 ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-300'
                  }`}
                  aria-label="4 Columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products List */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-6`}
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">No pieces match your filters</h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
                  Try adjusting the maximum price or removing some material/brand constraints to see more options.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#ff5f15] text-white text-xs font-semibold rounded-xl hover:bg-[#e04f0d] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-sm font-bold text-stone-900">Filter Pieces</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-2">
                  Max Price: ₹{maxPrice.toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#ff5f15]"
                />
              </div>

              {/* Material */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 mb-2">Material</h4>
                <div className="space-y-2">
                  {['Teak Wood', 'Sheesham', 'Fabric', 'Oak', 'Marble', 'Brass'].map((mat) => (
                    <label key={mat} className="flex items-center gap-2 text-xs text-stone-700">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="accent-[#ff5f15]"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#ff5f15] text-white text-xs font-semibold rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
