import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BottomAdSection: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="w-full bg-stone-100/90 border-t border-b border-stone-200/80 py-3.5 px-4 sm:px-6 my-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
        <div className="flex items-center gap-3">
          <div className="px-1.5 py-0.5 bg-[#ff5f15]/10 text-[#ff5f15] font-semibold text-[10px] uppercase tracking-wider rounded border border-[#ff5f15]/20">
            Sponsored Ad
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ff5f15] shrink-0" />
            <p className="text-stone-800 font-medium">
              <span className="font-bold text-stone-900">LiverMount Platinum Living Credit Card:</span> Enjoy Flat 5% Unlimited Cashback on all furniture & decor orders + No Cost EMI up to 24 Months.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/offers"
            className="inline-flex items-center gap-1.5 text-[#ff5f15] font-semibold hover:underline"
          >
            Apply in 2 Mins <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-stone-300" aria-hidden="true">|</span>
          <button
            onClick={() => setClosed(true)}
            aria-label="Close advertisement"
            className="text-stone-400 hover:text-stone-600 transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
