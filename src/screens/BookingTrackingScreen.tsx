import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Navigation,
  AlertCircle
} from 'lucide-react';
import { Booking } from '../types';

interface BookingTrackingScreenProps {
  booking: Booking;
  onBack: () => void;
  onUpdateStatus?: (newStatus: Booking['status']) => void;
}

export const BookingTrackingScreen: React.FC<BookingTrackingScreenProps> = ({
  booking,
  onBack,
  onUpdateStatus
}) => {
  const [currentStatus, setCurrentStatus] = useState<Booking['status']>(booking.status);
  const [eta, setEta] = useState(booking.etaMinutes || 5);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showCallAlert, setShowCallAlert] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'pro'; text: string }[]>([
    {
      sender: 'pro',
      text: `Hello! I am on the bike near Madhapur signal. Carrying the standard repair kit. ETA approx 5 minutes.`
    }
  ]);

  const handleSendChat = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { sender: 'user', text }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'pro',
          text: `Got it! Noted. Will ring the bell or call your number on arrival.`
        }
      ]);
    }, 1000);
  };

  // Status progression simulation for interactive demo
  const handleAdvanceStatus = () => {
    let next: Booking['status'] = 'on_the_way';
    if (currentStatus === 'requested') next = 'assigned';
    else if (currentStatus === 'assigned') next = 'on_the_way';
    else if (currentStatus === 'on_the_way') {
      next = 'arriving';
      setEta(2);
    } else if (currentStatus === 'arriving') {
      next = 'in_progress';
      setEta(0);
    } else if (currentStatus === 'in_progress') {
      next = 'completed';
    }
    setCurrentStatus(next);
    onUpdateStatus?.(next);
  };

  const handleCall = () => {
    setShowCallAlert(true);
    setTimeout(() => setShowCallAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans">
      {/* Top Header (Screen 9 in wireframe) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900">Booking Details</h1>
              <span className="text-xs text-slate-500 font-mono">ID: {booking.id}</span>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            {currentStatus === 'completed' ? 'Completed' : 'Live Tracking'}
          </span>
        </div>
      </div>

      {showCallAlert && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in">
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Calling {booking.professionalName} ({booking.professionalPhone})...</span>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 mt-4 space-y-4">
        {/* Timeline Stepper (Screen 9 in wireframe) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-4 relative text-center">
            {/* Horizontal Line background */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

            {/* Step 1: Confirmed */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                ✓
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-2">Confirmed</span>
              <span className="text-[10px] text-slate-400">10:00 AM</span>
            </div>

            {/* Step 2: Professional On the way */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  ['on_the_way', 'arriving', 'in_progress', 'completed'].includes(currentStatus)
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                ✓
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-2 leading-tight">
                On the way
              </span>
              <span className="text-[10px] text-slate-400">10:20 AM</span>
            </div>

            {/* Step 3: Arriving */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  ['arriving', 'in_progress', 'completed'].includes(currentStatus)
                    ? 'bg-emerald-600 text-white'
                    : currentStatus === 'on_the_way'
                    ? 'bg-teal-600 text-white ring-4 ring-teal-100 animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-2">
                {currentStatus === 'in_progress' ? 'Started' : 'Arriving'}
              </span>
              <span className="text-[10px] text-teal-700 font-semibold">
                {currentStatus === 'completed'
                  ? 'Done'
                  : currentStatus === 'in_progress'
                  ? 'Now'
                  : `${eta} mins`}
              </span>
            </div>

            {/* Step 4: Completed */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  currentStatus === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {currentStatus === 'completed' ? '✓' : '◯'}
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-2">Completed</span>
              <span className="text-[10px] text-slate-400">
                {currentStatus === 'completed' ? '11:15 AM' : '--'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Map Preview (Screen 9 in wireframe) */}
        <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-[#E9F4EE]">
          {/* Stylized vector map canvas */}
          <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
            {/* Land/Parks */}
            <rect width="400" height="300" fill="#E8F4EC" />
            <rect x="20" y="20" width="80" height="70" rx="10" fill="#D2EBD9" />
            <rect x="260" y="180" width="120" height="90" rx="12" fill="#D2EBD9" />
            <rect x="30" y="190" width="90" height="80" rx="10" fill="#DCEFE3" />

            {/* Roads */}
            <path
              d="M 0 100 Q 150 120 220 80 T 400 90"
              stroke="#FFFFFF"
              strokeWidth="16"
              fill="none"
            />
            <path
              d="M 0 100 Q 150 120 220 80 T 400 90"
              stroke="#E2E8F0"
              strokeWidth="12"
              fill="none"
            />

            <path
              d="M 120 0 L 120 300"
              stroke="#FFFFFF"
              strokeWidth="18"
              fill="none"
            />
            <path
              d="M 120 0 L 120 300"
              stroke="#E2E8F0"
              strokeWidth="14"
              fill="none"
            />

            <path
              d="M 280 0 L 280 300"
              stroke="#FFFFFF"
              strokeWidth="14"
              fill="none"
            />
            <path
              d="M 280 0 L 280 300"
              stroke="#E2E8F0"
              strokeWidth="10"
              fill="none"
            />

            {/* Active GPS Route in Teal */}
            <path
              d="M 160 120 Q 220 180 280 220"
              stroke="#009688"
              strokeWidth="6"
              strokeDasharray="6,4"
              fill="none"
              className="animate-pulse"
            />

            {/* Customer Home Pin */}
            <g transform="translate(280, 220)">
              <circle cx="0" cy="0" r="16" fill="#0B1F3A" opacity="0.15" />
              <circle cx="0" cy="0" r="10" fill="#009688" />
              <path
                d="M -4 -1 L 0 -5 L 4 -1 L 4 4 L -4 4 Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>

          {/* Technician Moving Vehicle Pin */}
          <div className="absolute top-[42%] left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-car">
            <div className="relative">
              <span className="absolute -inset-1 rounded-full bg-teal-500/40 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-white ring-2 ring-teal-600 p-0.5 shadow-lg overflow-hidden">
                <img
                  src={booking.professionalAvatar}
                  alt={booking.professionalName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="mt-1 px-2 py-0.5 bg-[#0B1F3A] text-white text-[10px] font-extrabold rounded-md shadow-md">
              {currentStatus === 'completed' ? 'Arrived' : `${eta} mins away`}
            </div>
          </div>

          {/* Map Controls & Destination Label */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5 border border-slate-200/80">
            <Navigation className="w-3.5 h-3.5 text-teal-600" />
            <span>Destination: {booking.customerAddress.split(',')[0]}</span>
          </div>
        </div>

        {/* Bottom Driver Card (Screen 9 in wireframe) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <img
                src={booking.professionalAvatar}
                alt={booking.professionalName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-100 shrink-0"
              />
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {currentStatus === 'completed'
                    ? `${booking.professionalName} completed the service`
                    : `${booking.professionalName.split(' ')[0]} is on the way`}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentStatus === 'completed'
                    ? 'Job inspected & finalized'
                    : `Arriving in ${eta} minutes`}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Professional • ₹10K Cover</span>
                </div>
              </div>
            </div>

            {/* Action buttons: Call & Message */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowChatModal(true)}
                className="px-3.5 py-2 border-2 border-teal-600 hover:bg-teal-50 text-teal-700 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-teal-600" />
                <span>Chat</span>
              </button>

              <button
                onClick={handleCall}
                className="px-3.5 py-2 border-2 border-emerald-600 hover:bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call</span>
              </button>
            </div>
          </div>

          {/* Simulation CTA for reviewers to experience full lifecycle */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="text-[11px] text-slate-500">
              Demo Control: Advance service stages
            </div>
            {currentStatus !== 'completed' ? (
              <button
                onClick={handleAdvanceStatus}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-xl border border-teal-200 transition"
              >
                Next Status →
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-600">All Steps Completed</span>
            )}
          </div>
        </div>

        {/* Rating & Review Section (Shown upon completion) */}
        {currentStatus === 'completed' && (
          <div className="bg-white rounded-3xl p-5 border border-emerald-200/80 shadow-sm animate-in fade-in">
            <div className="text-center mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
              <h3 className="text-base font-bold text-slate-900">Service Completed!</h3>
              <p className="text-xs text-slate-500">How was your experience with {booking.professionalName}?</p>
            </div>

            {!reviewSubmitted ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= userRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share feedback for the technician..."
                  rows={2}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                />

                <button
                  onClick={() => setReviewSubmitted(true)}
                  disabled={userRating === 0}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition"
                >
                  Submit Rating & Review
                </button>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs text-center rounded-xl font-semibold">
                Thank you! Your feedback helps keep Trustora safe and top-rated.
              </div>
            )}
          </div>
        )}

      </div>

      {/* Technician Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full h-[450px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-3.5 bg-teal-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={booking.professionalAvatar}
                  alt={booking.professionalName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white/40"
                />
                <div>
                  <h4 className="font-bold text-xs leading-none">{booking.professionalName}</h4>
                  <span className="text-[10px] text-teal-200">En route • {eta} mins away</span>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 rounded-full text-white/80 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-slate-50 text-xs">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-teal-700 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 border-t border-slate-200 bg-white">
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-[10px]">
                {['I am at the gate', 'Please call when you arrive', 'Bring spare MCB'].map(
                  (canned, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendChat(canned)}
                      className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 shrink-0 border border-slate-200"
                    >
                      {canned}
                    </button>
                  )
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat(chatInput)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                />
                <button
                  type="button"
                  onClick={() => handleSendChat(chatInput)}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
