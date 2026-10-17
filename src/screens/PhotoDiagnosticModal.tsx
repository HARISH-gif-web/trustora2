import React, { useState } from 'react';
import {
  X,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface PhotoDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCategory: (categoryId: string) => void;
}

interface SampleIssue {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  imageUrl: string;
  severity: 'Low' | 'Medium' | 'High';
  findings: string;
  advice: string;
}

export const PhotoDiagnosticModal: React.FC<PhotoDiagnosticModalProps> = ({
  isOpen,
  onClose,
  onBookCategory
}) => {
  const SAMPLES: SampleIssue[] = [
    {
      id: 'pipe-leak',
      name: 'Kitchen Pipe Leak',
      category: 'Plumber',
      categoryId: 'plumber',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80',
      severity: 'Medium',
      findings: 'Under-sink PVC drainage elbow gasket leakage with mild pooling.',
      advice: 'Turn off the sink stopcock valve. Professional replacement of threaded slip joint required.'
    },
    {
      id: 'switchboard-burn',
      name: 'Tripped Switchboard',
      category: 'Electrician',
      categoryId: 'electrician',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
      severity: 'High',
      findings: 'Slight thermal discolouration on 16A socket and MCB tripping frequency.',
      advice: 'Do NOT touch with bare hands. Qualified technician with insulated tools needed for wiring check.'
    },
    {
      id: 'ac-drain',
      name: 'AC Indoor Water Drip',
      category: 'AC Service',
      categoryId: 'ac_service',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      severity: 'Medium',
      findings: 'Condensate drain tray overflow caused by algae sludge clogging.',
      advice: 'Power jet wash and drain hose pressurization recommended to restore smooth condensation flow.'
    }
  ];

  const [selectedSample, setSelectedSample] = useState<SampleIssue>(SAMPLES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisComplete, setDiagnosisComplete] = useState(true);

  const handleSelectSample = (sample: SampleIssue) => {
    setSelectedSample(sample);
    setIsAnalyzing(true);
    setDiagnosisComplete(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setDiagnosisComplete(true);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-[#0B1F3A] to-[#0A364A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base">AI Visual Diagnosis</h3>
                <span className="text-[10px] bg-teal-400 text-teal-950 font-bold px-1.5 py-0.2 rounded font-mono">
                  Vision CV
                </span>
              </div>
              <p className="text-[11px] text-teal-200">
                Detect service category & severity from photos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Sample selection chips */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select or Upload Sample Issue
            </span>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-2 rounded-2xl border text-left transition cursor-pointer ${
                    selectedSample.id === sample.id
                      ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-100'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="h-14 rounded-xl overflow-hidden mb-1.5 bg-slate-100">
                    <img
                      src={sample.imageUrl}
                      alt={sample.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 block truncate">
                    {sample.name}
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold">{sample.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Image Inspection Area with CV Bounding Box */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center">
            <img
              src={selectedSample.imageUrl}
              alt={selectedSample.name}
              className="w-full h-full object-cover opacity-90"
            />

            {/* Simulated Vision Bounding Box Overlay */}
            {!isAnalyzing && diagnosisComplete && (
              <div className="absolute inset-10 border-2 border-emerald-400 rounded-lg bg-emerald-500/10 animate-pulse pointer-events-none">
                <div className="absolute -top-3 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Region of Interest: 97.4% Match
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center text-white">
                <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mb-2" />
                <span className="text-xs font-semibold">Running Neural Vision Scan...</span>
              </div>
            )}
          </div>

          {/* Diagnosis Results Card */}
          {diagnosisComplete && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Recommended Category
                  </span>
                  <span className="text-sm font-black text-teal-800">
                    {selectedSample.category}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Urgency Severity
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                      selectedSample.severity === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedSample.severity} Priority
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
                <div className="font-semibold text-slate-900 mb-0.5">Visual Finding:</div>
                <p className="text-slate-600">{selectedSample.findings}</p>
              </div>

              <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="font-semibold text-slate-900 block mb-0.5">Safety Advice:</span>
                <p className="text-slate-600">{selectedSample.advice}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onClose();
              onBookCategory(selectedSample.categoryId);
            }}
            className="flex-1 max-w-xs py-2.5 px-4 bg-[#009688] hover:bg-[#00796B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Book {selectedSample.category}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
