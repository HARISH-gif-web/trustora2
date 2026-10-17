import React, { useEffect, useState } from 'react';
import { TrustoraLogo } from '../components/TrustoraLogo';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen bg-[#0B1F3A] text-white flex flex-col justify-between items-center p-6 select-none overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with quick Skip */}
      <div className="w-full max-w-md flex justify-end pt-2">
        <button
          onClick={onComplete}
          className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-full border border-slate-700/60 hover:border-slate-500 transition"
        >
          Skip Intro →
        </button>
      </div>

      {/* Center Hero: Logo, Tagline, Trust Badges (Screen 1 in wireframe) */}
      <div className="flex flex-col items-center text-center my-auto max-w-sm px-4">
        {/* Large Logo */}
        <div className="mb-6 transform transition-all duration-700 hover:scale-105">
          <TrustoraLogo size="xl" variant="dark" showTagline={false} showAiBadge={true} />
        </div>

        {/* Tagline */}
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400 tracking-tight mt-1">
          Trusted Help. Right Around You.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xs leading-relaxed">
          Connecting you with certified, background-verified neighborhood experts in minutes.
        </p>

        {/* 3 Trust Indicators */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 text-[11px] sm:text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-full border border-slate-700/50">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            AI Powered
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-full border border-slate-700/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Pros
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-full border border-slate-700/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
            Safe & Reliable
          </span>
        </div>

        {/* Circular Progress Indicator matching wireframe */}
        <div className="mt-12 relative flex items-center justify-center">
          <svg className="w-14 h-14 transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="22"
              stroke="#1e293b"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="28"
              cy="28"
              r="22"
              stroke="#009688"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="138.2"
              strokeDashoffset={138.2 - (138.2 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-200"
            />
          </svg>
          <div className="absolute text-[11px] font-mono text-teal-400 font-bold">
            {progress}%
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-md text-center pb-4 text-[11px] text-slate-500">
        AI-Powered Local Services Platform • Fast & Transparent
      </div>
    </div>
  );
};
