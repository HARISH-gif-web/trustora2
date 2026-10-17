import React, { useState } from 'react';

interface TrustoraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  showAiBadge?: boolean;
  className?: string;
}

export const TrustoraLogo: React.FC<TrustoraLogoProps> = ({
  size = 'md',
  variant = 'auto',
  showTagline = false,
  showAiBadge = true,
  className = ''
}) => {
  const isDarkBg = variant === 'dark';
  const [imageError, setImageError] = useState(false);

  // User provided handshake logo
  const logoUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2cYv_pSURL5QHWTGycNm_kJijgfPr7uwQIRGRhEBNA&s=10';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon: Handshake image (no house outline) with clean circular handshake fallback */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        {!imageError ? (
          <img
            src={logoUrl}
            alt="Trustora Handshake Logo"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-xl drop-shadow-sm transition-transform hover:scale-105 select-none"
          />
        ) : (
          <div
            className={`w-full h-full rounded-2xl flex items-center justify-center p-1.5 ${
              isDarkBg ? 'bg-teal-950/80 ring-2 ring-teal-500/40' : 'bg-teal-50 ring-2 ring-teal-600/30'
            }`}
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-sm"
            >
              {/* Circular gradient backdrop */}
              <circle cx="50" cy="50" r="46" fill="#009688" />
              {/* Pure Handshake Silhouette */}
              <g transform="translate(14, 24) scale(0.72)">
                <path d="M 5 55 L 24 36 C 27 33 32 33 36 36 L 48 48 L 34 62 L 16 70 L 5 55 Z" fill="#004D40" />
                <path d="M 95 35 L 76 54 C 73 57 68 57 64 54 L 52 42 L 66 28 L 84 20 L 95 35 Z" fill="#10B981" />
                <path d="M 33 38 L 47 52 C 50 55 55 55 58 52 L 67 43 C 70 40 70 35 67 32 L 55 20 C 52 17 47 17 44 20 L 33 31 C 30 33 30 36 33 38 Z" fill="#E0F2F1" />
                <path d="M 40 33 L 53 46 C 55 48 58 48 60 46" stroke="#004D40" strokeWidth="4" strokeLinecap="round" />
                <path d="M 46 39 L 58 51 C 60 53 63 53 65 51" stroke="#004D40" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 32 37 C 36 31 43 31 48 35" stroke="#004D40" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 68 49 C 64 55 57 55 52 51" stroke="#004D40" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Brand Name Text: Trustora + AI */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight font-sans ${textSizes[size]} ${
              isDarkBg ? 'text-white' : 'text-[#0B1F3A]'
            }`}
          >
            Trust<span className="text-[#009688]">ora</span>
          </span>
          {showAiBadge && (
            <span
              className={`font-mono font-bold uppercase rounded-md tracking-wider ${
                size === 'sm'
                  ? 'text-[10px] px-1 py-0.2'
                  : size === 'xl'
                  ? 'text-xs px-2 py-0.5'
                  : 'text-[11px] px-1.5 py-0.5'
              } ${
                isDarkBg
                  ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                  : 'bg-[#E8F7F4] text-[#00796B] border border-[#009688]/30'
              }`}
            >
              AI
            </span>
          )}
        </div>
        {showTagline && (
          <span
            className={`text-xs font-medium tracking-wide mt-0.5 ${
              isDarkBg ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Trusted Help. Right Around You.
          </span>
        )}
      </div>
    </div>
  );
};
