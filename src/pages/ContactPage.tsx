import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomAdSection } from '../components/BottomAdSection';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('Order & Delivery Status');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! Our support agent will call you within 2 hours.');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff5f15]">We Are Here For You</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Contact LiverMount Care & Support
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Questions regarding your order, delivery timeline, free assembly, or custom wood sizing? We're ready to assist.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Helplines (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-stone-900">Direct Contact Channels</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5f15]/10 text-[#ff5f15] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Toll-Free Customer Hotline</span>
                    <a href="tel:18004196666" className="text-sm font-extrabold text-[#ff5f15] hover:underline block mt-0.5">
                      1800-419-6666
                    </a>
                    <span className="text-stone-400 text-[11px]">Mon – Sun: 10:00 AM – 8:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">WhatsApp Concierge Desk</span>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:underline block mt-0.5"
                    >
                      +91 98765 43210 (Instant Chat)
                    </a>
                    <span className="text-stone-400 text-[11px]">Average response time under 5 minutes</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Official Support Email</span>
                    <a href="mailto:support@livermount.com" className="text-xs font-bold text-stone-800 hover:text-[#ff5f15] block mt-0.5">
                      support@livermount.com
                    </a>
                    <span className="text-stone-400 text-[11px]">We resolve all inquiries within 24 hours</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-900 text-white rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#ff7d42] block">Corporate Headquarters</span>
                <p className="text-stone-300">
                  LiverMount Lifestyle Ltd.<br />
                  Tower 4, Prime Corporate Park, Santacruz East, Mumbai 400055, India.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-stone-900">Send an Inquiry or Feedback</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Shalini Roy"
                        className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Order ID (If applicable)</label>
                      <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="e.g. LM-84920"
                        className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15] uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15] bg-white text-stone-800"
                    >
                      <option>Order & Delivery Status</option>
                      <option>Technician Assembly Scheduling</option>
                      <option>7-Day Return / Replacement Request</option>
                      <option>Custom Timber Sizing & Fabric Swatch Request</option>
                      <option>Studio Visit Consultation</option>
                      <option>Commercial / Bulk Hospitality Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify details so we can best assist you..."
                      className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ff5f15] hover:bg-[#e04f0d] text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Support Request
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                    Ticket #TK-{Math.floor(10000 + Math.random() * 90000)} has been logged. Our customer happiness team will contact you via email ({email}) shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800"
                  >
                    Submit Another Query
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
