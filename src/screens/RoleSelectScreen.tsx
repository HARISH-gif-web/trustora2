import React from 'react';
import { ArrowRight, ShieldCheck, DollarSign, Sparkles, CheckCircle } from 'lucide-react';
import { TrustoraLogo } from '../components/TrustoraLogo';
import { UserRole } from '../types';

interface RoleSelectScreenProps {
  onSelectRole: (role: UserRole) => void;
  onSkipToHome: () => void;
  onGoToLogin: () => void;
}

export const RoleSelectScreen: React.FC<RoleSelectScreenProps> = ({
  onSelectRole,
  onSkipToHome,
  onGoToLogin,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Header with Logo & Skip (Screen 2) */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between pt-2">
        <TrustoraLogo size="md" />
        <button
          onClick={onSkipToHome}
          className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-teal-700 px-3 py-1 rounded-full hover:bg-slate-200/60 transition"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto w-full my-auto py-6">
        {/* Headings */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
            Welcome to Trustora
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5">
            Let's get started! Choose how you want to use Trustora
          </p>
        </div>

        {/* The Two Main Role Cards */}
        <div className="space-y-4 sm:space-y-5">
          {/* Card A: Service Seeker */}
          <div
            onClick={() => onSelectRole('seeker')}
            className="group relative bg-white border-2 border-slate-200/90 hover:border-teal-600 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Illustration Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 border border-amber-200/60 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Service Seeker"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition">
                  I am <span className="text-teal-700">Service Seeker</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 max-w-xs">
                  Find and book verified professionals for electrical, plumbing, and home repairs.
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-teal-800 font-medium">
                  <span className="bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                    Instant Booking
                  </span>
                  <span className="bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                    AI Diagnostic
                  </span>
                </div>
              </div>
            </div>

            {/* Teal Circular Arrow Button */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-600 group-hover:bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card B: Service Provider */}
          <div
            onClick={() => onSelectRole('provider')}
            className="group relative bg-white border-2 border-slate-200/90 hover:border-emerald-600 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Illustration Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-50 border border-teal-200/60 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80"
                  alt="Service Provider"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  I am <span className="text-emerald-700">Service Provider</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 max-w-xs">
                  Join as a professional, get high-paying bookings, and manage earnings.
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-800 font-medium">
                  <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    Weekly Payouts
                  </span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    Verified Badge
                  </span>
                </div>
              </div>
            </div>

            {/* Emerald Circular Arrow Button */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Trust Badges Grid (Screen 2 in wireframe) */}
        <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-slate-200/80">
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Verified Professionals</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <DollarSign className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>AI Powered Support</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Safe & Reliable</span>
          </div>
        </div>

        {/* Bottom Login link */}
        <div className="text-center mt-6 text-sm text-slate-600">
          Already have an account?{' '}
          <button
            onClick={onGoToLogin}
            className="font-bold text-teal-700 hover:text-teal-800 underline underline-offset-2"
          >
            Log in
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full text-center text-xs text-slate-400 pb-2">
        Trustora AI • ISO & Govt Compliant Service Network
      </div>
    </div>
  );
};
