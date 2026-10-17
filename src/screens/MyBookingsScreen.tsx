import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsScreenProps {
  bookings: Booking[];
  onBack: () => void;
  onSelectBooking: (booking: Booking) => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({
  bookings,
  onBack,
  onSelectBooking
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed'>('all');

  const filtered = bookings.filter((b) => {
    if (filterTab === 'active') return ['requested', 'assigned', 'on_the_way', 'arriving', 'in_progress'].includes(b.status);
    if (filterTab === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">My Bookings</h1>
          </div>
          <span className="text-xs text-slate-500 font-medium">{bookings.length} Total</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4">
        {/* Filter tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs mb-4">
          <button
            onClick={() => setFilterTab('all')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
              filterTab === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilterTab('active')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
              filterTab === 'active'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active & On the way
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
              filterTab === 'completed'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed
          </button>
        </div>

        {/* List of bookings */}
        <div className="space-y-3.5">
          {filtered.map((b) => (
            <div
              key={b.id}
              onClick={() => onSelectBooking(b)}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-teal-500 shadow-xs hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={b.professionalAvatar}
                    alt={b.professionalName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {b.id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{b.professionalName}</h3>
                    <span className="text-xs text-slate-500">{b.serviceCategory}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      b.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-teal-100 text-teal-800 animate-pulse'
                    }`}
                  >
                    {b.status === 'completed'
                      ? '✓ Completed'
                      : b.status === 'on_the_way'
                      ? '📍 On the way'
                      : 'Active'}
                  </span>
                  <span className="block font-black text-sm text-slate-900 mt-1">
                    ₹{b.pricing.totalAmount}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>
                    {b.date} • {b.timeSlot}
                  </span>
                </div>

                <div className="flex items-center gap-1 font-bold text-teal-700">
                  <span>Track & Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
