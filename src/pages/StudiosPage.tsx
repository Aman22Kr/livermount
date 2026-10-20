import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Calendar,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react';
import { STUDIOS, Studio } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { BottomAdSection } from '../components/BottomAdSection';

export const StudiosPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [bookingStudio, setBookingStudio] = useState<Studio | null>(null);

  // Booking Form State
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-10-24');
  const [bookingTime, setBookingTime] = useState('11:30 AM');
  const [confirmedBooking, setConfirmedBooking] = useState(false);

  const cities = ['all', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai'];

  const filteredStudios =
    selectedCity === 'all'
      ? STUDIOS
      : STUDIOS.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone) {
      showToast('Please fill out your name and mobile number', 'error');
      return;
    }
    setConfirmedBooking(true);
    showToast(`Appointment booked at ${bookingStudio?.name}! 🎉`);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5f15]">
              Experience Before You Buy
            </span>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Studio LiverMount Locator
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Step into any of our 100+ nationwide experience studios. Touch genuine Sheesham & Teak wood timber finishes, test comfort levels, and collaborate with certified interior architects for free 3D digital room styling.
            </p>
          </div>

          {/* City Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCity === city
                    ? 'bg-[#ff5f15] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {city === 'all' ? 'All Studios (100+)' : city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Studios Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudios.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-stone-100">
                  <img
                    src={st.image}
                    alt={st.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {st.city}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-stone-900">{st.name}</h3>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#ff5f15] shrink-0 mt-0.5" />
                      <span>{st.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                      <span>{st.timing}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                      <a href={`tel:${st.phone}`} className="text-stone-800 font-medium hover:text-[#ff5f15]">
                        {st.phone}
                      </a>
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="pt-2 border-t border-stone-100">
                    <span className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">
                      Studio Experience Features:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {st.services.map((svc, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-stone-50 border border-stone-200 text-[11px] text-stone-700 rounded-md"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setBookingStudio(st);
                    setConfirmedBooking(false);
                  }}
                  className="w-full py-2.5 bg-stone-900 hover:bg-[#ff5f15] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Free 3D Design Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Consultation Modal */}
      {bookingStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-stone-100 relative">
            <button
              onClick={() => setBookingStudio(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedBooking ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff5f15]">
                    Free 3D Design Session
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">
                    {bookingStudio.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Meet with a certified LiverMount architect to map your floor plan and choose exact fabrics.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Shalini Roy"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Time Slot</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#ff5f15] bg-white"
                      >
                        <option>11:30 AM</option>
                        <option>02:00 PM</option>
                        <option>04:30 PM</option>
                        <option>06:30 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#ff5f15] hover:bg-[#e04f0d] text-white text-xs font-bold rounded-xl transition-colors shadow-md"
                >
                  Confirm Free Appointment
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Appointment Confirmed!</h3>
                <p className="text-xs text-stone-600">
                  We look forward to hosting you at <strong>{bookingStudio.name}</strong> on {bookingDate} at {bookingTime}.
                </p>
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-500 border border-stone-200">
                  Confirmation SMS & directions sent to {userPhone}.
                </div>
                <button
                  onClick={() => setBookingStudio(null)}
                  className="px-6 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ad slot at bottom */}
      <BottomAdSection />
    </div>
  );
};
