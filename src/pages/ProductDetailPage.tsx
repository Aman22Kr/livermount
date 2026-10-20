import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  Wrench,
  ShieldCheck,
  Check,
  RotateCcw,
  MapPin,
  Share2,
  Sparkles,
  ChevronRight,
  Info,
  Calendar,
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { BottomAdSection } from '../components/BottomAdSection';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, showToast } = useApp();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || 'Default');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'assembly'>('specs');
  const [pincode, setPincode] = useState('400050');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(
    'Delivery in 3-4 days to 400050. Free technician assembly included!'
  );

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<
    { id: string; author: string; rating: number; date: string; content: string }[]
  >([
    {
      id: 'rev-p1',
      author: 'Rajiv Sengupta',
      rating: 5,
      date: '14 Oct 2026',
      content: 'Superior finishing and timber grain. The technician came the next morning and assembled it in 30 minutes flat.',
    },
    {
      id: 'rev-p2',
      author: 'Kavita Menon',
      rating: 5,
      date: '02 Oct 2026',
      content: 'Exceeded my expectations! Sturdy, comfortable, and looks straight out of an interior designer lookbook.',
    },
  ]);

  // Update active image and add to recently viewed
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedColor(product.colors?.[0] || 'Default');
      addRecentlyViewed(product.id);
      window.scrollTo(0, 0);
    }
  }, [productId]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6 || isNaN(Number(pincode))) {
      setPincodeStatus('Please enter a valid 6-digit Indian postal code');
      return;
    }
    const days = (Number(pincode[0]) % 3) + 3;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + days);
    const dateStr = estDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    setPincodeStatus(`Estimated Delivery by ${dateStr}. Free assembly within 24 hours of delivery!`);
    showToast(`Pincode ${pincode} serviceable for free delivery & assembly`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, product.finish);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, product.finish);
    navigate('/cart');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) {
      showToast('Please fill out name and review content', 'error');
      return;
    }
    const newEntry = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      content: newReviewText.trim(),
    };
    setLocalReviews([newEntry, ...localReviews]);
    setNewReviewAuthor('');
    setNewReviewText('');
    showToast('Thank you! Your verified review has been published.');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs text-stone-500">
          <nav className="flex items-center gap-1.5 overflow-hidden">
            <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link to={`/category/${product.category}`} className="hover:text-stone-900 transition-colors whitespace-nowrap">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-stone-900 font-semibold truncate">{product.name}</span>
          </nav>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-stone-600 hover:text-stone-900 text-xs font-medium ml-4 shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* 2. Main PDP Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery & Specifications (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#ff5f15] text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                  {product.discount}% OFF
                </div>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-stone-700 hover:bg-white'
                } shadow-md`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-[#ff5f15] shadow-md ring-2 ring-[#ff5f15]/20'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances Badge Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-stone-200/80 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-[#ff5f15] mb-1" />
                <span className="text-xs font-bold text-stone-900">{product.warranty}</span>
                <span className="text-[10px] text-stone-500">Official Brand Guarantee</span>
              </div>
              <div className="flex flex-col items-center border-x border-stone-100">
                <Truck className="w-5 h-5 text-[#ff5f15] mb-1" />
                <span className="text-xs font-bold text-stone-900">Free Safe Delivery</span>
                <span className="text-[10px] text-stone-500">Multi-layer Corrugated Box</span>
              </div>
              <div className="flex flex-col items-center">
                <Wrench className="w-5 h-5 text-[#ff5f15] mb-1" />
                <span className="text-xs font-bold text-stone-900">Free Assembly</span>
                <span className="text-[10px] text-stone-500">Trained In-House Carpenters</span>
              </div>
            </div>

            {/* Tabs: Specifications & Dimensions */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
              <div className="flex items-center gap-6 border-b border-stone-200 pb-3 mb-6 text-xs sm:text-sm font-semibold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-[#ff5f15] text-[#ff5f15]'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Product Details & Specs
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'care'
                      ? 'border-[#ff5f15] text-[#ff5f15]'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Materials & Care
                </button>
                <button
                  onClick={() => setActiveTab('assembly')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'assembly'
                      ? 'border-[#ff5f15] text-[#ff5f15]'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Assembly & Delivery
                </button>
              </div>

              {activeTab === 'specs' && (
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">Dimensions</span>
                    <span className="text-stone-900 font-semibold">{product.dimensions}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">Primary Material</span>
                    <span className="text-stone-900 font-semibold">{product.material}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">Finish / Polish</span>
                    <span className="text-stone-900 font-semibold">{product.finish}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">Weight</span>
                    <span className="text-stone-900 font-semibold">{product.weight}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2 border-b border-stone-100">
                    <span className="text-stone-500 font-medium">SKU / Item Code</span>
                    <span className="text-stone-900 font-mono text-xs">{product.sku}</span>
                  </div>

                  <div className="pt-2">
                    <span className="block font-semibold text-stone-900 mb-2">Key Highlights:</span>
                    <ul className="space-y-1.5 list-disc list-inside text-stone-600">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  <p>
                    • Use a soft dry microfiber cloth for routine dusting. Avoid harsh abrasive cleaners, chemical polishes, or chlorine.
                  </p>
                  <p>
                    • Always use coasters, trivets, or placemats under hot beverage cups or plates to prevent temperature shock rings on timber wax.
                  </p>
                  <p>
                    • Keep natural wood pieces away from prolonged direct exposure to intense outdoor sunlight or damp air vents to preserve moisture equilibrium.
                  </p>
                </div>
              )}

              {activeTab === 'assembly' && (
                <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  <p>
                    • <strong className="text-stone-900">100% Free Technician Assembly:</strong> This product requires knock-down assembly which is done completely free of charge by our authorized carpenter crew within 24 to 48 hours of doorstep delivery.
                  </p>
                  <p>
                    • The delivery team will inspect outer packaging upon delivery and our technician will bring all professional assembly tools, alignment levels, and felt scratch pads.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-7 shadow-sm space-y-6">
              {/* Brand & Title */}
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#ff5f15]">
                  {product.brand}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 leading-snug">
                  {product.name}
                </h1>

                {/* Rating badge */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded text-amber-700 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    Based on {product.reviewsCount} customer reviews
                  </span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/60">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {product.discount}% OFF
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Inclusive of all GST taxes · Free doorstep shipping & free assembly
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-medium">No Cost EMI from:</span>
                  <span className="text-stone-900 font-bold tabular-nums">
                    ₹{Math.round(product.price / 6).toLocaleString('en-IN')}/mo (6 Months)
                  </span>
                </div>
              </div>

              {/* Color / Finish Variants */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-2">
                    Selected Color / Tone: <span className="text-[#ff5f15]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedColor === c
                            ? 'bg-[#ff5f15]/10 border-[#ff5f15] text-[#ff5f15] font-bold shadow-sm'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pincode Delivery Checker */}
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1.5">
                  Check Delivery & Assembly
                </label>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit Pincode"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#ff5f15]"
                    />
                    <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="text-xs text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pincodeStatus}</span>
                  </p>
                )}
              </div>

              {/* Quantity Stepper & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-900">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden text-xs font-semibold">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 hover:bg-stone-100 text-stone-700"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-stone-900 tabular-nums">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 hover:bg-stone-100 text-stone-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-[#ff5f15] hover:bg-[#e04f0d] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Bank Offers Callout */}
              <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Bank & Festive Offers
                </div>
                <p className="text-stone-700">
                  • <strong>Code LIVERMOUNT10:</strong> Extra 10% instant discount up to ₹3,500 at checkout.
                </p>
                <p className="text-stone-700">
                  • Flat ₹2,500 Instant Cashback on HDFC, ICICI & Axis Bank Credit Cards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Customer Reviews Section */}
        <section className="mt-14 pt-10 border-t border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Customer Reviews & Experiences
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Read authentic testimonials from homes with this exact design
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-900">{product.rating} out of 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {localReviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{rev.author}</span>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{rev.content}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Share Your Experience</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Your Rating</label>
                  <div className="flex gap-1 text-amber-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Shalini Roy"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Review</label>
                  <textarea
                    rows={3}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Tell other homeowners about timber finish, comfort, and delivery..."
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Submit Verified Review
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 4. Related / Frequently Paired Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-14 pt-10 border-t border-stone-200">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mb-6">
              Customers Also Explored
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
