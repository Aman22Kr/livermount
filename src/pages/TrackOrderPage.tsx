import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Wrench,
  MapPin,
  Phone,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomAdSection } from '../components/BottomAdSection';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useApp();

  const queryId = searchParams.get('id');
  const [orderIdInput, setOrderIdInput] = useState(queryId || 'LM-84920');
  const [phoneInput, setPhoneInput] = useState('9876543210');

  // Find order from state or fallback to default
  const matchedOrder =
    orders.find((o) => o.id.toLowerCase() === orderIdInput.trim().toLowerCase()) ||
    orders[0];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const steps = [
    { title: 'Order Confirmed', date: '16 Oct, 11:24 AM', desc: 'Payment verified and sent to master craftsman', done: true },
    { title: 'Quality & Timber Check', date: '18 Oct, 03:15 PM', desc: 'Moisture level calibrated, joinery inspection completed', done: true },
    { title: 'Dispatched & In Transit', date: '20 Oct, 08:45 AM', desc: 'En route from Central Bhiwandi Logistics Hub', done: true },
    { title: 'Out for Doorstep Delivery', date: 'Estimated 22 Oct, Morning', desc: 'Delivery partner assigned (Insured padded van)', done: false },
    { title: 'Delivered & Free Assembly', date: 'Estimated 23 Oct', desc: 'Technician will install and level the piece', done: false },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#ff5f15]" />
            Track Your LiverMount Shipment
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time status of your handcrafted furniture dispatch and technician assembly
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Search Input Box */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
          <form onSubmit={handleTrackSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Order ID</label>
              <input
                type="text"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="e.g. LM-84920"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15] uppercase font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Mobile Number</label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="Registered 10-digit number"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" /> Track Status
              </button>
            </div>
          </form>
        </div>

        {matchedOrder ? (
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm space-y-8">
            {/* Order Overview Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono font-bold text-stone-400">Order</span>
                  <span className="text-base font-bold text-stone-900 font-mono">{matchedOrder.id}</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs font-bold">
                    {matchedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">Placed on {matchedOrder.date} · Paid via {matchedOrder.paymentMethod}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-stone-400 block">Expected Delivery & Assembly</span>
                <span className="text-sm sm:text-base font-bold text-stone-900">{matchedOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {steps.map((st, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      st.done ? 'border-[#ff5f15] bg-[#ff5f15]' : 'border-stone-300'
                    }`}
                  >
                    {st.done && <CheckCircle2 className="w-3 h-3 text-white fill-[#ff5f15]" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h4 className={`text-xs font-bold ${st.done ? 'text-stone-900' : 'text-stone-400'}`}>
                        {st.title}
                      </h4>
                      <span className="text-[10px] text-stone-400">{st.date}</span>
                    </div>
                    <p className="text-xs text-stone-500">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ordered Items Preview */}
            <div className="pt-6 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">Items in this Package</h3>
              <div className="space-y-3">
                {matchedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.image} alt={it.productName} className="w-12 h-12 rounded-lg object-cover bg-white" />
                      <div>
                        <p className="font-bold text-stone-900">{it.productName}</p>
                        <p className="text-stone-400 text-[11px]">Quantity: {it.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums">₹{it.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address & Help Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ff5f15]" /> Delivery Address
                </span>
                <p className="text-stone-600">
                  {matchedOrder.shippingAddress.fullName}<br />
                  {matchedOrder.shippingAddress.street}, {matchedOrder.shippingAddress.city} - {matchedOrder.shippingAddress.pincode}
                </p>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="font-bold text-stone-900">Need Immediate Help?</span>
                <p className="text-stone-600">
                  Call Dedicated Dispatch Desk at <a href="tel:18004196666" className="text-[#ff5f15] font-bold">1800-419-6666</a>
                </p>
                <p className="text-[11px] text-stone-400">Lines active 24/7 for order assistance</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
            No order found for ID "{orderIdInput}". Please double check your order receipt or confirmation SMS.
          </div>
        )}
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
