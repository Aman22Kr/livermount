import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  TreePine,
  Sparkles,
  Award,
  Users,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';
import { BlankVideoSquare } from '../components/BlankVideoSquare';
import { BottomAdSection } from '../components/BottomAdSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-16 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff7d42]">
            Generational Indian Joinery
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Crafting the Soul of Indian Living Spaces
          </h1>
          <p className="text-xs sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Founded with a conviction that furniture should outlive transient fashion trends, LiverMount brings authentic solid wood artistry directly into your home.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5f15]">Our Heritage</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
              From Sustainable Forests to Hand-Finished Sanctuaries
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every curve, chamfer, and tenon in a LiverMount creation celebrates natural grain. Unlike fast-furniture brands that rely on resin-bonded particle boards and toxic off-gassing glues, we exclusively source certified plantation Sheesham, Teak, and Oak.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our seasoned timber spends 4 to 6 weeks in computer-regulated vacuum kilns, balancing internal moisture to exactly 8–12% to guarantee that your dining table or bed will never crack or warp across changing seasons.
            </p>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-[#ff5f15] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Browse Our Collections <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg border border-stone-200">
            <img
              src={ASSET_IMAGES.diningSets}
              alt="Artisan Dining Craftsmanship"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Video Showcase Section (Explicit User Prompt Requirement) */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5f15]">
              Documentary Film
            </span>
            <h3 className="text-2xl font-bold text-stone-900">
              Inside Our Rajasthan Woodcraft Workshops
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Meet our third-generation master carpenters preserving heritage joinery techniques.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {/* Blank square space fulfilling user instruction: "If there is an area for a YouTube video link or thumbnail that takes you to YouTube, just put a blank square space there." */}
            <BlankVideoSquare label="Artisan Joinery Documentary & Kiln Process" />
          </div>
        </div>

        {/* Numbers & Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#ff5f15] block font-mono">500k+</span>
            <span className="text-xs font-bold text-stone-900 mt-1 block">Happy Homes Furnished</span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">Across 300+ Indian cities</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#ff5f15] block font-mono">100+</span>
            <span className="text-xs font-bold text-stone-900 mt-1 block">Experience Studios</span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">Touch & feel offline</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#ff5f15] block font-mono">10 Yrs</span>
            <span className="text-xs font-bold text-stone-900 mt-1 block">Solid Wood Warranty</span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">Zero termite & borer peace of mind</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#ff5f15] block font-mono">2,500+</span>
            <span className="text-xs font-bold text-stone-900 mt-1 block">Certified Technicians</span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">Free doorstep assembly</span>
          </div>
        </div>
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
