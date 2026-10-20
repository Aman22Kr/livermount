import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  RotateCcw,
} from 'lucide-react';
import { FAQS } from '../data/mockData';
import { BottomAdSection } from '../components/BottomAdSection';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Ordering & Payment',
    'Delivery & Shipping',
    'Warranty & Craftsmanship',
    'Returns & Cancellations',
    'LiverMount Studios',
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff5f15]">
            Help Center & Knowledge Base
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
            Everything you need to know about deliveries, free technician assembly, timber warranty, and order modifications.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. warranty, assembly, return, EMI)..."
                className="w-full pl-10 pr-4 py-3 bg-stone-100 hover:bg-stone-50 focus:bg-white text-xs sm:text-sm border border-stone-300 rounded-2xl focus:outline-none focus:border-[#ff5f15] focus:ring-2 focus:ring-[#ff5f15]/20 transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 shadow-sm overflow-hidden">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/70"
                  >
                    <span className="text-sm font-bold text-stone-900">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#ff5f15] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
                      <span className="inline-block mt-3 px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] uppercase font-bold rounded">
                        Category: {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
            No questions matching "{searchQuery}". You can speak directly with our team!
          </div>
        )}

        {/* Still Need Assistance Banner */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-amber-900">Still have a question?</h3>
            <p className="text-xs text-amber-800 mt-0.5">
              Our furniture concierge is available 7 days a week from 10 AM to 8 PM.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Contact Support Desk
          </Link>
        </div>
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
