import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Copy, Tag, Check, CreditCard, ArrowRight } from 'lucide-react';
import { COUPONS, PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { BottomAdSection } from '../components/BottomAdSection';

export const OffersPage: React.FC = () => {
  const { showToast } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const clearanceItems = PRODUCTS.filter((p) => p.discount >= 38);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white py-12 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5f15]/20 text-[#ff7d42] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Festive Bonanza Deals
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Exclusive Coupons & Clearance Savings
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
            Stack official manufacturer discounts with partner bank credits for maximum festive value.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        {/* Active Coupons Grid */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#ff5f15]" /> Available Promo Codes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUPONS.map((cp) => (
              <div
                key={cp.code}
                className="bg-white rounded-2xl border-2 border-dashed border-stone-300 p-6 shadow-sm flex flex-col justify-between hover:border-[#ff5f15] transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#ff5f15]/10 text-[#ff5f15] font-mono font-bold text-sm rounded-lg border border-[#ff5f15]/20">
                      {cp.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      {cp.discountPercent}% Instant Off
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pt-2">{cp.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">Min Order: ₹{cp.minOrder.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => handleCopy(cp.code)}
                    className="flex items-center gap-1.5 text-xs font-bold text-stone-800 hover:text-[#ff5f15] transition-colors"
                  >
                    {copiedCode === cp.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Partner Offers */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#ff5f15]" /> Partner Bank Privileges
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900 block">HDFC Bank Cards</span>
              <p className="text-stone-600">Flat ₹2,500 Instant Cashback on credit cards EMI above ₹30,000.</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900 block">ICICI Bank Credit Cards</span>
              <p className="text-stone-600">10% Instant Discount up to ₹3,000 on furniture & home decor orders.</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900 block">Zero Cost EMI (3, 6, 9 Mos)</span>
              <p className="text-stone-600">Enjoy zero processing fee and no interest across all major credit cards.</p>
            </div>
          </div>
        </div>

        {/* Mega Clearance Deals */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                Clearance Spotlight (Up to 44% Off)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">Limited inventory solid wood stock</p>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-[#ff5f15] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clearanceItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
