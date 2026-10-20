import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  Lock,
  ArrowRight,
  Plus,
  MapPin,
} from 'lucide-react';
import { useApp, Address } from '../context/AppContext';
import { BottomAdSection } from '../components/BottomAdSection';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    appliedCoupon,
    appliedCouponDiscount,
    savedAddresses,
    saveAddress,
    placeOrder,
  } = useApp();

  const navigate = useNavigate();

  // Selected address ID
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    savedAddresses[0]?.id || ''
  );

  // Address form toggle
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPincode, setNewPincode] = useState('400050');
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newState, setNewState] = useState('Maharashtra');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');
  const [codAccepted, setCodAccepted] = useState(false);

  // Post-order modal state
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const selectedAddress =
    savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  const finalPayable = Math.max(0, cartTotal - appliedCouponDiscount);

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newStreet) return;
    const added = saveAddress({
      fullName: newFullName,
      phone: newPhone,
      pincode: newPincode,
      street: newStreet,
      landmark: newLandmark,
      city: newCity,
      state: newState,
    });
    setSelectedAddressId(added.id);
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert('Please add or select a delivery address');
      return;
    }

    const order = placeOrder(selectedAddress, paymentMethod);

    // Fire joyful confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Fallback if canvas confetti fails
    }

    setConfirmedOrderId(order.id);
  };

  if (cart.length === 0 && !confirmedOrderId) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded bg-[#ff5f15] text-white flex items-center justify-center font-bold text-sm">
              L
            </div>
            <span className="font-extrabold text-stone-900 text-lg">
              Liver<span className="text-[#ff5f15]">Mount</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Steps (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#ff5f15] text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Select Delivery Address
                </h2>

                {!showNewAddressForm && (
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="text-xs font-semibold text-[#ff5f15] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Address
                  </button>
                )}
              </div>

              {/* Saved Addresses List */}
              {!showNewAddressForm ? (
                <div className="space-y-3">
                  {savedAddresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-[#ff5f15] bg-[#ff5f15]/5 ring-1 ring-[#ff5f15]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="addressSelection"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 accent-[#ff5f15]"
                        />
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900 text-sm">{addr.fullName}</span>
                            <span className="text-stone-400">·</span>
                            <span className="font-medium text-stone-600">{addr.phone}</span>
                            {addr.isDefault && (
                              <span className="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-semibold">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-stone-600">
                            {addr.street}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.city}, {addr.state} - {addr.pincode}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                /* New Address Form */
                <form onSubmit={handleAddNewAddress} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        placeholder="e.g. Shalini Roy"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        placeholder="6 digits"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="e.g. Mumbai"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        placeholder="e.g. Maharashtra"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Flat / Building / Street Address</label>
                    <input
                      type="text"
                      required
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="e.g. Flat 301, Magnolia Towers, JVPD Scheme"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                    >
                      Save & Deliver Here
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Step 2: Shipping & Assembly Plan */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-3">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ff5f15] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Delivery & Free Assembly
              </h2>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900">White-Glove Insured Delivery & Free Assembly</span>
                    <p className="text-stone-500 text-[11px]">
                      Arrives by 26 Oct 2026. In-house carpenter will assemble upon delivery.
                    </p>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold uppercase text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  FREE
                </span>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ff5f15] text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* UPI */}
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#ff5f15] bg-[#ff5f15]/5 ring-1 ring-[#ff5f15]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#ff5f15]"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-[#ff5f15]" /> UPI / Instant QR Code
                      </span>
                      <p className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Fastest
                  </span>
                </label>

                {/* Credit / Debit Card */}
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#ff5f15] bg-[#ff5f15]/5 ring-1 ring-[#ff5f15]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#ff5f15]"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#ff5f15]" /> Credit or Debit Card
                      </span>
                      <p className="text-[11px] text-stone-500">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">Zero Cost EMI available</span>
                </label>

                {/* Net Banking */}
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#ff5f15] bg-[#ff5f15]/5 ring-1 ring-[#ff5f15]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="accent-[#ff5f15]"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#ff5f15]" /> Net Banking
                      </span>
                      <p className="text-[11px] text-stone-500">HDFC, ICICI, SBI, Axis, Kotak & 50+ Banks</p>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#ff5f15] bg-[#ff5f15]/5 ring-1 ring-[#ff5f15]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#ff5f15]"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-[#ff5f15]" /> Cash on Delivery (COD)
                      </span>
                      <p className="text-[11px] text-stone-500">Pay cash or scan QR when delivery arrives at your door</p>
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'cod' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="codCheck"
                    checked={codAccepted}
                    onChange={(e) => setCodAccepted(e.target.checked)}
                    className="mt-0.5 accent-[#ff5f15]"
                  />
                  <label htmlFor="codCheck">
                    I confirm that I will be available at the delivery address and pay the exact sum of ₹{finalPayable.toLocaleString('en-IN')} via Cash or UPI upon handover.
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Review Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Review ({cart.length} Products)
              </h3>

              <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto space-y-2 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded-md bg-stone-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-stone-900 truncate max-w-[150px]">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-stone-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCouponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span className="tabular-nums">- ₹{appliedCouponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping & Assembly</span>
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total Payable</span>
                  <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={paymentMethod === 'cod' && !codAccepted}
                className="w-full py-3.5 bg-[#ff5f15] hover:bg-[#e04f0d] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                Place Order · ₹{finalPayable.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {confirmedOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl border border-stone-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Order Placed Successfully!
              </span>
              <h2 className="text-2xl font-extrabold text-stone-900">
                Thank You for Choosing LiverMount
              </h2>
              <p className="text-xs text-stone-500">
                Order ID: <strong className="text-stone-900 font-mono text-sm">{confirmedOrderId}</strong>
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl text-left text-xs space-y-2 border border-stone-200/60">
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-bold text-stone-900">26 Oct 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivering to:</span>
                <span className="font-medium text-stone-900 text-right">{selectedAddress?.fullName}, {selectedAddress?.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Free Assembly:</span>
                <span className="font-medium text-emerald-600">Within 24 hours of delivery</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to={`/track-order?id=${confirmedOrderId}`}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Truck className="w-4 h-4 text-[#ff5f15]" />
                Track This Order
              </Link>
              <Link
                to="/"
                className="w-full py-3 border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
