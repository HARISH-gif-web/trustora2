import React, { useState } from 'react';
import {
  X,
  Clock,
  Calendar,
  Check,
  CheckCircle2,
  Power,
  Sliders,
  Plane,
  AlertCircle
} from 'lucide-react';

interface DaySchedule {
  day: string;
  label: string;
  enabled: boolean;
  start: string;
  end: string;
}

interface ProviderAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScheduleText: string;
  onSaveSchedule: (newScheduleSummary: string, isOnline: boolean) => void;
  isOnlineInitial?: boolean;
}

export const ProviderAvailabilityModal: React.FC<ProviderAvailabilityModalProps> = ({
  isOpen,
  onClose,
  currentScheduleText,
  onSaveSchedule,
  isOnlineInitial = true
}) => {
  const [isOnline, setIsOnline] = useState(isOnlineInitial);
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationEnd, setVacationEnd] = useState('2026-12-25');
  const [maxJobsPerDay, setMaxJobsPerDay] = useState(6);
  const [bufferTimeMinutes, setBufferTimeMinutes] = useState(30);
  const [showToast, setShowToast] = useState(false);

  const [days, setDays] = useState<DaySchedule[]>([
    { day: 'Mon', label: 'Monday', enabled: true, start: '09:00 AM', end: '07:00 PM' },
    { day: 'Tue', label: 'Tuesday', enabled: true, start: '09:00 AM', end: '07:00 PM' },
    { day: 'Wed', label: 'Wednesday', enabled: true, start: '09:00 AM', end: '07:00 PM' },
    { day: 'Thu', label: 'Thursday', enabled: true, start: '09:00 AM', end: '07:00 PM' },
    { day: 'Fri', label: 'Friday', enabled: true, start: '09:00 AM', end: '07:00 PM' },
    { day: 'Sat', label: 'Saturday', enabled: true, start: '09:00 AM', end: '07:00 PM' },
    { day: 'Sun', label: 'Sunday', enabled: false, start: '10:00 AM', end: '04:00 PM' }
  ]);

  if (!isOpen) return null;

  const toggleDay = (index: number) => {
    setDays((prev) =>
      prev.map((d, i) => (i === index ? { ...d, enabled: !d.enabled } : d))
    );
  };

  const handleApplyHoursToAll = (start: string, end: string) => {
    setDays((prev) =>
      prev.map((d) => ({
        ...d,
        start,
        end
      }))
    );
  };

  const handleSave = () => {
    const enabledDays = days.filter((d) => d.enabled);
    let summary = 'Custom Availability';
    if (vacationMode) {
      summary = `On Leave until ${vacationEnd}`;
    } else if (enabledDays.length === 6 && !days.find((d) => d.day === 'Sun')?.enabled) {
      summary = `Mon - Sat: ${days[0].start} - ${days[0].end}`;
    } else if (enabledDays.length === 7) {
      summary = `All 7 Days: ${days[0].start} - ${days[0].end}`;
    } else if (enabledDays.length > 0) {
      summary = `${enabledDays.map((d) => d.day).join(', ')}: ${enabledDays[0].start} - ${enabledDays[0].end}`;
    } else {
      summary = 'Temporarily Unavailable';
    }

    onSaveSchedule(summary, isOnline && !vacationMode);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">My Availability & Schedule</h3>
              <p className="text-xs text-slate-500">Configure your active hours & booking slots</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {showToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Availability preferences updated successfully!</span>
            </div>
          )}

          {/* Master Live Duty Toggle */}
          <div
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
              isOnline && !vacationMode
                ? 'bg-emerald-50/60 border-emerald-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isOnline && !vacationMode
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-300 text-slate-600'
                }`}
              >
                <Power className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">
                  {isOnline && !vacationMode ? 'Online • Accepting Instant Bookings' : 'Duty Off • Not Accepting Requests'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isOnline && !vacationMode
                    ? 'Customers in your area can discover and book your services'
                    : 'Turn on when you are ready to receive job notifications'}
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
              <input
                type="checkbox"
                checked={isOnline && !vacationMode}
                onChange={(e) => {
                  setIsOnline(e.target.checked);
                  if (e.target.checked) setVacationMode(false);
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Vacation Mode Toggle */}
          <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Plane className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-900 block">Vacation / Leave Mode</span>
                <span className="text-[10px] text-amber-700">Pause incoming requests during holidays</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={vacationMode}
                onChange={(e) => setVacationMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {/* Weekly Days Schedule */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Weekly Working Days</span>
              <button
                type="button"
                onClick={() => handleApplyHoursToAll('09:00 AM', '07:00 PM')}
                className="text-[11px] font-bold text-amber-700 hover:text-amber-800"
              >
                Reset to Standard (9 AM - 7 PM)
              </button>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40">
              {days.map((item, index) => (
                <div
                  key={item.day}
                  className={`p-3 flex items-center justify-between transition ${
                    item.enabled ? 'bg-white' : 'bg-slate-50/70 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleDay(index)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition ${
                        item.enabled ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {item.enabled && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{item.label}</span>
                      <span className="text-[10px] text-slate-500">
                        {item.enabled ? `${item.start} to ${item.end}` : 'Day Off / Closed'}
                      </span>
                    </div>
                  </div>

                  {item.enabled && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <select
                        value={item.start}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDays((prev) =>
                            prev.map((d, i) => (i === index ? { ...d, start: val } : d))
                          );
                        }}
                        className="px-2 py-1 bg-slate-100 rounded-md text-[11px] font-semibold text-slate-700 border-none outline-hidden"
                      >
                        <option>08:00 AM</option>
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                      </select>
                      <span className="text-slate-400 text-xs">-</span>
                      <select
                        value={item.end}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDays((prev) =>
                            prev.map((d, i) => (i === index ? { ...d, end: val } : d))
                          );
                        }}
                        className="px-2 py-1 bg-slate-100 rounded-md text-[11px] font-semibold text-slate-700 border-none outline-hidden"
                      >
                        <option>05:00 PM</option>
                        <option>06:00 PM</option>
                        <option>07:00 PM</option>
                        <option>08:00 PM</option>
                        <option>09:00 PM</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preferences: Max Jobs & Buffer Time */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Daily Job Limit</span>
                <span className="text-xs font-extrabold text-amber-700">{maxJobsPerDay} Jobs</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={maxJobsPerDay}
                onChange={(e) => setMaxJobsPerDay(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Prevents overbooking</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Travel Buffer</span>
                <span className="text-xs font-extrabold text-amber-700">{bufferTimeMinutes} Mins</span>
              </div>
              <div className="flex gap-1 pt-1">
                {[15, 30, 45].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setBufferTimeMinutes(mins)}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                      bufferTimeMinutes === mins
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 block">Rest between jobs</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Auto-synced with seeker booking slots</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="py-2 px-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl transition shadow-xs"
            >
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
