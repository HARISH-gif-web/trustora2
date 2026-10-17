import React, { useState } from 'react';
import {
  X,
  DollarSign,
  TrendingUp,
  Download,
  Building,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  CreditCard,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProviderEarningsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  totalEarnings: number;
  completedJobsCount: number;
  onWithdrawSuccess?: (amount: number) => void;
}

export const ProviderEarningsModal: React.FC<ProviderEarningsModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  totalEarnings,
  completedJobsCount,
  onWithdrawSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payouts' | 'bank_settings'>('overview');
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(true);
  const [downloadToast, setDownloadToast] = useState(false);

  // Bank details state
  const [bankDetails, setBankDetails] = useState({
    bankName: 'HDFC Bank',
    accountNumber: '•••• •••• 4092',
    ifsc: 'HDFC0001234',
    accountHolder: 'Mohammed Asif',
    upiId: 'asif.powertech@okhdfcbank'
  });
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [editForm, setEditForm] = useState({ ...bankDetails });

  // Payout transactions history
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-9021',
      date: 'Yesterday, 6:30 PM',
      description: 'Geyser Thermostat Repair (REQ-101)',
      amount: 450,
      type: 'credit',
      status: 'completed'
    },
    {
      id: 'TXN-8940',
      date: 'Dec 15, 2026',
      description: 'Weekly Automated Payout to HDFC Bank (•••• 4092)',
      amount: 2800,
      type: 'payout',
      status: 'completed'
    },
    {
      id: 'TXN-8812',
      date: 'Dec 13, 2026',
      description: 'Switchboard Overhaul & MCB Fix',
      amount: 650,
      type: 'credit',
      status: 'completed'
    }
  ]);

  if (!isOpen) return null;

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > availableBalance) {
      alert(`Please enter a valid amount between ₹1 and ₹${availableBalance}`);
      return;
    }

    setWithdrawSuccess(true);
    setTimeout(() => {
      setTransactions((prev) => [
        {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          date: 'Just now',
          description: `Instant Payout to ${bankDetails.bankName} (${bankDetails.accountNumber})`,
          amount: amount,
          type: 'payout',
          status: 'completed'
        },
        ...prev
      ]);
      if (onWithdrawSuccess) {
        onWithdrawSuccess(amount);
      }
      setTimeout(() => {
        setWithdrawSuccess(false);
        setWithdrawModalOpen(false);
        setWithdrawAmount('');
      }, 1500);
    }, 1200);
  };

  const handleDownloadStatement = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3000);
  };

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setBankDetails({ ...editForm });
    setIsEditingBank(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">My Earnings & Payouts</h3>
              <p className="text-xs text-slate-500">Weekly bank payout scheduled for Friday</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-100 px-4 pt-2 gap-2 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Earnings Overview
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'payouts'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Payout History
          </button>
          <button
            onClick={() => setActiveTab('bank_settings')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'bank_settings'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Bank & UPI Settings
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {downloadToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Earnings statement downloaded successfully (PDF format).</span>
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              {/* Available Balance Card */}
              <div className="rounded-3xl p-5 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">
                      Available for Withdrawal
                    </span>
                    <span className="bg-emerald-500/30 px-2 py-0.5 rounded-full text-[11px] font-medium text-emerald-100">
                      Live Balance
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
                    ₹{availableBalance.toLocaleString('en-IN')}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-emerald-500/40 text-xs">
                    <div>
                      <span className="text-emerald-200 block text-[11px]">Total Earned</span>
                      <span className="font-extrabold text-sm">₹{totalEarnings.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-emerald-200 block text-[11px]">Completed Jobs</span>
                      <span className="font-extrabold text-sm">{completedJobsCount} Jobs</span>
                    </div>
                    <div>
                      <span className="text-emerald-200 block text-[11px]">Platform Fee</span>
                      <span className="font-extrabold text-sm text-emerald-200">0% (Pro Offer)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex gap-2 relative z-10">
                  <button
                    onClick={() => {
                      setWithdrawAmount(availableBalance > 0 ? String(availableBalance) : '0');
                      setWithdrawModalOpen(true);
                    }}
                    disabled={availableBalance <= 0}
                    className="flex-1 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 disabled:opacity-60 disabled:hover:bg-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Instant Bank Transfer</span>
                  </button>
                  <button
                    onClick={handleDownloadStatement}
                    className="py-2.5 px-3 bg-emerald-800/40 hover:bg-emerald-800/60 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                    title="Download Statement"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Friday Payout Schedule Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">Weekly Bank Payout</h4>
                    <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                      Every Friday at 11:59 PM, all unwithdrawn balances are deposited directly into your linked {bankDetails.bankName} account with zero transfer fee.
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                      Next Payout: Friday Dec 26, 2026
                    </span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoPayoutEnabled}
                      onChange={(e) => setAutoPayoutEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              {/* Weekly Performance Bar Chart */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Weekly Earnings Trend</span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +18% vs Last Week
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 items-end h-24 pt-4">
                  {[
                    { day: 'Mon', amount: 450, height: '40%' },
                    { day: 'Tue', amount: 600, height: '55%' },
                    { day: 'Wed', amount: 350, height: '30%' },
                    { day: 'Thu', amount: 800, height: '75%' },
                    { day: 'Fri', amount: 1050, height: '95%' },
                    { day: 'Sat', amount: 500, height: '45%' },
                    { day: 'Sun', amount: availableBalance, height: availableBalance > 0 ? '60%' : '10%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                      <div
                        className="w-full bg-emerald-500 rounded-t-md transition-all hover:bg-emerald-600 cursor-pointer"
                        style={{ height: item.height }}
                        title={`₹${item.amount}`}
                      ></div>
                      <span className="text-[10px] font-bold text-slate-500">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* PAYOUTS TAB */}
          {activeTab === 'payouts' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Recent Transactions & Payouts</span>
                <button
                  onClick={handleDownloadStatement}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Statement</span>
                </button>
              </div>

              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        txn.type === 'credit'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {txn.type === 'credit' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <Building className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 leading-tight">{txn.description}</h5>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{txn.date} • {txn.id}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs sm:text-sm font-extrabold block ${
                        txn.type === 'credit' ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Success
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BANK SETTINGS TAB */}
          {activeTab === 'bank_settings' && (
            <div className="space-y-4">
              {!isEditingBank ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold text-slate-900">Primary Bank Account</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        ✓ Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Bank Name</span>
                        <span className="font-bold text-slate-800">{bankDetails.bankName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Account Number</span>
                        <span className="font-mono font-bold text-slate-800">{bankDetails.accountNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">IFSC Code</span>
                        <span className="font-mono font-bold text-slate-800">{bankDetails.ifsc}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Account Holder</span>
                        <span className="font-bold text-slate-800">{bankDetails.accountHolder}</span>
                      </div>
                    </div>
                  </div>

                  {/* UPI ID */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Instant UPI ID</span>
                      <span className="font-mono font-bold text-slate-800 text-xs">{bankDetails.upiId}</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      Instant Transfers
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setEditForm({ ...bankDetails });
                      setIsEditingBank(true);
                    }}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
                  >
                    Edit Bank & UPI Details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveBankDetails} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={editForm.bankName}
                      onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Account Number</label>
                    <input
                      type="text"
                      value={editForm.accountNumber}
                      onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={editForm.ifsc}
                      onChange={(e) => setEditForm({ ...editForm, ifsc: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      value={editForm.accountHolder}
                      onChange={(e) => setEditForm({ ...editForm, accountHolder: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">UPI ID</label>
                    <input
                      type="text"
                      value={editForm.upiId}
                      onChange={(e) => setEditForm({ ...editForm, upiId: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden"
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingBank(false)}
                      className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Payout cycle: Weekly (Every Friday)
          </span>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Instant Withdraw Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            {withdrawSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Transfer Initiated!</h4>
                <p className="text-xs text-slate-600">
                  ₹{Number(withdrawAmount).toLocaleString('en-IN')} has been sent to your {bankDetails.bankName} account ({bankDetails.accountNumber}).
                </p>
                <span className="text-[10px] font-mono text-slate-400 block">IMPS Ref: #IMP{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-extrabold text-slate-900 text-sm">Instant Bank Withdrawal</h4>
                  <button
                    onClick={() => setWithdrawModalOpen(false)}
                    className="p-1 text-slate-400 hover:bg-slate-100 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Withdrawal Amount (Max: ₹{availableBalance})
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-7 pr-3 py-2 text-sm font-bold border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Deposit To:</span>
                      <span className="font-bold text-slate-800">{bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Account:</span>
                      <span className="font-mono font-bold text-slate-800">{bankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Transfer Fee:</span>
                      <span className="font-bold text-emerald-600">₹0 (Free)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > availableBalance}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
                  >
                    Confirm & Transfer Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
