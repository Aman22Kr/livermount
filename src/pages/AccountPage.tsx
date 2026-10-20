import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronRight,
  Plus,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomAdSection } from '../components/BottomAdSection';

export const AccountPage: React.FC = () => {
  const { orders, savedAddresses, wishlist, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ff5f15] text-white flex items-center justify-center font-bold text-xl shadow-md">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900">Aman Kumar</h1>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded border border-amber-200">
                  Platinum Member
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                GitHub: Aman22kr · aman.unicef@gmail.com · +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar (3 Cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-3 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-[#ff5f15]/10 text-[#ff5f15]'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>My Orders ({orders.length})</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-[#ff5f15]/10 text-[#ff5f15]'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses ({savedAddresses.length})</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <Link
                to="/wishlist"
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#ff5f15]" />
                  <span>Saved Wishlist ({wishlist.length})</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Main Content Area (9 Cols) */}
          <div className="lg:col-span-9">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-stone-900">Past Orders & Active Dispatches</h2>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                          <div>
                            <span className="text-xs font-bold text-stone-900 font-mono">
                              Order ID: {ord.id}
                            </span>
                            <span className="text-xs text-stone-400 block sm:inline sm:ml-2">
                              Placed on {ord.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded">
                              {ord.status}
                            </span>
                            <Link
                              to={`/track-order?id=${ord.id}`}
                              className="text-xs font-bold text-[#ff5f15] hover:underline"
                            >
                              Track Live Status →
                            </Link>
                          </div>
                        </div>

                        {/* Items in order */}
                        <div className="space-y-3">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={it.image}
                                  alt={it.productName}
                                  className="w-14 h-14 object-cover rounded-xl bg-stone-100 border border-stone-200"
                                />
                                <div>
                                  <h4 className="font-bold text-stone-900">{it.productName}</h4>
                                  <p className="text-stone-400 text-[11px]">Quantity: {it.quantity}</p>
                                </div>
                              </div>
                              <span className="font-bold text-stone-900 tabular-nums">
                                ₹{it.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="text-stone-500">
                            Delivering to: <strong className="text-stone-800">{ord.shippingAddress.city}</strong>
                          </span>
                          <span className="text-stone-900 font-bold">
                            Total Paid: ₹{ord.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
                    No orders placed yet.
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-stone-900">Saved Delivery Addresses</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-stone-900">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600">
                        {addr.street}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs text-stone-500 font-mono">Mobile: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
