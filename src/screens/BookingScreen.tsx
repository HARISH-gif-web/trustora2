import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Camera,
  Star,
  CheckCircle2,
  Trash2,
  Sparkles,
  Info,
  MapPin,
  X
} from 'lucide-react';
import { Professional, UserProfile, Booking } from '../types';

interface BookingScreenProps {
  professional: Professional;
  user: UserProfile;
  onBack: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  professional,
  user,
  onBack,
  onConfirmBooking
}) => {
  const [selectedDate, setSelectedDate] = useState('Today Dec 20');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [problemDescription, setProblemDescription] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Service address state - starts EMPTY
  const [serviceAddress, setServiceAddress] = useState(user.selectedAddress || '');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const addressTextareaRef = useRef<HTMLTextAreaElement>(null);

  // AI Auto-Describe state
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const categoryPresets: Record<string, string[]> = {
    Electrician: [
      'Main circuit breaker (MCB) tripping repeatedly under load. Need comprehensive load diagnostics, wire insulation test, and safety earthing check.',
      'Ceiling fan making vibrating humming sound and running at erratic speeds. Need motor capacitor test, regulator replacement, and hook inspection.',
      'Wall switchboard sparking with burning odor near bedroom power socket. Request urgent diagnostic inspection, switch replacement, and short circuit prevention.',
      'Geyser thermostat tripped and water is not heating. Need heating element continuity test and power wiring check.'
    ],
    Plumber: [
      'Kitchen sink drainage line leaking into under-sink cabinet. Faucet cartridge loose and needs washer replacement and pipe re-threading.',
      'Bathroom overhead shower low pressure flow with continuous tap drip. Need pipeline descaling, pressure valve inspection, and cartridge renewal.',
      'Toilet flush tank continuously running water into bowl with slow refilling valve. Need siphon mechanism overhaul and float valve adjustment.'
    ],
    'AC Service': [
      'Split AC unit blowing room temperature air with weak cooling airflow. Ice forming on condenser copper piping, requiring foam jet cleaning and gas refill.',
      'Indoor AC unit leaking water down the interior bedroom wall. Drain pipe clogged, requiring high-pressure jet wash and drain clearing.'
    ],
    Cleaning: [
      'Full home deep sanitation required for 2BHK including tile grout scrub, kitchen chimney oil grease removal, and anti-bacterial bathroom wash.'
    ],
    Carpenter: [
      'Wooden wardrobe sliding door hinges misaligned and sticking to track. Hydraulic bed lift mechanism stiff, needs realignment and hinge overhaul.'
    ],
    'Appliance Repair': [
      'Front-load washing machine vibrating excessively during spin cycle and making metallic knocking sound. Drum suspension check needed.'
    ]
  };

  const currentPresets = categoryPresets[professional.categoryName] || [
    `Comprehensive diagnostic assessment required for ${professional.categoryName}. Inspect all components, identify faulty parts, and complete repairs safely.`
  ];

  const handleAiAutoDescribe = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      if (problemDescription.trim()) {
        setProblemDescription(
          `Diagnostic Request: ${problemDescription.trim()}. Needs comprehensive troubleshooting, certified professional component inspection, safety verification, and full restoration of service.`
        );
      } else {
        const randomPreset = currentPresets[Math.floor(Math.random() * currentPresets.length)];
        setProblemDescription(randomPreset);
      }
      setIsGeneratingAi(false);
    }, 500);
  };

  const dates = [
    { label: 'Today', date: 'Dec 20' },
    { label: 'Tomorrow', date: 'Dec 21' },
    { label: 'Sun', date: 'Dec 22' },
    { label: 'Mon', date: 'Dec 23' },
  ];

  const times = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

  // Pricing breakdown
  const visitCharge = professional.visitCharge;
  const safetyFee = 29;
  const taxes = 18;
  const discount = 50; // New customer discount
  const totalAmount = visitCharge + safetyFee + taxes - discount;

  const handlePhotoAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (uploadedPhotos.length >= 3) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUploadedPhotos((prev) => [...prev.slice(0, 2), ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  // Real browser GPS with exact reverse geocoding
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              { headers: { 'Accept-Language': 'en' } }
            );
            const data = await res.json();
            if (data && data.address) {
              const a = data.address;
              const building = a.building || a.house_number || a.subdivision || '';
              const road = a.road || a.street || a.pedestrian || '';
              const area = a.suburb || a.neighbourhood || a.residential || a.subdistrict || '';
              const city = a.city || a.town || a.municipality || a.county || 'Hyderabad';
              const postcode = a.postcode ? ` - ${a.postcode}` : '';
              const parts = [building, road, area, city].filter(Boolean);
              setServiceAddress(parts.length > 1 ? parts.join(', ') + postcode : data.display_name);
            } else if (data && data.display_name) {
              setServiceAddress(data.display_name);
            } else {
              setServiceAddress(`Exact GPS Location: ${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E`);
            }
          } catch (e) {
            setServiceAddress(`Exact GPS Location: ${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E`);
          }
          setIsDetectingLocation(false);
          setLocationDetected(true);
        },
        (error) => {
          setIsDetectingLocation(false);
          if (error.code === error.PERMISSION_DENIED) {
            alert('Location access was denied. Please allow location permissions in your browser or enter your address manually.');
          } else {
            alert('Unable to retrieve your current location. Please enter your address manually.');
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setIsDetectingLocation(false);
      alert('Geolocation is not supported by your browser. Please enter your address manually.');
    }
  };

  const handleFocusManual = () => {
    addressTextareaRef.current?.focus();
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: `BK-TR-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceCategory: professional.categoryName,
        professionalId: professional.id,
        professionalName: professional.name,
        professionalAvatar: professional.avatar,
        professionalPhone: professional.phone,
        customerId: user.id,
        customerName: user.name,
        customerPhone: user.phone,
        customerAddress: serviceAddress.trim() || user.selectedAddress || 'Customer Service Address',
        date: selectedDate,
        timeSlot: selectedTime,
        problemDescription: problemDescription || 'General diagnostic inspection & repair',
        problemPhotos: uploadedPhotos,
        status: 'on_the_way',
        statusTimestamps: {
          confirmedTime: '10:00 AM',
          onTheWayTime: '10:20 AM',
          arrivingTime: '10:35 AM'
        },
        etaMinutes: 5,
        pricing: {
          visitCharge,
          serviceFee: safetyFee,
          taxes,
          discount,
          totalAmount
        }
      };

      setIsSubmitting(false);
      onConfirmBooking(newBooking);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 font-sans">
      {/* Top Bar (Screen 8 in wireframe) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">Book Service</h1>
          </div>
          <span className="text-xs text-slate-400 font-mono">Step 1 of 1</span>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-4 space-y-4">
        {/* Professional Summary Card (Screen 8) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center gap-3.5">
          <img
            src={professional.avatar}
            alt={professional.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-50 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
              {professional.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{professional.rating}</span>
              <span className="text-slate-400">({professional.reviewCount} reviews)</span>
            </div>
            <div className="text-xs font-extrabold text-teal-800 mt-1">
              ₹{professional.visitCharge} <span className="font-normal text-slate-500">Visit charge</span>
            </div>
          </div>
        </div>

        {/* Select Date & Time (Screen 8) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Select Date & Time</span>
          </h3>

          {/* Date Chips */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {dates.map((d) => {
              const fullKey = `${d.label} ${d.date}`;
              const isSelected = selectedDate === fullKey;
              return (
                <button
                  key={fullKey}
                  type="button"
                  onClick={() => setSelectedDate(fullKey)}
                  className={`py-2 px-1 rounded-2xl text-center border transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-[11px] font-medium leading-none mb-1 opacity-90">
                    {d.label}
                  </span>
                  <span className="block text-xs font-bold leading-none">{d.date}</span>
                </button>
              );
            })}
          </div>

          {/* Time Slot Chips */}
          <div className="grid grid-cols-4 gap-2">
            {times.map((t) => {
              const isSelected = selectedTime === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-1 rounded-2xl text-center text-xs font-bold border transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Details & Photo Upload (Screen 8) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Service Details
            </h3>
            <button
              type="button"
              onClick={handleAiAutoDescribe}
              disabled={isGeneratingAi}
              className="py-1 px-3 rounded-full bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700 active:scale-95 text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : 'fill-white'}`} />
              <span>{isGeneratingAi ? 'AI Generating...' : '✨ AI Auto-Describe'}</span>
            </button>
          </div>

          <textarea
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            rows={3}
            placeholder="Describe your problem or tap 'AI Auto-Describe' above to generate description..."
            className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-hidden focus:border-teal-600 focus:bg-white transition resize-none"
          />

          {/* Quick AI Presets for this category */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            <span className="text-[10px] font-bold text-amber-700 flex items-center gap-0.5 shrink-0">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
              AI Suggestions:
            </span>
            {currentPresets.slice(0, 3).map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setProblemDescription(preset)}
                className="px-2.5 py-1 rounded-xl bg-amber-50/80 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-semibold transition shrink-0 cursor-pointer text-left truncate max-w-[210px]"
                title={preset}
              >
                {preset.slice(0, 32)}...
              </button>
            ))}
          </div>

          {/* Add Photos (Optional) - Opens local disk */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-teal-600" />
                Add Photos (Optional)
              </span>
              <span className="text-[11px] text-teal-700 font-medium">AI Visual Diagnosis</span>
            </div>

            {/* Photo previews & file picker button */}
            <div className="flex items-center gap-2 flex-wrap">
              {uploadedPhotos.map((url, i) => (
                <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden ring-1 ring-slate-200">
                  <img src={url} alt="Problem preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(i)}
                    className="absolute top-1 right-1 p-0.5 bg-black/60 rounded-full text-white hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {uploadedPhotos.length < 3 && (
                <button
                  type="button"
                  onClick={handlePhotoAttach}
                  className="w-16 h-16 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 hover:bg-teal-100/50 text-teal-700 flex flex-col items-center justify-center text-[10px] font-bold transition cursor-pointer"
                >
                  <Camera className="w-4 h-4 mb-0.5 text-teal-600" />
                  <span>+ Photo</span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Address card with location + manual entry */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Service Address
            </span>
            {locationDetected && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                GPS Detected
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mb-2.5">
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                locationDetected
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-teal-50 border-teal-300 text-teal-800 hover:bg-teal-100'
              }`}
            >
              {isDetectingLocation ? (
                <div className="w-3.5 h-3.5 border-2 border-teal-400 border-t-teal-700 rounded-full animate-spin" />
              ) : (
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
              )}
              <span>{isDetectingLocation ? 'Detecting GPS...' : 'Use My Location'}</span>
            </button>

            <button
              type="button"
              onClick={handleFocusManual}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Enter Manually</span>
            </button>
          </div>

          {/* Always-Visible, Editable Service Address Textarea */}
          <div className="relative">
            <textarea
              ref={addressTextareaRef}
              value={serviceAddress}
              onChange={(e) => {
                setServiceAddress(e.target.value);
                setLocationDetected(false);
              }}
              placeholder="Enter flat / house no, building, street, area, city & pincode"
              rows={2}
              className="w-full p-3 pr-8 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100 transition resize-none shadow-2xs font-medium text-slate-800"
              required
            />
            {serviceAddress && (
              <button
                type="button"
                onClick={() => {
                  setServiceAddress('');
                  setLocationDetected(false);
                  addressTextareaRef.current?.focus();
                }}
                className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                title="Clear address"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Transparent Price Breakdown */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Payment Summary
          </h3>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Visit / Diagnostic Charge</span>
            <span className="font-semibold text-slate-900">₹{visitCharge}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Safety & Protection Fee</span>
            <span className="font-semibold text-slate-900">₹{safetyFee}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Taxes & GST (18%)</span>
            <span className="font-semibold text-slate-900">₹{taxes}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
            <span>First Booking Promo Discount</span>
            <span>-₹{discount}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm font-black text-slate-900">
            <span>Total Payable Amount</span>
            <span className="text-base text-teal-800">₹{totalAmount}</span>
          </div>

          <div className="mt-2 p-2 rounded-xl bg-teal-50 border border-teal-100 text-[11px] text-teal-800 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-600" />
            <span>
              The ₹{visitCharge} visit charge will be adjusted into your final repair invoice.
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Confirm Button (Screen 8 in wireframe) */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200/90 p-4 shadow-lg z-40">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Pay via Cash / UPI</span>
            <span className="text-lg font-black text-slate-900">₹{totalAmount}</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 max-w-xs py-3.5 bg-[#009688] hover:bg-[#00796B] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
