import React, { useState, useEffect } from 'react';
import {
  X,
  HelpCircle,
  Phone,
  MessageCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  Mic,
  MicOff,
  Volume2,
  Clock,
  ShieldAlert,
  Headphones
} from 'lucide-react';

interface ProviderSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProviderSupportModal: React.FC<ProviderSupportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'options' | 'faq' | 'ticket'>('options');
  const [showCallModal, setShowCallModal] = useState(false);
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Chat modal state
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'agent'; text: string; time: string }[]>([
    {
      sender: 'agent',
      text: 'Hello Mohammed Asif! This is Trustora Pro 24/7 Helpline. How can we assist you with your active jobs or payouts today?',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // SOS state
  const [sosTriggered, setSosTriggered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ticket form state
  const [ticketCategory, setTicketCategory] = useState('Payment Dispute');
  const [ticketBookingId, setTicketBookingId] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [createdTickets, setCreatedTickets] = useState<{ id: string; category: string; status: string; date: string }[]>([
    {
      id: 'TKT-9921',
      category: 'Address Mislocation Dispute',
      status: 'Resolved',
      date: 'Dec 12, 2026'
    }
  ]);

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'When and how are my weekly earnings paid to my bank?',
      a: 'All completed job earnings are automatically transferred to your verified primary bank account every Friday at 11:59 PM. Alternatively, you can use the "Instant Bank Transfer" button in My Earnings to withdraw funds anytime without waiting.'
    },
    {
      q: 'What should I do if the customer asks for extra electrical or repair work?',
      a: 'If a customer requests additional tasks outside the initial booking, explain your standard hourly rate (e.g. ₹250/hr). You can add additional labor charges at job completion or ask the customer to add it through their Trustora app.'
    },
    {
      q: 'What if a customer is not at home or not picking up the phone?',
      a: 'Wait at the customer location for 10 minutes and try calling them via the Trustora Pro app. If there is no response after 10 minutes, tap "Customer Unreachable" to collect the standard visit compensation fee.'
    },
    {
      q: 'How does the ₹10 Lakh Trustora Insurance Shield protect me?',
      a: 'As an active verified pro, you are automatically covered while traveling to or working on any job booked via Trustora. It covers accidental tool damage, third-party property damage, and personal medical expenses.'
    },
    {
      q: 'How can I dispute an unfair customer rating or false complaint?',
      a: 'Navigate to "Customer Reviews" and reply professionally to the review. If you believe the review violates community guidelines or was malicious, raise a support ticket under "Rating Dispute" with job photos.'
    }
  ];

  // Call timer effect
  useEffect(() => {
    let timer: any;
    if (showCallModal && callState === 'connected') {
      timer = setInterval(() => setCallSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showCallModal, callState]);

  if (!isOpen) return null;

  const handleStartCall = () => {
    setShowCallModal(true);
    setCallState('ringing');
    setCallSeconds(0);
    setTimeout(() => {
      setCallState('connected');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      setShowCallModal(false);
      setCallSeconds(0);
    }, 1000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' }
    ]);
    setChatInput('');

    setTimeout(() => {
      let reply = 'Thank you for contacting pro support. Our dispatch supervisor is reviewing your job details. We have your GPS location logged.';
      if (userMsg.toLowerCase().includes('money') || userMsg.toLowerCase().includes('payout') || userMsg.toLowerCase().includes('earning')) {
        reply = 'Your earnings are safe with Trustora Escrow. Bank payouts are processed automatically every Friday night, or you can withdraw instantly from your My Earnings tab.';
      } else if (userMsg.toLowerCase().includes('customer') || userMsg.toLowerCase().includes('address')) {
        reply = 'We can initiate a conference call with the customer right now or adjust your ETA without penalty.';
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'agent', text: reply, time: 'Just now' }
      ]);
    }, 1200);
  };

  const handleTriggerSos = () => {
    setSosTriggered(true);
    setTimeout(() => {
      setToastMessage('SOS Alert Sent! Trustora Emergency Dispatch Team & local authorities have been notified with your GPS coordinates.');
      setTimeout(() => {
        setSosTriggered(false);
      }, 4000);
    }, 1500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    const newId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedTickets([
      {
        id: newId,
        category: ticketCategory,
        status: 'Open (Under Review)',
        date: 'Today'
      },
      ...createdTickets
    ]);
    setTicketMessage('');
    setTicketBookingId('');
    setToastMessage(`Support ticket ${newId} submitted. A manager will reply within 2 hours.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Pro Help & Support</h3>
              <p className="text-xs text-slate-500">24/7 dedicated pro helpline & safety</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-4 pt-2 gap-2 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('options')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'options'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Support Channels
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'faq'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Pro FAQs
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'ticket'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Raise Ticket
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 1: SUPPORT CHANNELS */}
          {activeTab === 'options' && (
            <div className="space-y-4">
              {/* Emergency SOS Banner */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-rose-900 uppercase tracking-wide">
                      Emergency SOS & Field Safety
                    </h4>
                    <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                      Instant distress signal to Trustora Safety Cell & cyberabad emergency patrol.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleTriggerSos}
                  disabled={sosTriggered}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition shrink-0 active:scale-95"
                >
                  {sosTriggered ? 'Sending SOS...' : 'SOS Alert'}
                </button>
              </div>

              {/* Direct Pro Helpline Call */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Direct 24/7 Pro Helpline</h4>
                      <span className="text-[11px] text-slate-500">Toll-free: 1800-889-TRUST (1800-889-7878)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Avg wait &lt; 30s
                  </span>
                </div>
                <button
                  onClick={handleStartCall}
                  className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Pro Support Now</span>
                </button>
              </div>

              {/* Live Chat with Pro Operations */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 transition shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Live Support Chat</h4>
                      <span className="text-[11px] text-slate-500">Quick answers on active bookings & navigation</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
                </div>
                <button
                  onClick={() => setShowChatModal(true)}
                  className="w-full mt-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open Live Pro Chat</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PRO FAQS */}
          {activeTab === 'faq' && (
            <div className="space-y-2.5">
              {faqs.map((item, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition"
                    >
                      <span className="text-xs font-bold text-slate-900">{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: RAISE TICKET */}
          {activeTab === 'ticket' && (
            <div className="space-y-4">
              <form onSubmit={handleCreateTicket} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Issue Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-blue-500 bg-white"
                  >
                    <option>Payment / Weekly Payout Discrepancy</option>
                    <option>Customer Unreachable / Cancellation Compensation</option>
                    <option>Extra Work Labor Dispute</option>
                    <option>Insurance Claim for Accidental Damage</option>
                    <option>Rating Dispute / Inappropriate Feedback</option>
                    <option>App Technical Problem</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Booking ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={ticketBookingId}
                    onChange={(e) => setTicketBookingId(e.target.value)}
                    placeholder="e.g. REQ-101 or BK-TR-8942"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Describe the Issue</label>
                  <textarea
                    rows={3}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Provide details about what occurred..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Submit Support Ticket
                </button>
              </form>

              {/* Existing tickets list */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Your Recent Tickets</span>
                {createdTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-800">{t.id}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">{t.category}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          t.status.includes('Resolved')
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {t.status}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Trustora Field Ops: Hyderabad Station Active</span>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Live Phone Call Simulator */}
      {showCallModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xs w-full p-6 text-center space-y-6 shadow-2xl border border-slate-800 animate-in zoom-in-95">
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 ring-8 ring-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                <Headphones className="w-8 h-8" />
              </div>
              <h4 className="text-base font-extrabold">Trustora Pro Helpline</h4>
              <p className="text-xs text-slate-400">
                {callState === 'ringing' && 'Connecting to Senior Pro Agent...'}
                {callState === 'connected' && `Agent Priya Connected • ${Math.floor(callSeconds / 60)}:${(callSeconds % 60).toString().padStart(2, '0')}`}
                {callState === 'ended' && 'Call Ended'}
              </p>
            </div>

            {callState === 'connected' && (
              <div className="flex justify-center gap-1 items-end h-8">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-blue-400 rounded-full animate-pulse"
                    style={{
                      height: `${Math.floor(20 + Math.random() * 80)}%`,
                      animationDelay: `${i * 100}ms`
                    }}
                  ></div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition ${
                  isMuted ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={handleEndCall}
                className="p-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition shadow-lg active:scale-95"
              >
                <Phone className="w-6 h-6 rotate-[135deg]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Drawer */}
      {showChatModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full h-[550px] flex flex-col shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-teal-700 text-white rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold leading-tight">Pro Operations Live Chat</h4>
                  <span className="text-[10px] text-teal-200 block">Hyderabad Field Support Station</span>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 text-teal-200 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-teal-600 text-white rounded-br-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        msg.sender === 'user' ? 'text-teal-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask support about payouts, address, delays..."
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-teal-600"
              />
              <button
                type="submit"
                className="p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
