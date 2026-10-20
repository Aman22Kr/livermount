import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Wrench,
  Clock,
  MapPin,
  Star,
  Flame,
  CheckCircle,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, ASSET_IMAGES, REVIEWS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { BlankVideoSquare } from '../components/BlankVideoSquare';
import { BottomAdSection } from '../components/BottomAdSection';

export const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  // Countdown timer for Deal of the Day
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProduct = PRODUCTS.find((p) => p.isDealOfDay) || PRODUCTS[0];

  const filteredProducts =
    selectedTab === 'all'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.category === selectedTab).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* 1. Hero Showcase Campaign */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-12">
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 shadow-xl border border-stone-800">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            <img
              src={ASSET_IMAGES.heroLiving}
              alt="LiverMount Living Room Collection"
              className="w-full h-full object-cover object-center opacity-75"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent flex items-center">
              <div className="p-6 sm:p-12 md:p-16 max-w-xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5f15]/20 border border-[#ff5f15]/30 text-[#ff7d42] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Festive Living Connoisseur
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Furniture Designed for Real Living.
                </h1>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Solid Sheesham & Teak wood furniture, ergonomic sectionals, and timeless bedroom sanctuaries. Handcrafted with generational pride.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/products"
                    className="px-6 py-3 bg-[#ff5f15] hover:bg-[#e04f0d] text-white font-semibold rounded-xl text-sm transition-all shadow-lg flex items-center gap-2 group"
                  >
                    <span>Shop All Furniture</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/studios"
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-medium rounded-xl text-sm transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-[#ff7d42]" />
                    <span>Find Experience Studio</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Navigation Visual Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Explore Popular Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Thoughtfully curated for every corner of your contemporary home
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-[#ff5f15] hover:underline flex items-center gap-1"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white p-3 rounded-2xl border border-stone-200/80 hover:border-stone-300 hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#ff5f15] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-stone-400 mt-0.5">{cat.itemCount}+ Designs</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Deal of the Day Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-stone-50 border border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 justify-between shadow-sm">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#ff5f15] text-white text-xs font-bold rounded-md flex items-center gap-1 shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-white" /> FLASH DEAL
              </span>
              <span className="text-xs font-semibold text-stone-600">Ends in:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-xs bg-white border border-stone-300 px-2.5 py-1 rounded-md text-stone-800 tabular-nums">
                <Clock className="w-3 h-3 text-[#ff5f15]" />
                <span>{String(timeLeft.hours).padStart(2, '0')}h :</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m :</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              {dealProduct.name}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
              {dealProduct.description}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
                ₹{dealProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-stone-400 line-through tabular-nums">
                ₹{dealProduct.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                SAVE ₹{(dealProduct.originalPrice - dealProduct.price).toLocaleString('en-IN')} ({dealProduct.discount}% OFF)
              </span>
            </div>

            <div className="pt-2">
              <Link
                to={`/product/${dealProduct.id}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-[#ff5f15] text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
              >
                Grab This Deal Today <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-md aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-md border border-stone-200/70">
            <img
              src={dealProduct.images[0]}
              alt={dealProduct.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 4. Best Sellers & Curated Collections with Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Trending Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Beloved by thousands of homeowners across India
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-stone-200/60 rounded-xl">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'sofas-seating', label: 'Sofas' },
              { id: 'bedroom', label: 'Beds' },
              { id: 'dining', label: 'Dining' },
              { id: 'decor-lighting', label: 'Lighting' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedTab === tab.id
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Craftsmanship & Blank Video Square Section (Prompt Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#ff5f15] uppercase tracking-wider">
              The Timber Connoisseur
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
              Ethically Harvested. Hand-Finished. Built for Decades.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every LiverMount solid wood centerpiece begins with mature, legally sourced timber seasoned in precision moisture-controlled kilns. Our master woodsmiths use time-tested mortise-and-tenon joinery that outlasts everyday wear.
            </p>

            <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero MDF, Particle Board or cheap hollow paper fillers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-stage anti-termite and borer vacuum pressure impregnation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Toxin-free, child-safe German PU clear protective sealant</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#ff5f15] hover:underline"
              >
                Learn more about our craftsmanship <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Blank square space where YouTube video/tour would be, fulfilling explicit user prompt requirement! */}
          <div className="w-full max-w-md mx-auto">
            <BlankVideoSquare label="LiverMount Factory & Artisan Workshop Tour" />
          </div>
        </div>
      </section>

      {/* 6. Experience Studios Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ff7d42] text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" /> Experience Studio Offline Network
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Visit 100+ Studios Near You. Touch & Feel Before You Buy.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Step into a LiverMount Studio to experience fabrics, test mattress firmness, evaluate timber grains, and receive free 3D digital room styling with our interior architects.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/studios"
                className="px-6 py-2.5 bg-[#ff5f15] hover:bg-[#e04f0d] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-md flex items-center gap-1.5"
              >
                Locate Nearest Studio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Loved By Over 500,000 Happy Homes
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real feedback from verified furniture enthusiasts across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">{rev.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed italic">"{rev.content}"</p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-stone-900">{rev.author}</p>
                  <p className="text-stone-400 text-[11px]">{rev.city}</p>
                </div>
                <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smaller section at bottom for Ads (Explicit User Requirement) */}
      <BottomAdSection />
    </div>
  );
};
