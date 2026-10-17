import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  MessageSquare,
  Clock,
  Zap,
  DollarSign,
  Languages,
  Check,
  X
} from 'lucide-react';
import { Professional } from '../types';

interface ProviderProfileScreenProps {
  professional: Professional;
  onBack: () => void;
  onBookNow: (pro: Professional) => void;
}

export const ProviderProfileScreen: React.FC<ProviderProfileScreenProps> = ({
  professional,
  onBack,
  onBookNow
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'services' | 'photos'>('about');
  const [isSaved, setIsSaved] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-sans">
      {/* Top Action Bar (Screen 7) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Save professional"
            >
              <Heart
                className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Share profile"
            >
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {copiedNotification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          Profile link copied to clipboard!
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 mt-4">
        {/* Profile Card Header (Screen 7 in wireframe) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden ring-4 ring-teal-50 shadow-md shrink-0">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {professional.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm">
              <div className="flex items-center gap-1 font-extrabold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{professional.rating}</span>
              </div>
              <span className="text-slate-400">({professional.reviewCount} reviews)</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">
                {professional.experienceYears}+ years experience
              </span>
            </div>

            {/* Verified Badge (clickable to view breakdown) */}
            <div className="mt-3">
              <button
                onClick={() => setShowVerificationModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200/80 transition"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Professional</span>
                <span className="text-[10px] text-emerald-600 underline ml-0.5">View details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Screen 7 in wireframe: About, Reviews, Services, Photos) */}
        <div className="flex border-b border-slate-200 mt-6 bg-white rounded-2xl p-1 shadow-xs">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'about'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'reviews'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reviews ({professional.reviews.length || professional.reviewCount})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'services'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Services & Rates
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'photos'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Photos
          </button>
        </div>

        {/* Tab 1: About */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 mt-4 border border-slate-200/80 shadow-xs space-y-4">
            {/* Quick Specs matching wireframe */}
            <div className="space-y-3 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <Zap className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Specializes in all types of electrical work</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>
                  Available in {professional.locationCity} ({professional.locationArea}, 0–15 km)
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <Languages className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Speaks: {professional.languages.join(', ')}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <DollarSign className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>
                  <strong>₹{professional.visitCharge}</strong> Visit charge (adjustable in final
                  service bill)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Professional Bio
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {professional.about}
              </p>
            </div>

            {/* Specialities list */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Specialized Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {professional.specialities.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-teal-50 text-teal-800 px-3 py-1 rounded-xl border border-teal-200/60"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 mt-4 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xl font-black text-slate-900">{professional.rating}</span>
                <span className="text-xs text-slate-500 ml-1">out of 5.0</span>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                100% Genuine Customers
              </span>
            </div>

            <div className="space-y-3">
              {professional.reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {rev.customerName}
                    </span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Services & Rates */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 mt-4 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Standard Rate Card
            </h3>
            {professional.pricingDetails.map((service, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {service.serviceName}
                  </div>
                  <div className="text-[10px] text-slate-500">{service.unit}</div>
                </div>
                <div className="font-black text-sm text-teal-800">₹{service.price}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Photos */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 mt-4 border border-slate-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Recent Work Completed
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {professional.portfolioImages.length > 0 ? (
                professional.portfolioImages.map((imgUrl, i) => (
                  <div key={i} className="aspect-video rounded-2xl overflow-hidden ring-1 ring-slate-200">
                    <img src={imgUrl} alt="Completed work" className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-6 text-xs text-slate-500">
                  3 photos uploaded and verified by Trustora Field Operations.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Verification Breakdown Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Trustora Verification</h3>
              </div>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Govt Aadhaar & PAN Card</span>
                  <span className="text-slate-500">Identity authenticated with UIDAI database</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Technical Skill Certified</span>
                  <span className="text-slate-500">Passed practical trade competency test</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Police Background Clearance</span>
                  <span className="text-slate-500">Zero criminal record in verified state records</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">₹10,000 Property Damage Insurance</span>
                  <span className="text-slate-500">Covered under Trustora Protection Pool</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowVerificationModal(false)}
              className="mt-5 w-full py-2.5 bg-teal-700 text-white rounded-xl font-bold text-xs hover:bg-teal-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom "Book Now" Button (Screen 7 in wireframe) */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200/90 p-4 shadow-lg z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Standard Visit Charge</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900">
                ₹{professional.visitCharge}
              </span>
              <span className="text-xs text-teal-600 font-semibold">(Adjustable)</span>
            </div>
          </div>

          <button
            onClick={() => onBookNow(professional)}
            className="flex-1 max-w-xs py-3.5 bg-[#009688] hover:bg-[#00796B] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer text-center"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
