import React, { useState } from 'react';
import {
  X,
  User,
  ShieldCheck,
  FileText,
  MapPin,
  DollarSign,
  Plus,
  CheckCircle2,
  Upload,
  Wrench
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ProviderProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  const [activeTab, setActiveTab] = useState<'rate_cards' | 'areas' | 'documents' | 'experience'>('rate_cards');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Rate card state
  const [rateCard, setRateCard] = useState({
    baseVisitCharge: 199,
    hourlyLaborCharge: 250,
    emergencyNightCharge: 100,
    enableNightService: true,
    materialAssistanceCharge: 50
  });

  // Service areas state
  const [serviceRadiusKm, setServiceRadiusKm] = useState(15);
  const [localities, setLocalities] = useState<string[]>([
    'Madhapur',
    'Kondapur',
    'Gachibowli',
    'Hitec City',
    'Jubilee Hills',
    'Banjara Hills',
    'Kukatpally'
  ]);
  const [newLocalityInput, setNewLocalityInput] = useState('');

  // Documents state
  const [documents] = useState([
    {
      id: 'DOC-1',
      title: 'Aadhaar Identity Card',
      docNumber: '•••• •••• 8821',
      status: 'verified',
      issuedBy: 'Govt. of India (UIDAI)',
      date: 'Verified on Jan 10, 2026'
    },
    {
      id: 'DOC-2',
      title: 'ITI Electrician Trade Certificate',
      docNumber: 'CERT-TS-98214',
      status: 'verified',
      issuedBy: 'State Council for Vocational Training',
      date: 'Verified on Jan 12, 2026'
    },
    {
      id: 'DOC-3',
      title: 'Police Clearance Certificate (PCC)',
      docNumber: 'PCC-HYD-2026-441',
      status: 'verified',
      issuedBy: 'Cyberabad Police Commissionerate',
      date: 'Valid till Dec 2027'
    },
    {
      id: 'DOC-4',
      title: 'Trustora ₹10 Lakh Pro Safety Insurance',
      docNumber: 'POL-TR-88192-SAFE',
      status: 'active',
      issuedBy: 'Trustora Safety & ICICI Lombard',
      date: 'Covers tool damage, accidental liability & medical'
    }
  ]);

  // Profile info state
  const [profileData, setProfileData] = useState({
    name: user.name || 'Mohammed Asif PowerTech',
    experienceYears: 8,
    category: 'Electrician',
    bio: 'Certified master electrician with 8+ years experience in domestic & commercial electrical installations, MCB load balance, and appliance diagnostics.',
    languages: ['Telugu', 'Hindi', 'English'],
    tools: ['Digital Multimeter', 'Heavy Impact Drill', 'Insulated VDE Pliers', 'Wall Chaser', 'Pipe Bender']
  });

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddLocality = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocalityInput.trim()) return;
    if (localities.includes(newLocalityInput.trim())) {
      showToast('Locality already in your service area list');
      return;
    }
    setLocalities([...localities, newLocalityInput.trim()]);
    setNewLocalityInput('');
    showToast('Service area updated!');
  };

  const handleRemoveLocality = (loc: string) => {
    setLocalities(localities.filter((l) => l !== loc));
  };

  const handleSaveRateCard = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Rate cards saved and published to seeker search!');
  };

  const handleSimulateUpload = () => {
    showToast('Document uploaded successfully! Under automated verification.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">My Profile & Documents</h3>
              <p className="text-xs text-slate-500">Manage rate cards, areas & insurance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 px-4 pt-2 gap-2 bg-slate-50/50 overflow-x-auto text-xs">
          {[
            { id: 'rate_cards', label: 'Rate Cards', icon: DollarSign },
            { id: 'areas', label: 'Service Areas', icon: MapPin },
            { id: 'documents', label: 'Insurance & Docs', icon: ShieldCheck },
            { id: 'experience', label: 'Experience & Bio', icon: Wrench }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 px-3 font-bold border-b-2 flex items-center gap-1.5 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 1: RATE CARDS */}
          {activeTab === 'rate_cards' && (
            <form onSubmit={handleSaveRateCard} className="space-y-4">
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Clear transparent rates ensure customers book you with confidence. You keep 100% of your listed earnings.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">Base Visit & Diagnostic Fee</label>
                    <span className="text-[11px] text-slate-500">Covers travel and first 15 mins inspection</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={rateCard.baseVisitCharge}
                      onChange={(e) => setRateCard({ ...rateCard, baseVisitCharge: Number(e.target.value) })}
                      className="w-20 px-2.5 py-1.5 text-xs font-bold text-right border border-slate-300 rounded-lg bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">Standard Hourly Repair Charge</label>
                    <span className="text-[11px] text-slate-500">Applicable for complex repairs & installations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={rateCard.hourlyLaborCharge}
                      onChange={(e) => setRateCard({ ...rateCard, hourlyLaborCharge: Number(e.target.value) })}
                      className="w-20 px-2.5 py-1.5 text-xs font-bold text-right border border-slate-300 rounded-lg bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">Parts Sourcing & Market Run Fee</label>
                    <span className="text-[11px] text-slate-500">When buying hardware from local electrical shops</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={rateCard.materialAssistanceCharge}
                      onChange={(e) => setRateCard({ ...rateCard, materialAssistanceCharge: Number(e.target.value) })}
                      className="w-20 px-2.5 py-1.5 text-xs font-bold text-right border border-slate-300 rounded-lg bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">Emergency & Night Hours Surcharge</label>
                    <span className="text-[11px] text-slate-500">Additional fee for jobs after 8:00 PM (+₹{rateCard.emergencyNightCharge})</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rateCard.enableNightService}
                      onChange={(e) => setRateCard({ ...rateCard, enableNightService: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900"></div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Save Rate Cards
              </button>
            </form>
          )}

          {/* TAB 2: SERVICE AREAS */}
          {activeTab === 'areas' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Service Radius from Home Base</span>
                  <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {serviceRadiusKm} km Radius
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="35"
                  value={serviceRadiusKm}
                  onChange={(e) => setServiceRadiusKm(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 block">
                  You will receive booking alerts within {serviceRadiusKm} km of your base location in Kondapur, Hyderabad.
                </span>
              </div>

              {/* Localities Chips */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-900 block">Active Service Localities ({localities.length})</span>
                <div className="flex flex-wrap gap-2">
                  {localities.map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                    >
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{loc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLocality(loc)}
                        className="text-slate-400 hover:text-rose-600 transition ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add Locality */}
                <form onSubmit={handleAddLocality} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newLocalityInput}
                    onChange={(e) => setNewLocalityInput(e.target.value)}
                    placeholder="Add area (e.g. Miyapur, Manikonda)"
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-teal-600"
                  />
                  <button
                    type="submit"
                    className="py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Area</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS & INSURANCE */}
          {activeTab === 'documents' && (
            <div className="space-y-3">
              {/* Trustora Insurance Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-200" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Active Pro Insurance Shield
                    </span>
                  </div>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                    ₹10,00,000 Cover
                  </span>
                </div>
                <h4 className="text-base font-black">All On-Duty Work Is Fully Insured</h4>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Covers damages up to ₹10 Lakhs against inadvertent property damage, tool accidents & medical protection during active jobs.
                </p>
                <div className="text-[10px] text-emerald-200 pt-1 font-mono">Policy ID: POL-TR-88192-SAFE</div>
              </div>

              {/* Documents List */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-900 block">Verified KYC & Trade Documents</span>

                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-slate-900">{doc.title}</h5>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            ✓ Verified
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 block">{doc.docNumber}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleSimulateUpload}
                  className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Additional Certificate or License</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCE & BIO */}
          {activeTab === 'experience' && (
            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Professional Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={profileData.experienceYears}
                    onChange={(e) => setProfileData({ ...profileData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Primary Trade</label>
                  <input
                    type="text"
                    value={profileData.category}
                    disabled
                    className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">Languages Spoken</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Telugu', 'Hindi', 'English', 'Urdu', 'Tamil', 'Kannada'].map((lang) => {
                    const isSelected = profileData.languages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setProfileData({
                            ...profileData,
                            languages: isSelected
                              ? profileData.languages.filter((l) => l !== lang)
                              : [...profileData.languages, lang]
                          });
                        }}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border transition ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">Equipped Professional Tools</label>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                    >
                      ✓ {tool}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Profile details updated!')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition mt-2"
              >
                Save Profile
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Verified Pro details visible to customers</span>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
