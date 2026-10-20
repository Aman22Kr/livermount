import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COUPONS } from '../data/mockData';
import { BottomAdSection } from '../components/BottomAdSection';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartOriginalTotal,
    appliedCoupon,
    appliedCouponDiscount,
    applyCoupon,
    removeCoupon,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleApply = (code: string) => {
    setCouponError(null);
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const finalPayable = Math.max(0, cartTotal - appliedCouponDiscount);
  const totalSavings = cartOriginalTotal - cartTotal + appliedCouponDiscount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">Your Cart is Empty</h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            Discover hand-finished timber furniture and artisan decor to elevate your home today.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff5f15] hover:bg-[#e04f0d] text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
            >
              Start Exploring Furniture <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <BottomAdSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5">
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Delivery Banner */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-800">
              <span className="flex items-center gap-2 font-medium">
                <Truck className="w-4 h-4 text-emerald-600" />
                Congratulations! Your entire order qualifies for Free Doorstep Delivery & Free Technician Assembly.
              </span>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-stone-100 border border-stone-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        {item.product.brand}
                      </span>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="block text-sm sm:text-base font-bold text-stone-900 hover:text-[#ff5f15] transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-stone-500 flex items-center gap-2">
                        <span>Finish: <strong className="text-stone-700">{item.selectedFinish || 'Natural'}</strong></span>
                        {item.selectedColor && (
                          <>
                            <span>·</span>
                            <span>Color: <strong className="text-stone-700">{item.selectedColor}</strong></span>
                          </>
                        )}
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">
                        ✓ Free Assembly by Certified Carpenter
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0">
                    <div className="text-right">
                      <div className="text-base font-bold text-stone-900 tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      {item.product.originalPrice > item.product.price && (
                        <div className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-stone-200 text-stone-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 font-bold tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-stone-200 text-stone-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1.5 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Link */}
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5f15] hover:underline"
              >
                ← Continue Shopping For More Items
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupons (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupon Application Box */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                <Tag className="w-4 h-4 text-[#ff5f15]" /> Apply Festive Coupon
              </div>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">{appliedCoupon.code} Applied</span>
                    <p className="text-[11px] text-emerald-600">
                      You saved ₹{appliedCouponDiscount.toLocaleString('en-IN')}!
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. LIVERMOUNT10"
                      className="flex-1 px-3 py-2 text-xs uppercase font-mono border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                    />
                    <button
                      onClick={() => handleApply(couponInput)}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-500 mt-1.5">{couponError}</p>
                  )}

                  {/* Quick Coupon Suggestions */}
                  <div className="pt-3 border-t border-stone-100 mt-3 space-y-2">
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Available Coupons</span>
                    {COUPONS.map((cp) => (
                      <div
                        key={cp.code}
                        className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-50 border border-stone-100"
                      >
                        <div>
                          <span className="font-mono font-bold text-stone-900">{cp.code}</span>
                          <p className="text-[10px] text-stone-500">{cp.description}</p>
                        </div>
                        <button
                          onClick={() => handleApply(cp.code)}
                          className="text-[11px] font-bold text-[#ff5f15] hover:underline"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Total MRP</span>
                  <span className="tabular-nums">₹{cartOriginalTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Retail Catalog Discount</span>
                  <span className="tabular-nums">- ₹{(cartOriginalTotal - cartTotal).toLocaleString('en-IN')}</span>
                </div>
                {appliedCouponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span className="tabular-nums">- ₹{appliedCouponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Delivery & Handling</span>
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Home Assembly</span>
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total Payable</span>
                  <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 text-[11px] font-semibold text-center">
                    You are saving ₹{totalSavings.toLocaleString('en-IN')} on this order!
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-[#ff5f15] hover:bg-[#e04f0d] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-[11px] text-stone-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>256-Bit SSL Encrypted & 7-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
