import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  Clock,
  Star,
  User,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  MapPin,
  Calendar,
  AlertCircle,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { UserProfile, Booking } from '../types';
import { ProviderEarningsModal } from '../components/provider/ProviderEarningsModal';
import { ProviderAvailabilityModal } from '../components/provider/ProviderAvailabilityModal';
import { ProviderReviewsModal } from '../components/provider/ProviderReviewsModal';
import { ProviderProfileModal } from '../components/provider/ProviderProfileModal';
import { ProviderSupportModal } from '../components/provider/ProviderSupportModal';

interface HomeProviderScreenProps {
  user: UserProfile;
  onOpenMenu: () => void;
  onOpenAiAssistant: () => void;
  onViewBookingTracking?: (bookingId: string) => void;
  bookings?: Booking[];
  onUpdateBookingStatus?: (bookingId: string, status: Booking['status']) => void;
  onAddBooking?: (booking: Booking) => void;
}

export interface ProviderJob {
  id: string;
  customerName: string;
  customerPhone: string;
  category: string;
  problem: string;
  locationArea: string;
  distanceKm: number;
  timeSlot: string;
  amount: number;
  status: 'pending' | 'accepted' | 'on_the_way' | 'arrived' | 'in_progress' | 'completed' | 'declined';
  acceptedAt?: string;
  completedAt?: string;
}

export const HomeProviderScreen: React.FC<HomeProviderScreenProps> = ({
  user,
  onOpenMenu,
  onOpenAiAssistant,
  onViewBookingTracking,
  bookings = [],
  onUpdateBookingStatus,
  onAddBooking
}) => {
  // Modal states for the 5 feature buttons + Jobs modal
  const [showJobsModal, setShowJobsModal] = useState(false);
  const [jobsModalTab, setJobsModalTab] = useState<'requests' | 'active' | 'completed'>('requests');
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Dynamic state for provider data - starts at ZERO as requested
  const [availabilitySummary, setAvailabilitySummary] = useState('Mon - Sat: 9:00 AM - 7:00 PM');
  const [isOnline, setIsOnline] = useState(true);
  const [rating, setRating] = useState(4.8);
  const [reviewCount, setReviewCount] = useState(320);

  // Jobs state: Starts with 0 requests, 0 active, 0 completed!
  const [jobs, setJobs] = useState<ProviderJob[]>([]);

  // Toast & interaction state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCallContact, setActiveCallContact] = useState<{ name: string; phone: string } | null>(null);
  const [activeChatContact, setActiveChatContact] = useState<{ name: string; phone: string } | null>(null);
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'pro' | 'customer'; text: string }[]>([]);

  // Computed metrics starting from ZERO
  const pendingRequests = jobs.filter((j) => j.status === 'pending');
  const activeJobs = jobs.filter((j) =>
    ['accepted', 'on_the_way', 'arrived', 'in_progress'].includes(j.status)
  );
  const completedJobs = jobs.filter((j) => j.status === 'completed');

  const pendingCount = pendingRequests.length;
  const todayJobsCount = activeJobs.length + completedJobs.length;
  const thisWeekEarnings = completedJobs.reduce((sum, j) => sum + j.amount, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync newly made customer bookings from App (excluding the old initial seeds so data starts at 0)
  React.useEffect(() => {
    if (bookings && bookings.length > 0) {
      const newFromApp: ProviderJob[] = [];
      bookings.forEach((b) => {
        if (
          b.id !== 'BK-TR-8942' &&
          b.id !== 'BK-TR-7612' &&
          !jobs.some((j) => j.id === b.id)
        ) {
          newFromApp.push({
            id: b.id,
            customerName: b.customerName || 'Customer',
            customerPhone: b.customerPhone || '+91 98765 43210',
            category: b.serviceCategory || 'Service',
            problem: b.problemDescription || 'General Inspection & Diagnostic',
            locationArea: b.customerAddress || 'Hyderabad',
            distanceKm: 2.3,
            timeSlot: `${b.date} • ${b.timeSlot}`,
            amount: b.pricing?.totalAmount || 250,
            status: 'pending'
          });
        }
      });
      if (newFromApp.length > 0) {
        setJobs((prev) => [...newFromApp, ...prev]);
        showToast(`🔔 New Booking Request from ${newFromApp[0].customerName}!`);
      }
    }
  }, [bookings]);

  // Demo: Simulate customer booking coming in
  const handleSimulateIncomingBooking = () => {
    const demoCustomers = [
      {
        name: 'Ananya S.',
        phone: '+91 98765 43210',
        category: 'Electrician',
        problem: 'Geyser thermostat tripped & not heating water',
        area: 'Kondapur, Raghavendra Colony',
        dist: 2.1,
        slot: 'Today, 2:30 PM',
        amount: 450
      },
      {
        name: 'Vikram Patel',
        phone: '+91 98480 88291',
        category: 'Electrician',
        problem: 'Bedroom ceiling fan replacement + switchboard check',
        area: 'Madhapur, 100 Feet Road',
        dist: 3.4,
        slot: 'Today, 4:00 PM',
        amount: 350
      },
      {
        name: 'Deepak Rao',
        phone: '+91 99123 77482',
        category: 'Electrician',
        problem: 'Main MCB tripping repeatedly on AC turn-on',
        area: 'Gachibowli, Telecom Nagar',
        dist: 4.8,
        slot: 'Tomorrow, 10:00 AM',
        amount: 600
      }
    ];

    const pick = demoCustomers[jobs.length % demoCustomers.length];
    const newJob: ProviderJob = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      customerName: pick.name,
      customerPhone: pick.phone,
      category: pick.category,
      problem: pick.problem,
      locationArea: pick.area,
      distanceKm: pick.dist,
      timeSlot: pick.slot,
      amount: pick.amount,
      status: 'pending'
    };

    setJobs((prev) => [newJob, ...prev]);
    showToast(`🔔 New Booking Request from ${pick.name} for ${pick.category}!`);
  };

  // Reset demo data back to zero
  const handleResetData = () => {
    setJobs([]);
    showToast('All provider metrics reset to 0.');
  };

  // Provider accepts job
  const handleAcceptJob = (id: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'accepted', acceptedAt: now } : j))
    );
    onUpdateBookingStatus?.(id, 'assigned');
    showToast('✓ Job Accepted! View the acceptance details below.');
    setJobsModalTab('active');
  };

  // Provider declines job
  const handleDeclineJob = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'declined' } : j))
    );
    onUpdateBookingStatus?.(id, 'cancelled');
    showToast('Job request declined.');
  };

  // Advance active job status
  const handleAdvanceStatus = (jobId: string, currentStatus: ProviderJob['status']) => {
    let next: ProviderJob['status'] = 'on_the_way';
    let appStatus: Booking['status'] = 'on_the_way';

    if (currentStatus === 'accepted') {
      next = 'on_the_way';
      appStatus = 'on_the_way';
    } else if (currentStatus === 'on_the_way') {
      next = 'arrived';
      appStatus = 'arriving';
    } else if (currentStatus === 'arrived') {
      next = 'in_progress';
      appStatus = 'in_progress';
    } else if (currentStatus === 'in_progress') {
      next = 'completed';
      appStatus = 'completed';
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: next, completedAt: now } : j))
      );
      onUpdateBookingStatus?.(jobId, 'completed');
      showToast('🎉 Job marked completed! Payment credited to your earnings.');
      return;
    }

    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: next } : j))
    );
    onUpdateBookingStatus?.(jobId, appStatus);

    const labels: Record<string, string> = {
      on_the_way: 'Status updated: On the way to customer location',
      arrived: 'Status updated: Arrived at customer location',
      in_progress: 'Status updated: Work inspection started'
    };
    showToast(labels[next] || 'Status updated');
  };

  const handleWithdrawSuccess = (amount: number) => {
    showToast(`₹${amount} transferred to your bank account.`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 font-sans sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in border border-slate-700 max-w-sm text-center">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile Card & Duty Status */}
      <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-emerald-50/70 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex min-w-0 items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-4 ring-emerald-50 sm:h-20 sm:w-20">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
              Provider workspace
            </p>
            <h2 className="text-lg font-extrabold leading-tight text-slate-900 sm:text-2xl">
              Welcome, {user.name || 'Provider'}!
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 sm:text-sm">
                {user.name ? `${user.name}'s Services` : 'Professional Services'}
              </span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Pro
              </span>
            </div>
          </div>
        </div>

        {/* Online / Duty status toggle */}
        <button
          onClick={() => {
            const nextOnline = !isOnline;
            setIsOnline(nextOnline);
            showToast(nextOnline ? 'You are now Online & accepting bookings' : 'Duty Off: Inactive for new requests');
          }}
          className={`flex min-w-24 items-center justify-center gap-2 rounded-2xl border px-4 py-3 transition ${
            isOnline ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-100 border-slate-200'
          }`}
          title="Toggle duty status"
        >
          <span
            className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-200' : 'bg-slate-400'
            }`}
          />
          <span className="text-[10px] font-bold text-slate-700">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </button>
      </div>

      {/* Demo Controls: Simulate Customer Booking & Reset */}
      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50 to-emerald-50 p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <span className="block text-sm font-bold text-teal-950">Try the provider workflow</span>
          <span className="mt-0.5 block text-xs text-teal-800">Add a sample booking request to preview job management.</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleSimulateIncomingBooking}
            className="flex items-center gap-2 rounded-xl bg-[#009688] px-4 py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#00796B] active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Add sample booking</span>
          </button>
          <button
            onClick={handleResetData}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100"
            title="Reset All Data to 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Metric Cards - Defaults to ZERO */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* New Requests */}
        <div
          onClick={() => {
            setJobsModalTab('requests');
            setShowJobsModal(true);
          }}
          className={`flex items-center justify-between rounded-2xl border bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-sm sm:p-5 ${
            pendingCount > 0 ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-200/90'
          }`}
        >
          <span
            className={`order-2 text-3xl font-black leading-none sm:order-1 sm:text-4xl ${
              pendingCount > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-800'
            }`}
          >
            {pendingCount}
          </span>
          <span className="order-1 text-xs font-bold text-slate-600 sm:order-2 sm:text-sm">New Requests</span>
        </div>

        {/* Today's Jobs */}
        <div
          onClick={() => {
            setJobsModalTab('active');
            setShowJobsModal(true);
          }}
          className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-sm sm:p-5"
        >
          <span className="order-2 text-3xl font-black leading-none text-slate-900 sm:order-1 sm:text-4xl">
            {todayJobsCount}
          </span>
          <span className="order-1 text-xs font-bold text-slate-600 sm:order-2 sm:text-sm">Today's Jobs</span>
        </div>

        {/* This Week's Earnings */}
        <div
          onClick={() => setShowEarningsModal(true)}
          className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-sm sm:p-5"
        >
          <span className="order-2 text-3xl font-black leading-none text-emerald-700 sm:order-1 sm:text-4xl">
            ₹{thisWeekEarnings.toLocaleString('en-IN')}
          </span>
          <span className="order-1 text-xs font-bold text-slate-600 sm:order-2 sm:text-sm">This Week's Earnings</span>
        </div>
      </div>

      {/* Primary CTA: "View New Requests (N)" */}
      <button
        onClick={() => {
          setJobsModalTab('requests');
          setShowJobsModal(true);
        }}
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#009688] py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-[#00796B] hover:shadow-lg active:scale-[0.99] sm:w-auto sm:px-7 sm:text-base"
      >
        <span>View New Requests</span>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
            pendingCount > 0 ? 'bg-rose-500 text-white animate-bounce' : 'bg-white/20 text-white'
          }`}
        >
          {pendingCount}
        </span>
      </button>

      {/* CURRENT ACTIVE JOB BANNER (Acceptance Data Highlight) */}
      {activeJobs.length > 0 && (
        <div className="mt-5 space-y-4 rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm animate-in fade-in sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wide">
                Current Active Job
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {activeJobs[0].id}
            </span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-base font-extrabold text-slate-900">{activeJobs[0].customerName}</h4>
              <p className="text-xs font-semibold text-teal-800">{activeJobs[0].category} • ₹{activeJobs[0].amount}</p>
              <p className="text-xs text-slate-600 mt-1 leading-snug">{activeJobs[0].problem}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-medium text-slate-700 truncate">{activeJobs[0].locationArea} ({activeJobs[0].distanceKm} km)</span>
          </div>

          {/* Action buttons: Call, SMS, Advance stage */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setActiveCallContact({ name: activeJobs[0].customerName, phone: activeJobs[0].customerPhone })}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call</span>
            </button>
            <button
              onClick={() => {
                setActiveChatContact({ name: activeJobs[0].customerName, phone: activeJobs[0].customerPhone });
                setChatHistory([
                  { sender: 'customer', text: `Hi! Please let me know when you reach near ${activeJobs[0].locationArea}.` }
                ]);
              }}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Chat</span>
            </button>

            <button
              onClick={() => handleAdvanceStatus(activeJobs[0].id, activeJobs[0].status)}
              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              {activeJobs[0].status === 'accepted' && 'Mark On The Way →'}
              {activeJobs[0].status === 'on_the_way' && 'Mark Arrived →'}
              {activeJobs[0].status === 'arrived' && 'Start Work →'}
              {activeJobs[0].status === 'in_progress' && 'Complete Job & Collect Fee ✓'}
            </button>
          </div>
        </div>
      )}

      {/* Provider Management Menu Cards (The 6 Feature Buttons) */}
      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Your workspace</h3>
            <p className="mt-1 text-sm text-slate-500">Manage jobs, earnings, availability, and your profile.</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">6 tools</span>
        </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {/* 1. My Jobs */}
        <button
          onClick={() => {
            setJobsModalTab(activeJobs.length > 0 ? 'active' : 'requests');
            setShowJobsModal(true);
          }}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Jobs</span>
              <span className="text-[11px] text-slate-500">
                {activeJobs.length} In Progress • {completedJobs.length} Completed
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition" />
        </button>

        {/* 2. My Earnings */}
        <button
          onClick={() => setShowEarningsModal(true)}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Earnings</span>
              <span className="text-[11px] text-slate-500">Weekly bank payout scheduled for Friday</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition" />
        </button>

        {/* 3. My Availability */}
        <button
          onClick={() => setShowAvailabilityModal(true)}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Availability</span>
              <span className="text-[11px] text-slate-500">{availabilitySummary}</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition" />
        </button>

        {/* 4. Customer Reviews */}
        <button
          onClick={() => setShowReviewsModal(true)}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition">
              <Star className="w-5 h-5 fill-purple-600 text-purple-600" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Customer Reviews</span>
              <span className="text-[11px] text-slate-500">★ {rating} Rating ({reviewCount} positive reviews)</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition" />
        </button>

        {/* 5. My Profile & Documents */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-105 transition">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Profile & Documents</span>
              <span className="text-[11px] text-slate-500">Manage rate cards, areas & insurance</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition" />
        </button>

        {/* 6. Help & Support */}
        <button
          onClick={() => setShowSupportModal(true)}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Help & Support</span>
              <span className="text-[11px] text-slate-500">24/7 dedicated pro helpline & safety</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition" />
        </button>
      </div>
      </section>

      {/* =========================================================================
          JOBS MODAL (Incoming Requests + Acceptance Data + Completed Jobs)
         ========================================================================= */}
      {showJobsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Pro Jobs Management</h3>
                <p className="text-xs text-slate-500">Incoming requests, active jobs & acceptance data</p>
              </div>
              <button
                onClick={() => setShowJobsModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 px-4 pt-2 gap-2 bg-slate-50/50">
              <button
                onClick={() => setJobsModalTab('requests')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                  jobsModalTab === 'requests'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>New Requests</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-200 text-slate-800">
                  {pendingCount}
                </span>
              </button>

              <button
                onClick={() => setJobsModalTab('active')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                  jobsModalTab === 'active'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Active & Acceptance</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800">
                  {activeJobs.length}
                </span>
              </button>

              <button
                onClick={() => setJobsModalTab('completed')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                  jobsModalTab === 'completed'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Completed</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-200 text-slate-800">
                  {completedJobs.length}
                </span>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5">
              {/* TAB 1: INCOMING REQUESTS */}
              {jobsModalTab === 'requests' && (
                <>
                  {pendingRequests.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-700">No New Requests Pending</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        When a customer books your service, it will appear here instantly for your acceptance.
                      </p>
                      <button
                        onClick={handleSimulateIncomingBooking}
                        className="mt-2 py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                      >
                        Simulate Customer Booking
                      </button>
                    </div>
                  ) : (
                    pendingRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs hover:border-slate-300 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                              {req.id}
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-sm mt-1">{req.customerName}</h4>
                          </div>
                          <span className="text-sm font-extrabold text-emerald-700">₹{req.amount}</span>
                        </div>

                        <p className="text-xs text-slate-600 font-medium">{req.problem}</p>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal-600" />
                            {req.locationArea} ({req.distanceKm} km)
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                            {req.timeSlot}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => handleAcceptJob(req.id)}
                            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
                          >
                            <Check className="w-4 h-4" />
                            <span>Accept Job</span>
                          </button>
                          <button
                            onClick={() => handleDeclineJob(req.id)}
                            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                          >
                            <X className="w-4 h-4" />
                            <span>Decline</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}

              {/* TAB 2: ACTIVE JOBS (SHOWS COMPLETE ACCEPTANCE DATA) */}
              {jobsModalTab === 'active' && (
                <>
                  {activeJobs.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-700">No Active Jobs Right Now</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Accept incoming requests to view acceptance details, address directions, and start work.
                      </p>
                    </div>
                  ) : (
                    activeJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-4 rounded-3xl border-2 border-emerald-500/40 bg-white space-y-3 shadow-sm"
                      >
                        {/* Acceptance Badge */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                              ✓ Job Accepted & Confirmed
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {job.acceptedAt ? `Accepted at ${job.acceptedAt}` : 'Active'}
                          </span>
                        </div>

                        {/* Customer & Category */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-base">{job.customerName}</h4>
                            <span className="text-xs font-bold text-teal-700">{job.category}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-emerald-700">₹{job.amount}</span>
                            <span className="text-[10px] text-slate-400 block">Payout upon completion</span>
                          </div>
                        </div>

                        {/* Problem */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700">
                          <span className="font-bold text-slate-900 block mb-0.5">Problem Reported:</span>
                          <p>{job.problem}</p>
                        </div>

                        {/* Customer Location */}
                        <div className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100 text-xs space-y-1">
                          <div className="flex items-center justify-between text-teal-900 font-bold">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                              <span>Service Address ({job.distanceKm} km away)</span>
                            </span>
                            <span className="text-teal-700 text-[11px]">{job.timeSlot}</span>
                          </div>
                          <p className="text-slate-700 pl-5.5">{job.locationArea}</p>
                        </div>

                        {/* Action buttons: Call, Chat, Directions */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => setActiveCallContact({ name: job.customerName, phone: job.customerPhone })}
                            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Call ({job.customerPhone})</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveChatContact({ name: job.customerName, phone: job.customerPhone });
                              setChatHistory([
                                { sender: 'customer', text: `Hi! Please let me know when you reach near ${job.locationArea}.` }
                              ]);
                            }}
                            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                            <span>Message Customer</span>
                          </button>
                        </div>

                        {/* Status Progression Stage Button */}
                        <button
                          onClick={() => handleAdvanceStatus(job.id, job.status)}
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm transition flex items-center justify-center gap-2"
                        >
                          {job.status === 'accepted' && (
                            <>
                              <span>Start Journey (Mark On The Way)</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                          {job.status === 'on_the_way' && (
                            <>
                              <span>Mark Arrived at Location</span>
                              <MapPin className="w-4 h-4" />
                            </>
                          )}
                          {job.status === 'arrived' && (
                            <>
                              <span>Start Work & Inspection</span>
                              <Play className="w-4 h-4" />
                            </>
                          )}
                          {job.status === 'in_progress' && (
                            <>
                              <span>Mark Completed & Collect ₹{job.amount}</span>
                              <CheckCircle2 className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}

              {/* TAB 3: COMPLETED JOBS */}
              {jobsModalTab === 'completed' && (
                <>
                  {completedJobs.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-700">No Completed Jobs Yet</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Completed jobs and earnings will be archived here.
                      </p>
                    </div>
                  ) : (
                    completedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-2xs"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {job.id}
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-sm mt-1">{job.customerName}</h4>
                            <span className="text-xs text-teal-700 font-semibold">{job.category}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-emerald-700 block">+₹{job.amount}</span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              ✓ Paid
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">{job.problem}</p>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
                          <span>{job.locationArea}</span>
                          <span>{job.completedAt ? `Completed at ${job.completedAt}` : 'Completed'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Live booking synchronization enabled</span>
              <button
                onClick={() => setShowJobsModal(false)}
                className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          THE 5 FEATURE MODALS
         ========================================================================= */}

      {/* 1. My Earnings Modal */}
      <ProviderEarningsModal
        isOpen={showEarningsModal}
        onClose={() => setShowEarningsModal(false)}
        availableBalance={thisWeekEarnings}
        totalEarnings={thisWeekEarnings}
        completedJobsCount={completedJobs.length}
        onWithdrawSuccess={handleWithdrawSuccess}
      />

      {/* 2. My Availability Modal */}
      <ProviderAvailabilityModal
        isOpen={showAvailabilityModal}
        onClose={() => setShowAvailabilityModal(false)}
        currentScheduleText={availabilitySummary}
        isOnlineInitial={isOnline}
        onSaveSchedule={(newSummary, onlineState) => {
          setAvailabilitySummary(newSummary);
          setIsOnline(onlineState);
          showToast(`Schedule saved: ${newSummary}`);
        }}
      />

      {/* 3. Customer Reviews Modal */}
      <ProviderReviewsModal
        isOpen={showReviewsModal}
        onClose={() => setShowReviewsModal(false)}
        rating={rating}
        reviewCount={reviewCount}
      />

      {/* 4. My Profile & Documents Modal */}
      <ProviderProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
      />

      {/* 5. Help & Support Modal */}
      <ProviderSupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />

      {/* Simulated Customer Call Modal */}
      {activeCallContact && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xs w-full p-6 text-center space-y-5 shadow-2xl border border-slate-800 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <Phone className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h4 className="text-base font-extrabold">{activeCallContact.name}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{activeCallContact.phone}</p>
              <span className="text-[11px] text-emerald-400 mt-2 block font-medium">Connecting call via masked number...</span>
            </div>
            <button
              onClick={() => setActiveCallContact(null)}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Simulated Customer Chat Modal */}
      {activeChatContact && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full h-[450px] flex flex-col shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-teal-700 text-white rounded-t-3xl">
              <div>
                <h4 className="text-xs font-bold leading-tight">{activeChatContact.name}</h4>
                <span className="text-[10px] text-teal-200">{activeChatContact.phone}</span>
              </div>
              <button
                onClick={() => setActiveChatContact(null)}
                className="p-1 text-teal-200 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-2.5 bg-slate-50 text-xs">
              {chatHistory.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === 'pro' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-2xl ${
                      m.sender === 'pro'
                        ? 'bg-teal-600 text-white rounded-br-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!chatMessageInput.trim()) return;
                setChatHistory((prev) => [...prev, { sender: 'pro', text: chatMessageInput.trim() }]);
                setChatMessageInput('');
                setTimeout(() => {
                  setChatHistory((prev) => [
                    ...prev,
                    { sender: 'customer', text: 'Okay, sounds good! Thanks for updating.' }
                  ]);
                }, 1000);
              }}
              className="p-3 border-t border-slate-100 bg-white flex gap-2"
            >
              <input
                type="text"
                value={chatMessageInput}
                onChange={(e) => setChatMessageInput(e.target.value)}
                placeholder="Type message to customer..."
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-teal-600"
              />
              <button
                type="submit"
                className="py-1.5 px-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
