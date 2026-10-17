import React, { useState, useRef } from 'react';
import { User, Phone, ArrowRight, Camera, X, MapPin, CheckCircle2 } from 'lucide-react';
import { TrustoraLogo } from '../components/TrustoraLogo';
import { UserRole, UserProfile } from '../types';
import { INITIAL_USER, INITIAL_PROVIDER_USER, SERVICE_CATEGORIES } from '../data/mockData';

interface AuthScreenProps {
  initialRole: UserRole;
  onSuccess: (user: UserProfile) => void;
  onBackToRoles: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialRole,
  onSuccess,
  onBackToRoles
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Clean empty inputs - no hardcoded dummy data
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('electrician');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Photo attachment state
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Service address state - starts EMPTY
  const [serviceAddress, setServiceAddress] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const addressTextareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handlePhotoAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (attachedPhotos.length >= 3) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setAttachedPhotos((prev) => [...prev.slice(0, 2), ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleRemovePhoto = (index: number) => {
    setAttachedPhotos(attachedPhotos.filter((_, i) => i !== index));
  };

  // Direct login - no OTP
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to proceed.');
      return;
    }
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);
    setError('');

    const finalAddress = serviceAddress.trim() || 'Service Address (Direct Location)';

    setTimeout(() => {
      setIsLoading(false);
      const formattedPhone = `+91 ${cleanPhone.slice(-10)}`;

      if (role === 'provider') {
        onSuccess({
          ...INITIAL_PROVIDER_USER,
          name: name.trim(),
          email: '',
          phone: formattedPhone,
          role: 'provider',
          selectedAddress: finalAddress
        });
      } else if (role === 'admin') {
        onSuccess({
          ...INITIAL_USER,
          name: name.trim(),
          email: '',
          role: 'admin',
          phone: formattedPhone,
          selectedAddress: finalAddress
        });
      } else {
        onSuccess({
          ...INITIAL_USER,
          name: name.trim(),
          email: '',
          phone: formattedPhone,
          role: 'seeker',
          selectedAddress: finalAddress
        });
      }
    }, 450);
  };

  // Quick switch role
  const handleSwitchPersona = (targetRole: UserRole) => {
    setRole(targetRole);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pt-2">
        <TrustoraLogo size="md" />
        <button
          onClick={onBackToRoles}
          className="text-xs font-semibold text-slate-500 hover:text-teal-700 hover:underline"
        >
          Change Role ({role === 'provider' ? 'Provider' : 'Seeker'})
        </button>
      </div>

      {/* Main Auth Container */}
      <div className="max-w-md mx-auto w-full my-auto py-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#0B1F3A] tracking-tight">
              {role === 'provider' ? 'Provider Login' : 'Seeker Login'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {role === 'provider'
                ? 'Direct login with mobile number • No password or email'
                : 'Instant phone login • No password or email'}
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1 mb-5 border border-slate-200/60">
            <button
              type="button"
              onClick={() => handleSwitchPersona('seeker')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                role === 'seeker'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Seeker
            </button>
            <button
              type="button"
              onClick={() => handleSwitchPersona('provider')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                role === 'provider'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Provider
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <span>{error}</span>
            </div>
          )}

          {/* Login Form - No OTP */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Full Name Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition bg-white"
                />
              </div>
            </div>

            {/* Mobile Number Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <div className="relative flex items-center border border-slate-200 rounded-xl focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100 overflow-hidden transition bg-white">
                <div className="pl-3.5 pr-2 py-2.5 bg-slate-50 border-r border-slate-200 flex items-center gap-1 text-slate-700 text-xs sm:text-sm font-bold shrink-0">
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm focus:outline-hidden font-medium"
                  autoFocus
                />
              </div>
            </div>

            {/* For Service Providers: Select Trade Category */}
            {role === 'provider' && (
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Primary Service Trade
                </label>
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:border-teal-600 font-medium text-slate-800"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Service Address Section */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Service Address
                </label>
                {locationDetected && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    GPS Detected
                  </span>
                )}
              </div>

              {/* Mode Action Buttons */}
              <div className="flex gap-2 mb-2">
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
                  placeholder="Enter flat / house no, building, road, locality, city & pincode"
                  rows={2}
                  className="w-full p-3 pr-8 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition resize-none shadow-2xs font-medium text-slate-800"
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

            {/* Photo Attachment Area */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {attachedPhotos.map((url, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden ring-1 ring-slate-200">
                    <img src={url} alt="Attached" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(i)}
                      className="absolute top-1 right-1 p-0.5 bg-black/60 rounded-full text-white hover:bg-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {attachedPhotos.length < 3 && (
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

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[11px] sm:text-xs text-slate-600 cursor-pointer">
                I agree to the{' '}
                <span className="font-semibold text-teal-700">Terms & Privacy Policy</span>
              </label>
            </div>

            {/* Action Button: Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#009688] hover:bg-[#00796B] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Login & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social or divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative inline-block bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Quick Access
            </div>
          </div>

          {/* 1-Click quick access buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                onSuccess({
                  ...INITIAL_USER,
                  name: name.trim() || 'Guest User',
                  phone: phone ? `+91 ${phone}` : '+91 98765 43210',
                  email: '',
                  role: 'seeker'
                });
              }}
              className="py-2.5 px-3 border border-slate-200 hover:border-teal-500 rounded-xl bg-slate-50 hover:bg-teal-50/50 transition text-xs font-bold text-slate-700 text-center"
            >
              Continue as Seeker
            </button>

            <button
              type="button"
              onClick={() => {
                onSuccess({
                  ...INITIAL_PROVIDER_USER,
                  name: name.trim() || 'Guest Provider',
                  phone: phone ? `+91 ${phone}` : '+91 98480 12345',
                  email: '',
                  role: 'provider'
                });
              }}
              className="py-2.5 px-3 border border-slate-200 hover:border-emerald-500 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition text-xs font-bold text-slate-700 text-center"
            >
              Continue as Provider
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full text-center text-[11px] text-slate-400 pb-2">
        Mobile Number Authentication • No Email or Password Required
      </div>
    </div>
  );
};
