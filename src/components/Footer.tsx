import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  Wrench,
  MapPin,
  CheckCircle2,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Check your inbox for ₹1,500 welcome coupon 🎉');
    setEmail('');
  };

  return (
    <footer className="bg-[#1c1a19] text-stone-300 pt-14 pb-8 border-t border-stone-800">
      {/* 1. Trust Assurance Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-[#ff5f15] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Doorstep Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">Across 300+ cities with safely insured transit packaging.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-[#ff5f15] shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Expert Assembly</h4>
              <p className="text-xs text-stone-400 mt-0.5">Certified technicians assemble each piece at your convenience.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-[#ff5f15] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">10-Year Warranty</h4>
              <p className="text-xs text-stone-400 mt-0.5">100% Solid Sheesham & Teak wood guaranteed against timber defects.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-[#ff5f15] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100+ Experience Studios</h4>
              <p className="text-xs text-stone-400 mt-0.5">Touch & feel the craftsmanship in your city before ordering.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 text-xs">
        {/* Brand & Newsletter Column */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff5f15] flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Liver<span className="text-[#ff5f15]">Mount</span>
            </span>
          </Link>
          <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
            LiverMount is India's premier furniture and home lifestyle destination. From architectural solid wood beds to modular sectional sofas, we design homes that inspire comfort and meaningful gathering.
          </p>

          <div className="pt-2">
            <span className="block text-white font-semibold mb-2">Get ₹1,500 Off Your First Order</span>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-stone-800/80 text-white placeholder:text-stone-500 px-3.5 py-2 rounded-lg border border-stone-700 text-xs focus:outline-none focus:border-[#ff5f15]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#ff5f15] hover:bg-[#e04f0d] text-white font-semibold rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1"
              >
                Join <ArrowRight className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-emerald-400 text-[11px] mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Welcome voucher sent to your inbox!
              </p>
            )}
          </div>
        </div>

        {/* Column 2: Popular Categories */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Popular Categories</h4>
          <ul className="space-y-2 text-stone-400">
            <li><Link to="/category/sofas-seating" className="hover:text-white transition-colors">Sectional Sofas</Link></li>
            <li><Link to="/category/bedroom" className="hover:text-white transition-colors">Solid Teak Beds</Link></li>
            <li><Link to="/category/dining" className="hover:text-white transition-colors">6 Seater Dining Sets</Link></li>
            <li><Link to="/category/living" className="hover:text-white transition-colors">Coffee & End Tables</Link></li>
            <li><Link to="/category/study-office" className="hover:text-white transition-colors">Ergonomic Desks</Link></li>
            <li><Link to="/category/decor-lighting" className="hover:text-white transition-colors">Architectural Floor Lamps</Link></li>
          </ul>
        </div>

        {/* Column 3: The LiverMount Brand */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">LiverMount Heritage</h4>
          <ul className="space-y-2 text-stone-400">
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story & Craft</Link></li>
            <li><Link to="/studios" className="hover:text-white transition-colors">Experience Studios</Link></li>
            <li><Link to="/offers" className="hover:text-white transition-colors">Festive Offers & Coupons</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Solid Wood Sourcing</Link></li>
            <li><Link to="/studios" className="hover:text-white transition-colors">Book Free 3D Design</Link></li>
          </ul>
        </div>

        {/* Column 4: Customer Care */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Customer Support</h4>
          <ul className="space-y-2 text-stone-400">
            <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order Status</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support Team</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Free Assembly Guide</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">7-Day Return Policy</Link></li>
            <li><Link to="/account" className="hover:text-white transition-colors">My Profile & Orders</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Legal & Attribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 mt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
        <p>© 2026 LiverMount Lifestyle Ltd. Built for GitHub: Aman22kr.</p>
        <div className="flex items-center gap-4">
          <span>100% Safe & Secure Checkout</span>
          <span className="text-stone-700" aria-hidden="true">·</span>
          <span>Visa</span>
          <span className="text-stone-700" aria-hidden="true">·</span>
          <span>Mastercard</span>
          <span className="text-stone-700" aria-hidden="true">·</span>
          <span>UPI / RuPay</span>
          <span className="text-stone-700" aria-hidden="true">·</span>
          <span>Zero Cost EMI</span>
        </div>
      </div>
    </footer>
  );
};
