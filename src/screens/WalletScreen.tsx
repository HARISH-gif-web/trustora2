import React, { useState } from 'react';
import {
  ArrowLeft,
  Wallet,
  PlusCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';

interface WalletScreenProps {
  onBack: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({ onBack }) => {
  const [balance, setBalance] = useState(350);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'TRUST50') {
      setBalance((b) => b + 50);
      setCouponApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">My Wallet & Credits</h1>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
            Active
          </span>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-4 space-y-4">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-semibold text-teal-200 uppercase tracking-wider block">
              Available Trustora Cash
            </span>
            <div className="text-3xl sm:text-4xl font-black mt-1">₹{balance}</div>
            <p className="text-xs text-teal-100/80 mt-1">
              Usable on any service visit, electrical, or plumbing booking
            </p>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setBalance((b) => b + 200)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                + Add ₹200 (UPI)
              </button>
              <button
                onClick={() => setBalance((b) => b + 500)}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition"
              >
                + Add ₹500
              </button>
            </div>
          </div>
        </div>

        {/* Promo Code Box */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            <span>Redeem Referral or Promo Voucher</span>
          </h3>

          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter code (Try: TRUST50)"
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono font-bold focus:outline-hidden focus:border-teal-600"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl transition"
            >
              Apply
            </button>
          </form>

          {couponApplied && (
            <div className="mt-2 text-xs text-emerald-700 font-bold flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Promo applied! ₹50 credited to your Trustora wallet.</span>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Transaction History
          </h3>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Welcome Credit Bonus</span>
                <span className="text-[10px] text-slate-400">Oct 16, 2026</span>
              </div>
            </div>
            <span className="font-black text-xs text-emerald-700">+₹100</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">Referral Bonus (Friend Joined)</span>
                <span className="text-[10px] text-slate-400">Oct 14, 2026</span>
              </div>
            </div>
            <span className="font-black text-xs text-emerald-700">+₹250</span>
          </div>
        </div>
      </div>
    </div>
  );
};
