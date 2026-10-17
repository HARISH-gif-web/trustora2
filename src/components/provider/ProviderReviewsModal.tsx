import React, { useState } from 'react';
import {
  X,
  Star,
  MessageCircle,
  ThumbsUp,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
  Filter
} from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  serviceCategory: string;
  comment: string;
  providerReply?: string;
  helpfulCount: number;
}

interface ProviderReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating?: number;
  reviewCount?: number;
}

export const ProviderReviewsModal: React.FC<ProviderReviewsModalProps> = ({
  isOpen,
  onClose,
  rating = 4.8,
  reviewCount = 320
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | '4star' | 'unanswered'>('all');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'REV-1',
      customerName: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      date: '2 days ago',
      serviceCategory: 'Electrician • Geyser Repair',
      comment: 'Very polite, prompt and highly skilled! Fixed the geyser thermostat tripping issue in less than 25 minutes. Also verified all earthing wiring safely.',
      providerReply: 'Thank you Ananya ji! Glad we could solve the water heater issue before winter. Stay safe!',
      helpfulCount: 14
    },
    {
      id: 'REV-2',
      customerName: 'Karthik Ramanathan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      date: 'Dec 14, 2026',
      serviceCategory: 'Electrician • MCB Tripping',
      comment: 'Arrived exactly at the scheduled 11:00 AM slot. Had professional insulated tools and diagnosed the hidden wall dampness causing leakage. 10/10 recommend!',
      helpfulCount: 8
    },
    {
      id: 'REV-3',
      customerName: 'Pooja Reddy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      rating: 4,
      date: 'Dec 10, 2026',
      serviceCategory: 'Electrician • Ceiling Fan & Switchboard',
      comment: 'Replaced two heavy ceiling fans neatly. Good clean work. Just took 10 minutes longer due to traffic, but communicated ahead of time.',
      providerReply: 'Thank you Pooja for the kind words! Sorry about the Hyderabad traffic delay, glad the fans are running smooth.',
      helpfulCount: 5
    },
    {
      id: 'REV-4',
      customerName: 'Vikram Patel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 5,
      date: 'Dec 05, 2026',
      serviceCategory: 'Electrician • Inverter & Battery Wiring',
      comment: 'Excellent knowledge of home inverter load balance. Clean wire casing and zero clutter left on the floor.',
      helpfulCount: 11
    }
  ]);

  if (!isOpen) return null;

  const quickReplies = [
    'Thank you so much for your trust and kind words! 🙏',
    'Glad we could resolve the issue quickly! Stay safe.',
    'Always happy to deliver 5-star service. Have a great day!',
    'Appreciate your valuable review! Warm regards.'
  ];

  const handlePostReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, providerReply: replyText.trim() } : r))
    );
    setReplyingToId(null);
    setReplyText('');
    setToastMessage('Your reply has been posted to the customer review.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShareReviewLink = () => {
    navigator.clipboard?.writeText?.('https://trustora.app/pro/reviews/mohammed-asif');
    setToastMessage('Review link copied to clipboard! Send to your customers.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5star') return r.rating === 5;
    if (activeFilter === '4star') return r.rating === 4;
    if (activeFilter === 'unanswered') return !r.providerReply;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Star className="w-5 h-5 fill-purple-600 text-purple-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Customer Reviews</h3>
              <p className="text-xs text-slate-500">★ {rating} Rating ({reviewCount} positive reviews)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating Overview Card */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-2xs shrink-0">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 leading-none block">
                {rating}
              </span>
              <div className="flex items-center justify-center gap-0.5 text-amber-500 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                {reviewCount} Reviews
              </span>
            </div>

            <div className="flex-1 space-y-1.5 text-xs">
              {[
                { stars: 5, pct: '82%', count: 262 },
                { stars: 4, pct: '14%', count: 45 },
                { stars: 3, pct: '3%', count: 10 },
                { stars: 2, pct: '1%', count: 3 }
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="w-4 font-bold text-slate-600 text-[11px] text-right">{item.stars}★</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: item.pct }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 w-8 text-right">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-200/60">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Verified Customer Feedback
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Top 5% Pro in Hyderabad
            </span>
          </div>
        </div>

        {/* Filter Tabs & Share Link */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-100 bg-white">
          <div className="flex gap-1 overflow-x-auto text-xs">
            {[
              { id: 'all', label: `All (${reviews.length})` },
              { id: '5star', label: '5 Stars' },
              { id: '4star', label: '4 Stars' },
              { id: 'unanswered', label: 'Needs Reply' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${
                  activeFilter === f.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleShareReviewLink}
            className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 shrink-0 ml-2"
            title="Request Review from Customer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Request Review</span>
          </button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Reviews List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No reviews match the selected filter.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-2xs hover:border-slate-300 transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.customerName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-100"
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{rev.customerName}</h4>
                      <span className="text-[10px] font-semibold text-purple-700 block">
                        {rev.serviceCategory}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{rev.date}</span>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed font-normal">{rev.comment}</p>

                {/* Provider Reply Display */}
                {rev.providerReply && (
                  <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-900 font-bold text-[11px]">
                      <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                      <span>Your Response</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed">{rev.providerReply}</p>
                  </div>
                )}

                {/* Reply action or Editor */}
                {replyingToId === rev.id ? (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      Reply to {rev.customerName}
                    </span>

                    {/* Quick reply chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {quickReplies.map((qr, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setReplyText(qr)}
                          className="text-[10px] bg-white border border-slate-200 hover:border-purple-300 text-slate-600 hover:text-purple-700 px-2 py-1 rounded-md transition"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply to customer..."
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg outline-hidden focus:border-purple-500"
                      />
                      <button
                        onClick={() => handlePostReply(rev.id)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send</span>
                      </button>
                      <button
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyText('');
                        }}
                        className="px-2 py-1.5 text-xs text-slate-400 hover:bg-slate-200 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {rev.helpfulCount} people found this helpful
                    </span>

                    {!rev.providerReply && (
                      <button
                        onClick={() => {
                          setReplyingToId(rev.id);
                          setReplyText('');
                        }}
                        className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Reviews update automatically after completed jobs</span>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
