import React, { useState, useEffect } from 'react';
import {
  Search,
  Mic,
  Camera,
  Star,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { ServiceCategory, Professional, UserProfile } from '../types';
import { CategoryIcon } from '../components/CategoryIcon';

interface HomeSeekerScreenProps {
  user: UserProfile;
  categories: ServiceCategory[];
  professionals: Professional[];
  onSelectCategory: (categoryId: string) => void;
  onSelectProfessional: (professional: Professional) => void;
  onOpenAiAssistant: (initialQuery?: string) => void;
  onOpenPhotoDiagnosis: () => void;
  onBookNow: (professional: Professional) => void;
}

export const HomeSeekerScreen: React.FC<HomeSeekerScreenProps> = ({
  user,
  categories,
  professionals,
  onSelectCategory,
  onSelectProfessional,
  onOpenAiAssistant,
  onOpenPhotoDiagnosis,
  onBookNow
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedWorkerCategory, setSelectedWorkerCategory] = useState('all');
  const [savedIds, setSavedIds] = useState<string[]>(['prof-ravi-1']);

  const SLIDES = [
    {
      badge: 'Verified & Insured Local Pros',
      title: 'Trusted Professionals For Your Everyday Needs',
      subtitle: 'Quick. Safe. Reliable. Starting from ₹199.',
      primaryBtn: 'Book a Professional',
      primaryAction: () => onSelectCategory('electrician'),
      secondaryBtn: 'Ask AI Assistant',
      secondaryAction: () => onOpenAiAssistant(),
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      gradient: 'from-[#0B1F3A] to-[#0A364A]',
      accentColor: 'text-teal-300'
    },
    {
      badge: 'Summer Cooling Special • 30-Day Guarantee',
      title: '360° AC Foam Jet Servicing & Free Gas Check',
      subtitle: 'Instant 2X cooling boost & odor removal starting from ₹349.',
      primaryBtn: 'Book AC Service',
      primaryAction: () => onSelectCategory('ac_service'),
      secondaryBtn: 'Ask AI Assistant',
      secondaryAction: () => onOpenAiAssistant('AC cooling problem'),
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      gradient: 'from-[#004D40] to-[#00796B]',
      accentColor: 'text-emerald-300'
    },
    {
      badge: 'Rapid Dispatch • Arrives Within 25 Mins',
      title: 'Urgent Tap Leak Or Pipe Blockage?',
      subtitle: 'Certified master plumbers with acoustic leak detection from ₹199.',
      primaryBtn: 'Book Certified Plumber',
      primaryAction: () => onSelectCategory('plumber'),
      secondaryBtn: 'Photo Diagnosis',
      secondaryAction: () => onOpenPhotoDiagnosis(),
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&auto=format&fit=crop&q=80',
      gradient: 'from-[#0B2545] to-[#1E3A8A]',
      accentColor: 'text-cyan-300'
    }
  ];

  // Auto-advance banner carousel every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, SLIDES.length]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const foundCat = categories.find((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (foundCat) {
      onSelectCategory(foundCat.id);
    } else {
      onOpenAiAssistant(searchQuery);
    }
  };

  const currentSlide = SLIDES[activeBannerIndex];

  return (
    <div className="pb-24 max-w-7xl mx-auto px-3 sm:px-6 font-sans">
      {/* Search Bar (Screen 4 in wireframe) */}
      <div className="mt-4 sm:mt-6">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for services (e.g. plumber, electrician)..."
            className="w-full pl-11 pr-24 py-3.5 bg-white border border-slate-200/90 rounded-2xl text-sm placeholder:text-slate-400 focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition shadow-xs"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {/* Camera / Photo Diagnostic AI button */}
            <button
              type="button"
              onClick={onOpenPhotoDiagnosis}
              className="p-2 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition"
              title="Upload photo for AI problem diagnosis"
            >
              <Camera className="w-4 h-4 text-teal-600" />
            </button>
            {/* Mic / Voice Search button */}
            <button
              type="button"
              onClick={() => onOpenAiAssistant('Voice diagnosis')}
              className="p-2 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition"
              title="Speak your problem (Telugu / English)"
            >
              <Mic className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </form>
      </div>

      {/* Hero Banner Carousel (3 Interactive Sliders) */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`mt-4 sm:mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-r ${currentSlide.gradient} text-white shadow-xl transition-all duration-500 group`}
      >
        {/* Decorative lighting */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Previous slide button */}
        <button
          onClick={() =>
            setActiveBannerIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
          }
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 backdrop-blur-xs"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next slide button */}
        <button
          onClick={() => setActiveBannerIndex((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 backdrop-blur-xs"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 transition-all duration-300">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold text-white mb-3">
              <Sparkles className={`w-3.5 h-3.5 ${currentSlide.accentColor}`} />
              <span>{currentSlide.badge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
              {currentSlide.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1.5">
              {currentSlide.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <button
                onClick={currentSlide.primaryAction}
                className="px-4 py-2 bg-[#009688] hover:bg-[#00796B] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition cursor-pointer"
              >
                {currentSlide.primaryBtn}
              </button>
              <button
                onClick={currentSlide.secondaryAction}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
              >
                <Sparkles className={`w-3.5 h-3.5 ${currentSlide.accentColor}`} />
                {currentSlide.secondaryBtn}
              </button>
            </div>
          </div>

          {/* Friendly Professional Image with pulse badge */}
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 shrink-0">
            <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl bg-black/20">
              <img
                src={currentSlide.image}
                alt="Trusted Technician"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              100% Background Checked
            </div>
          </div>
        </div>

        {/* Carousel Dots & Slider Counter */}
        <div className="flex items-center justify-center gap-2 pb-3.5 pt-1">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBannerIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeBannerIndex === idx
                  ? 'w-7 bg-teal-400'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Service Categories Grid (Screen 4 in wireframe) */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {user.name && user.name !== 'Service Seeker'
              ? `What help do you need, ${user.name}?`
              : 'What help do you need today?'}
          </h3>
          <span className="text-xs text-slate-500 font-medium">12 Services Available</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.slice(0, 8).map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="group flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-500 hover:shadow-md transition text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50/90 group-hover:bg-teal-600 group-hover:text-white text-teal-700 flex items-center justify-center mb-2 transition-all duration-200">
                <CategoryIcon name={category.iconName} className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition line-clamp-1">
                {category.name}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                From ₹{category.startingPrice}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Assistant Card (Screen 4 in wireframe) */}
      <div className="mt-7">
        <div
          onClick={() => onOpenAiAssistant()}
          className="group relative overflow-hidden bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border-2 border-teal-300/80 hover:border-teal-500 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Robot Avatar Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-7 h-7 text-amber-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-teal-950">
                  AI Assistant
                </span>
                <span className="text-[10px] font-bold bg-teal-600 text-white px-2 py-0.2 rounded-full uppercase tracking-wider font-mono">
                  Smart Match
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 line-clamp-2 max-w-lg">
                Describe your problem in your own words (or in Telugu). I'll help you find the right
                service.
              </p>
            </div>
          </div>

          {/* Circular green arrow button */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-teal-700 transition">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Popular Services / Top Rated Professionals (Screen 4 in wireframe) */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Verified Professionals ({professionals.length} Experts Ready)
            </h3>
            <p className="text-xs text-slate-500">
              Top rated background-verified specialists in Hyderabad with upfront rate cards
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('electrician')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:underline shrink-0"
          >
            <span>View All by Category</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Filter Bar for Workers */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none">
          {[
            { id: 'all', label: 'All Pros' },
            { id: 'electrician', label: '⚡ Electricians' },
            { id: 'plumber', label: '🚰 Plumbers' },
            { id: 'ac_service', label: '❄️ AC Care' },
            { id: 'cleaning', label: '✨ Deep Clean' },
            { id: 'appliance', label: '📺 Appliances' },
            { id: 'carpenter', label: '🔨 Carpenters' },
            { id: 'painter', label: '🎨 Painters' },
            { id: 'pest_control', label: '🛡️ Pest Control' }
          ].map((catFilter) => (
            <button
              key={catFilter.id}
              onClick={() => setSelectedWorkerCategory(catFilter.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                selectedWorkerCategory === catFilter.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {catFilter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(selectedWorkerCategory === 'all'
            ? professionals
            : professionals.filter((p) => p.categoryId === selectedWorkerCategory)
          ).map((pro) => (
            <div
              key={pro.id}
              onClick={() => onSelectProfessional(pro)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500 hover:shadow-lg transition-all duration-200 p-4 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-teal-700 transition">
                          {pro.name}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        {pro.categoryName}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleSave(pro.id, e)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-50 transition"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        savedIds.includes(pro.id) ? 'fill-teal-600 text-teal-600' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pro.rating}</span>
                    <span className="text-slate-400 font-normal">({pro.reviewCount})</span>
                  </div>
                  <span>•</span>
                  <span>{pro.experienceYears}+ yrs exp</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Available Today
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2">{pro.about}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Visit Charge</span>
                  <span className="text-sm font-extrabold text-slate-900">
                    ₹{pro.visitCharge}
                  </span>
                  <span className="text-[10px] text-teal-600 ml-1 font-medium">(Adjustable)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProfessional(pro);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition"
                  >
                    Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookNow(pro);
                    }}
                    className="px-4 py-1.5 bg-[#009688] hover:bg-[#00796B] text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trustora 30-Day Guarantee Banner */}
      <div className="mt-8 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Trustora 30-Day Guarantee</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Zero hassle rework if any issue recurs within 30 days. Transparent upfront pricing.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-xl">
            ISO 9001 Verified
          </span>
        </div>
      </div>
    </div>
  );
};
