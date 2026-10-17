import React from 'react';
import { ArrowLeft, Star, Heart, CheckCircle2, ChevronRight } from 'lucide-react';
import { Professional } from '../types';

interface SavedProfessionalsScreenProps {
  professionals: Professional[];
  onBack: () => void;
  onSelectProfessional: (pro: Professional) => void;
  onBookNow: (pro: Professional) => void;
}

export const SavedProfessionalsScreen: React.FC<SavedProfessionalsScreenProps> = ({
  professionals,
  onBack,
  onSelectProfessional,
  onBookNow
}) => {
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
            <h1 className="text-base sm:text-lg font-bold text-slate-900">Saved Professionals</h1>
          </div>
          <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Bookmarked</span>
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4 space-y-3.5">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            onClick={() => onSelectProfessional(pro)}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-teal-500 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={pro.avatar}
                alt={pro.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{pro.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900">{pro.rating}</span>
                  <span className="text-slate-400">({pro.reviewCount})</span>
                  <span>•</span>
                  <span>{pro.categoryName}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">
                  ₹{pro.visitCharge} <span className="font-normal text-slate-500">Visit charge</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookNow(pro);
              }}
              className="px-3.5 py-1.5 bg-[#009688] hover:bg-[#00796B] text-white text-xs font-bold rounded-xl shadow-xs transition shrink-0"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
