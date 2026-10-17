import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Star,
  Heart,
  CheckCircle2,
  MapPin,
  Clock,
  Filter
} from 'lucide-react';
import { Professional, ServiceCategory } from '../types';

interface ServiceListingScreenProps {
  category: ServiceCategory;
  city: string;
  professionals: Professional[];
  onBack: () => void;
  onSelectProfessional: (pro: Professional) => void;
  onBookNow: (pro: Professional) => void;
}

export const ServiceListingScreen: React.FC<ServiceListingScreenProps> = ({
  category,
  city,
  professionals,
  onBack,
  onSelectProfessional,
  onBookNow
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'near' | 'top_rated' | 'available_today' | 'low_price'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(['prof-ravi-1']);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter professionals matching category and active filter
  const filteredPros = useMemo(() => {
    let list = professionals.filter(
      (p) => p.categoryId === category.id || category.id === 'more_services'
    );

    // If search active
    if (searchQuery.trim()) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.about.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.locationArea.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply active filter
    if (activeFilter === 'top_rated') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (activeFilter === 'near') {
      list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (activeFilter === 'available_today') {
      list = list.filter((p) => p.isAvailableToday);
    } else if (activeFilter === 'low_price') {
      list = [...list].sort((a, b) => a.visitCharge - b.visitCharge);
    }

    return list;
  }, [category.id, professionals, searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Top Header Bar (Screen 6 in wireframe) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {category.name}s
              </h1>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3 h-3 text-teal-600" />
                <span>{city}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Expandable search inside listing */}
        {showSearchInput && (
          <div className="max-w-3xl mx-auto mt-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${category.name}s...`}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
              autoFocus
            />
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-3">
        {/* Filter Chips (Screen 6 in wireframe) */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              activeFilter === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('near')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              activeFilter === 'near'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Near me
          </button>
          <button
            onClick={() => setActiveFilter('top_rated')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              activeFilter === 'top_rated'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Top Rated
          </button>
          <button
            onClick={() => setActiveFilter('available_today')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              activeFilter === 'available_today'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Available Today
          </button>
          <button
            onClick={() => setActiveFilter('low_price')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              activeFilter === 'low_price'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Price: Low to High
          </button>
        </div>

        {/* Results Count & Notice */}
        <div className="flex items-center justify-between text-xs text-slate-500 my-2 px-1">
          <span>{filteredPros.length} Verified Professionals Available</span>
          <span className="text-[11px] text-teal-700 font-medium">100% Background Checked</span>
        </div>

        {/* Professional Cards List (Screen 6 in wireframe) */}
        <div className="space-y-3.5 mt-2">
          {filteredPros.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">No professionals found</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the filter or search keyword.</p>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredPros.map((pro) => (
              <div
                key={pro.id}
                onClick={() => onSelectProfessional(pro)}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500 hover:shadow-md transition p-4 cursor-pointer flex gap-3.5 sm:gap-4 relative group"
              >
                {/* Profile Image with subtle ring */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-1 ring-slate-200 shrink-0 bg-slate-100">
                  <img
                    src={pro.avatar}
                    alt={pro.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details Column */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between pr-7">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-teal-700 transition">
                        {pro.name}
                      </h3>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                      <div className="flex items-center gap-0.5 font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{pro.rating}</span>
                      </div>
                      <span className="text-slate-400">({pro.reviewCount} reviews)</span>
                    </div>

                    {/* Experience & Location */}
                    <div className="text-xs text-slate-500 mt-1">
                      <span>{pro.experienceYears}+ years experience</span>
                      <span className="mx-1">•</span>
                      <span>{pro.locationArea}</span>
                    </div>

                    {/* Visit charge */}
                    <div className="text-xs text-slate-900 font-bold mt-1">
                      ₹{pro.visitCharge}{' '}
                      <span className="text-[11px] font-normal text-slate-500">Visit charge</span>
                    </div>

                    {/* Availability Tag */}
                    {pro.isAvailableToday && (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Available Today</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Heart Bookmark & Book Now Button */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button
                    onClick={(e) => toggleSave(pro.id, e)}
                    className="p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-50 transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        savedIds.includes(pro.id) ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookNow(pro);
                    }}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#009688] hover:bg-[#00796B] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
